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
      const pathname = normalizePathname(new URL(request.url).pathname);
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

      return new Response("<!doctype html><h1>Lumina route not found</h1>", {
        status: 404,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    },
  });

  return {
    url: `http://${host}:${server.port}`,
    close: async () => {
      server.stop(true);
    },
  };
}

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function htmlFileForPath(publicRoot: string, pathname: string): string {
  if (pathname === "/") return `${publicRoot}/index.html`;
  return `${publicRoot}${pathname}/index.html`;
}
