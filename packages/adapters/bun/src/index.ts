export const luminaAdapterBunStatus = {
  name: "@lumina/adapter-bun",
  phase: "implemented",
  implementsRuntimeBehavior: true,
} as const;

export type BuiltLuminaAppOptions = {
  appRoot: string;
  host?: string;
  port?: number;
};

export type BuiltLuminaAppServer = {
  url: string;
  close: () => Promise<void>;
};

export async function startBuiltLuminaApp(options: BuiltLuminaAppOptions): Promise<BuiltLuminaAppServer> {
  const host = options.host ?? "127.0.0.1";
  const port = options.port ?? 4173;
  const publicRoot = `${options.appRoot.replaceAll("\\", "/")}/dist/public`;

  const server = Bun.serve({
    hostname: host,
    port,
    fetch(request) {
      try {
        const pathname = normalizePathname(new URL(request.url).pathname);
        const safePathname = safePublicPathname(pathname);
        if (!safePathname) return invalidRequestResponse();

        return serveBuiltPath(publicRoot, safePathname);
      } catch {
        return serverErrorResponse();
      }
    },
  });

  return {
    url: `http://${host}:${server.port}`,
    close: async () => {
      server.stop(true);
    },
  };
}

function serveBuiltPath(publicRoot: string, pathname: string): Response {
  if (looksLikeStaticAsset(pathname)) {
    const assetPath = publicAssetPath(publicRoot, pathname);
    const asset = Bun.file(assetPath);
    if (asset.size > 0) {
      return new Response(asset, {
        status: 200,
        headers: {
          "Content-Type": contentTypeForPath(pathname),
          "Cache-Control": pathname.startsWith("/_lumina/client/") ? "public, max-age=31536000, immutable" : "no-store",
        },
      });
    }

    return assetNotFoundResponse();
  }

  const htmlPath = htmlFileForPath(publicRoot, pathname);
  const html = Bun.file(htmlPath);

  if (html.size > 0) {
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  return routeNotFoundResponse();
}

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function safePublicPathname(pathname: string): string | null {
  try {
    const decoded = decodeURIComponent(pathname);
    if (decoded.includes("..") || decoded.includes("\\") || decoded.includes("\0")) return null;
    return decoded;
  } catch {
    return null;
  }
}

function htmlFileForPath(publicRoot: string, pathname: string): string {
  if (pathname === "/") return `${publicRoot}/index.html`;
  return `${publicRoot}${pathname}/index.html`;
}

function looksLikeStaticAsset(pathname: string): boolean {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

function publicAssetPath(publicRoot: string, pathname: string): string {
  return `${publicRoot}${pathname}`;
}

function contentTypeForPath(pathname: string): string {
  if (pathname.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (pathname.endsWith(".css")) return "text/css; charset=utf-8";
  if (pathname.endsWith(".svg")) return "image/svg+xml";
  if (pathname.endsWith(".json")) return "application/json; charset=utf-8";
  return "application/octet-stream";
}

function invalidRequestResponse(): Response {
  return new Response("<!doctype html><h1>Lumina request invalid</h1>", {
    status: 400,
    headers: noStoreHtmlHeaders(),
  });
}

function serverErrorResponse(): Response {
  return new Response("<!doctype html><h1>Lumina server error</h1>", {
    status: 500,
    headers: noStoreHtmlHeaders(),
  });
}

function routeNotFoundResponse(): Response {
  return new Response("<!doctype html><h1>Lumina route not found</h1>", {
    status: 404,
    headers: noStoreHtmlHeaders(),
  });
}

function assetNotFoundResponse(): Response {
  return new Response("Lumina asset not found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function noStoreHtmlHeaders(): Record<string, string> {
  return {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  };
}
