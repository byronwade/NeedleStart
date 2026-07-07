import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, relative, resolve } from "node:path";
import { writeLuminaMap, writeRenderManifest, writeRoutesManifest } from "@lumina/compiler";
import type { RouteNode } from "@lumina/core";
import { createElement, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { createServer, type ModuleNode, type ViteDevServer } from "vite";

export const luminaVitePluginStatus = {
  name: "@lumina/vite-plugin",
  phase: "implemented",
  implementsRuntimeBehavior: true,
} as const;

export type LuminaDevServerOptions = {
  appRoot: string;
  host?: string;
  port?: number;
  logLevel?: "info" | "warn" | "error" | "silent";
};

export type LuminaDevServer = {
  url: string;
  routes: RouteNode[];
  close: () => Promise<void>;
};

const virtualRoutesModuleId = "virtual:lumina/routes";
const resolvedVirtualRoutesModuleId = `\0${virtualRoutesModuleId}`;
const require = createRequire(import.meta.url);
const reactRuntimeAliases = {
  react: require.resolve("react"),
  "react-dom": require.resolve("react-dom"),
  "react-dom/server": require.resolve("react-dom/server"),
  "react/jsx-dev-runtime": require.resolve("react/jsx-dev-runtime"),
  "react/jsx-runtime": require.resolve("react/jsx-runtime"),
};

export async function startLuminaDevServer(options: LuminaDevServerOptions): Promise<LuminaDevServer> {
  const appRoot = resolve(options.appRoot);
  let routeState = regenerateArtifacts(appRoot);

  let vite: ViteDevServer;
  vite = await createServer({
    appType: "custom",
    configFile: false,
    esbuild: {
      jsx: "automatic",
      jsxImportSource: "react",
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
    resolve: {
      alias: reactRuntimeAliases,
    },
    ssr: {
      noExternal: ["react", "react-dom"],
    },
    root: appRoot,
    logLevel: options.logLevel ?? "info",
    server: {
      host: options.host ?? "127.0.0.1",
      port: options.port ?? 5173,
      strictPort: false,
    },
    plugins: [
      {
        name: "lumina-dev-renderer",
        resolveId(id) {
          if (id === virtualRoutesModuleId) return resolvedVirtualRoutesModuleId;
        },
        load(id) {
          if (id === resolvedVirtualRoutesModuleId) {
            return [
              `export const routes = ${JSON.stringify(routeState.routes)};`,
              `export const manifest = ${JSON.stringify(routeState.manifest)};`,
            ].join("\n");
          }
        },
        configureServer(server) {
          const updateRouteState = (file: string) => {
            if (!isAppSourceFile(appRoot, file)) return;
            routeState = regenerateArtifacts(appRoot, file);
            const virtualModule = server.moduleGraph.getModuleById(resolvedVirtualRoutesModuleId);
            if (virtualModule) server.moduleGraph.invalidateModule(virtualModule);
            server.ws.send({
              type: "custom",
              event: "lumina:routes-updated",
              data: {
                changedFile: toRelativePath(appRoot, file),
                routes: routeState.routes.map((route) => route.path),
              },
            });
            server.ws.send({ type: "full-reload" });
          };

          server.watcher.on("add", updateRouteState);
          server.watcher.on("unlink", updateRouteState);

          server.middlewares.use(async (request, response, next) => {
            const url = normalizeRequestPath(request.url ?? "/");
            if (shouldPassThroughToVite(request.method, url)) {
              next();
              return;
            }

            const route = findRoute(routeState.routes, url);

            if (!route) {
              response.statusCode = 404;
              response.setHeader("Content-Type", "text/html; charset=utf-8");
              response.end(`<!doctype html><h1>Route not found: ${escapeHtml(url)}</h1>`);
              return;
            }

            try {
              const html = await renderRoute(server, route, url);
              response.statusCode = 200;
              response.setHeader("Content-Type", "text/html; charset=utf-8");
              response.end(html);
            } catch (error) {
              if (error instanceof Error) {
                try {
                  server.ssrFixStacktrace(error);
                } catch {
                  // Vite's stacktrace mapper can fail for synthetic modules; keep the dev response reliable.
                }
              }
              response.statusCode = 500;
              response.setHeader("Content-Type", "text/html; charset=utf-8");
              response.end(`<!doctype html><h1>Lumina dev render failed</h1><pre>${escapeHtml(error instanceof Error ? error.message : String(error))}</pre>`);
            }
          });
        },
        handleHotUpdate({ file, server, modules, timestamp }) {
          if (!isAppSourceFile(appRoot, file)) return;
          routeState = regenerateArtifacts(appRoot, file);
          const invalidatedModules = new Set<ModuleNode>();
          for (const mod of modules) {
            server.moduleGraph.invalidateModule(mod, invalidatedModules, timestamp, true);
          }
          const virtualModule = server.moduleGraph.getModuleById(resolvedVirtualRoutesModuleId);
          if (virtualModule) server.moduleGraph.invalidateModule(virtualModule, invalidatedModules, timestamp, true);
          server.ws.send({
            type: "custom",
            event: "lumina:routes-updated",
            data: {
              changedFile: toRelativePath(appRoot, file),
              routes: routeState.routes.map((route) => route.path),
            },
          });
          server.ws.send({ type: "full-reload" });
          return [];
        },
      },
    ],
  });

  await vite.listen();

  return {
    url: resolveServerUrl(vite),
    routes: routeState.routes,
    close: () => vite.close(),
  };
}

function regenerateArtifacts(appRoot: string, changedFile?: string) {
  const routesResult = writeRoutesManifest({ appRoot });
  const renderResult = writeRenderManifest({ appRoot });
  const mapResult = writeLuminaMap({ appRoot });
  const routes = routesResult.manifest.routes.filter((route) => route.kind === "page");

  if (changedFile) {
    writeHmrReport(appRoot, {
      changedFile: toRelativePath(appRoot, changedFile),
      routes,
      artifacts: [
        ".lumina/routes.json",
        ".lumina/render-manifest.json",
        ".lumina/map.json",
        ".lumina/hmr-report.json",
      ],
    });
  }

  return {
    manifest: routesResult.manifest,
    renderManifest: renderResult.manifest,
    map: mapResult.map,
    routes,
  };
}

function writeHmrReport(
  appRoot: string,
  report: {
    changedFile: string;
    routes: RouteNode[];
    artifacts: string[];
  },
): void {
  const path = resolve(appRoot, ".lumina", "hmr-report.json");
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(
    path,
    JSON.stringify({
      schemaVersion: "lumina.hmr-report.v0",
      generatedBy: {
        package: "@lumina/vite-plugin",
        version: "0.0.0",
      },
      changedFile: report.changedFile,
      routes: report.routes.map((route) => ({
        id: route.id,
        path: route.path,
        sourceFile: route.sourceFile,
      })),
      artifacts: report.artifacts,
    }),
    "utf8",
  );
}

async function renderRoute(server: ViteDevServer, route: RouteNode, url: string): Promise<string> {
  const pageModule = await server.ssrLoadModule(`/${route.sourceFile}`);
  const Page = pageModule.default;
  if (typeof Page !== "function") {
    throw new Error(`${route.sourceFile} must export a default page component.`);
  }

  let app: ReactNode = createElement(Page);

  for (const layout of [...route.layouts].reverse()) {
    const layoutModule = await server.ssrLoadModule(`/${layout}`);
    const Layout = layoutModule.default;
    if (typeof Layout !== "function") {
      throw new Error(`${layout} must export a default layout component.`);
    }
    app = createElement(Layout, { children: app });
  }

  const appHtml = renderToString(app);
  const html = `<!doctype html>${appHtml}<div data-lumina-route="${escapeAttribute(route.path)}"></div><script type="module" src="/@vite/client"></script>`;
  return server.transformIndexHtml(url, html);
}

function findRoute(routes: RouteNode[], url: string): RouteNode | undefined {
  return routes.find((route) => route.path === url);
}

function isAppSourceFile(appRoot: string, file: string): boolean {
  const normalized = toRelativePath(appRoot, file);
  return normalized.startsWith("app/")
    && (normalized.endsWith(".ts") || normalized.endsWith(".tsx") || normalized.endsWith(".js") || normalized.endsWith(".jsx"));
}

function toRelativePath(root: string, file: string): string {
  return relative(root, file).replaceAll("\\", "/");
}

function normalizeRequestPath(url: string): string {
  const pathname = new URL(url, "http://lumina.local").pathname;
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function shouldPassThroughToVite(method: string | undefined, pathname: string): boolean {
  if (method && method !== "GET" && method !== "HEAD") return true;
  return pathname.startsWith("/@vite/")
    || pathname.startsWith("/@fs/")
    || pathname.startsWith("/node_modules/")
    || /\.[a-zA-Z0-9]+$/.test(pathname);
}

function resolveServerUrl(server: ViteDevServer): string {
  const local = server.resolvedUrls?.local[0];
  if (!local) throw new Error("Vite dev server did not expose a local URL.");
  return local.replace(/\/$/, "");
}

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll("\"", "&quot;");
}
