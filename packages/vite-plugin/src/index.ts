import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
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

export type LuminaBuildResult = {
  routes: RouteNode[];
  outputs: string[];
  manifests: string[];
  diagnostics: unknown[];
};

const virtualRoutesModuleId = "virtual:lumina/routes";
const resolvedVirtualRoutesModuleId = `\0${virtualRoutesModuleId}`;
const require = createRequire(import.meta.url);
const reactRuntimeAliases = {
  react: require.resolve("react"),
  "react-dom": require.resolve("react-dom"),
  "react-dom/client": require.resolve("react-dom/client"),
  "react-dom/server": require.resolve("react-dom/server"),
  "react/jsx-dev-runtime": require.resolve("react/jsx-dev-runtime"),
  "react/jsx-runtime": require.resolve("react/jsx-runtime"),
};

export async function startLuminaDevServer(options: LuminaDevServerOptions): Promise<LuminaDevServer> {
  const appRoot = resolve(options.appRoot);
  let routeState = regenerateArtifacts(appRoot);
  await writeClientBundles(appRoot, routeState.routes);

  let vite: ViteDevServer;
  vite = await createServer({
    appType: "custom",
    configFile: false,
    esbuild: {
      jsx: "automatic",
      jsxImportSource: "react",
    },
    optimizeDeps: {
      include: ["react", "react-dom/client"],
      noDiscovery: true,
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
            void writeClientBundles(appRoot, routeState.routes);
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
            if (url.startsWith("/@lumina/client/")) {
              await serveClientBundle(appRoot, url, response);
              return;
            }
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
          void writeClientBundles(appRoot, routeState.routes);
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

export async function buildLuminaStaticApp(options: LuminaDevServerOptions): Promise<LuminaBuildResult> {
  const appRoot = resolve(options.appRoot);
  const routeState = regenerateArtifacts(appRoot);
  const outputs: string[] = [];
  const manifests = [
    ".lumina/routes.json",
    ".lumina/render-manifest.json",
    ".lumina/map.json",
  ];
  const phaseTimings: Array<{ name: string; durationMs: number; status: "ok" }> = [];

  clearBuildOutput(appRoot);

  const vite = await createServer({
    appType: "custom",
    configFile: false,
    esbuild: {
      jsx: "automatic",
      jsxImportSource: "react",
    },
    optimizeDeps: {
      include: ["react", "react-dom/client"],
      noDiscovery: true,
    },
    resolve: {
      alias: reactRuntimeAliases,
    },
    ssr: {
      noExternal: ["react", "react-dom"],
    },
    root: appRoot,
    logLevel: options.logLevel ?? "silent",
    server: {
      middlewareMode: true,
    },
    plugins: [
      {
        name: "lumina-static-build-virtual-routes",
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
      },
    ],
  });

  try {
    for (const route of routeState.routes) {
      if (route.kind !== "page" || route.renderMode !== "static" || route.params.length > 0) continue;
      const html = await renderRoute(vite, route, route.path, { includeViteClient: false });
      const outputPath = staticHtmlOutputPath(route.path);
      writeTextArtifact(appRoot, outputPath, html);
      outputs.push(outputPath);
      phaseTimings.push({
        name: `static html ${route.path}`,
        durationMs: 0,
        status: "ok",
      });
    }
  } finally {
    await vite.close();
  }

  copyJsonArtifact(appRoot, ".lumina/routes.json", "dist/routes.manifest.json", routeState.manifest);
  copyJsonArtifact(appRoot, ".lumina/render-manifest.json", "dist/render.manifest.json", routeState.renderManifest);
  const adapterManifest = createBunAdapterManifest();
  copyJsonArtifact(appRoot, "", "dist/adapter.manifest.json", adapterManifest);

  const buildTracePath = ".lumina/build-trace.json";
  const perfReportPath = ".lumina/perf.report.json";
  writeJsonArtifact(appRoot, buildTracePath, createBuildTrace([...manifests, ...outputs, "dist/routes.manifest.json", "dist/render.manifest.json", "dist/adapter.manifest.json"], phaseTimings));
  writeJsonArtifact(appRoot, perfReportPath, createPerfReport(routeState.routes, outputs, appRoot));

  manifests.push(buildTracePath, perfReportPath, "dist/routes.manifest.json", "dist/render.manifest.json", "dist/adapter.manifest.json");

  return {
    routes: routeState.routes,
    outputs: outputs.sort(compareStrings),
    manifests,
    diagnostics: [
      ...routeState.manifest.diagnostics,
      ...routeState.renderManifest.diagnostics,
      ...routeState.map.diagnostics,
    ],
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

async function renderRoute(
  server: ViteDevServer,
  route: RouteNode,
  url: string,
  options: { includeViteClient: boolean } = { includeViteClient: true },
): Promise<string> {
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
  const viteClient = options.includeViteClient ? '<script type="module" src="/@vite/client"></script>' : "";
  const clientEntry = options.includeViteClient ? `<script type="module" src="${clientEntryUrl(route)}"></script>` : "";
  const html = `<!doctype html>${appHtml}<div data-lumina-route="${escapeAttribute(route.path)}"></div>${viteClient}${clientEntry}`;
  return server.transformIndexHtml(url, html);
}

async function writeClientBundles(appRoot: string, routes: RouteNode[]): Promise<void> {
  const entryRoot = resolve(appRoot, ".lumina", "generated", "client");
  const outdir = resolve(appRoot, ".lumina", "client");
  rmSync(entryRoot, { recursive: true, force: true });
  rmSync(outdir, { recursive: true, force: true });
  mkdirSync(entryRoot, { recursive: true });

  const entrypoints = routes
    .filter((route) => route.kind === "page")
    .map((route) => {
      const entry = resolve(entryRoot, `${route.id}.tsx`);
      writeFileSync(entry, createClientEntryModule(route, (sourceFile) => relativeModulePath(entry, appRoot, sourceFile)), "utf8");
      return entry;
    });

  if (entrypoints.length === 0) return;

  const result = await Bun.build({
    entrypoints,
    outdir,
    target: "browser",
    splitting: false,
    sourcemap: "none",
    minify: false,
    naming: "[name].[ext]",
    plugins: [
      {
        name: "lumina-client-virtual-routes",
        setup(build) {
          build.onResolve({ filter: /^virtual:lumina\/routes$/ }, () => ({
            path: virtualRoutesModuleId,
            namespace: "lumina",
          }));
          build.onLoad({ filter: /^virtual:lumina\/routes$/, namespace: "lumina" }, () => ({
            contents: [
              `export const routes = ${JSON.stringify(routes)};`,
              `export const manifest = ${JSON.stringify({ routes })};`,
            ].join("\n"),
            loader: "js",
          }));
        },
      },
    ],
  });

  if (!result.success) {
    throw new Error(`Lumina client bundle failed: ${result.logs.map((log) => log.message).join("; ")}`);
  }
}

function createClientEntryModule(route: RouteNode, modulePath = (sourceFile: string) => `/${sourceFile}`): string {
  const imports = [
    `import { createElement } from "react";`,
    `import { hydrateRoot } from "react-dom/client";`,
    `import Page from "${modulePath(route.sourceFile)}";`,
    ...route.layouts.map((layout, index) => `import Layout${index} from "${modulePath(layout)}";`),
  ];
  const layoutApplications = route.layouts
    .map((_, index) => `app = createElement(Layout${index}, { children: app });`)
    .reverse();

  return [
    ...imports,
    "",
    "let app = createElement(Page);",
    ...layoutApplications,
    "hydrateRoot(document, app);",
  ].join("\n");
}

function clientEntryUrl(route: RouteNode): string {
  return `/@lumina/client/${route.id}.js`;
}

async function serveClientBundle(appRoot: string, url: string, response: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body: string | Uint8Array) => void }): Promise<void> {
  const requestedFile = url.slice("/@lumina/client/".length);
  if (!/^[a-zA-Z0-9.-]+\.js$/.test(requestedFile)) {
    response.statusCode = 400;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end("Invalid Lumina client bundle path.");
    return;
  }

  const bundlePath = resolve(appRoot, ".lumina", "client", requestedFile);
  if (!existsSync(bundlePath)) {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end("Lumina client bundle not found.");
    return;
  }

  response.statusCode = 200;
  response.setHeader("Content-Type", "application/javascript; charset=utf-8");
  response.end(await Bun.file(bundlePath).bytes());
}

function relativeModulePath(fromFile: string, appRoot: string, sourceFile: string): string {
  const target = resolve(appRoot, ...sourceFile.split("/"));
  const relativePath = relative(dirname(fromFile), target).replaceAll("\\", "/");
  return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
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
    || pathname.startsWith("/@id/")
    || pathname.startsWith("/@fs/")
    || pathname.startsWith("/node_modules/")
    || /\.[a-zA-Z0-9]+$/.test(pathname);
}

function resolveServerUrl(server: ViteDevServer): string {
  const local = server.resolvedUrls?.local[0];
  if (!local) throw new Error("Vite dev server did not expose a local URL.");
  return local.replace(/\/$/, "");
}

function clearBuildOutput(appRoot: string): void {
  rmSync(resolve(appRoot, "dist"), { recursive: true, force: true });
}

function staticHtmlOutputPath(routePath: string): string {
  if (routePath === "/") return "dist/public/index.html";
  return `dist/public${routePath}/index.html`;
}

function writeTextArtifact(appRoot: string, outputPath: string, value: string): void {
  const absolutePath = resolve(appRoot, ...outputPath.split("/"));
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, value, "utf8");
}

function writeJsonArtifact(appRoot: string, outputPath: string, value: unknown): void {
  writeTextArtifact(appRoot, outputPath, JSON.stringify(value));
}

function copyJsonArtifact(appRoot: string, _sourcePath: string, outputPath: string, value: unknown): void {
  writeJsonArtifact(appRoot, outputPath, value);
}

function createBunAdapterManifest() {
  return {
    schemaVersion: "lumina.adapter.v0",
    adapter: "bun",
    package: "@lumina/adapter-bun",
    generatedBy: {
      package: "@lumina/vite-plugin",
      version: "0.0.0",
    },
    source: {
      routesManifest: "dist/routes.manifest.json",
      renderManifest: "dist/render.manifest.json",
    },
    runtime: {
      name: "bun",
    },
    publicDir: "dist/public",
    capabilities: {
      staticAssets: true,
      prerenderedHtml: true,
      ssr: false,
      api: false,
      hotApi: false,
      streaming: false,
      healthEndpoint: false,
    },
    unsupported: [
      {
        feature: "ssr",
        reason: "The current MVP build output serves static HTML only.",
      },
      {
        feature: "api",
        reason: "API routes are outside the current MVP build slice.",
      },
    ],
    diagnostics: [],
  };
}

function createBuildTrace(
  artifacts: string[],
  phases: Array<{ name: string; durationMs: number; status: "ok" }>,
) {
  return {
    schemaVersion: "lumina.build-trace.v0",
    generatedBy: {
      package: "@lumina/compiler",
      version: "0.0.0",
    },
    phases: [
      { name: "route discovery", durationMs: 0, status: "ok" },
      { name: "render manifest", durationMs: 0, status: "ok" },
      { name: "map generation", durationMs: 0, status: "ok" },
      ...phases,
      { name: "adapter output", durationMs: 0, status: "ok" },
    ],
    artifacts: artifacts.sort(compareStrings),
    diagnostics: [],
  };
}

function createPerfReport(routes: RouteNode[], outputs: string[], appRoot: string) {
  return {
    schemaVersion: "lumina.perf-report.v0",
    generatedBy: {
      package: "@lumina/compiler",
      version: "0.0.0",
    },
    status: "not implemented",
    summary: {
      routeCount: routes.length,
      staticHtmlFiles: outputs.length,
      note: "Initial MVP build report; browser payload and benchmark evidence are not implemented.",
    },
    routes: routes
      .filter((route) => route.kind === "page")
      .map((route) => {
        const outputPath = staticHtmlOutputPath(route.path);
        return {
          routeId: route.id,
          path: route.path,
          mode: route.renderMode,
          htmlOutput: route.params.length === 0 ? outputPath : null,
          htmlBytes: route.params.length === 0 ? byteLengthOfFile(appRoot, outputPath) : 0,
          budgets: [],
          diagnostics: [],
        };
      }),
    benchmarks: [],
    diagnostics: [],
  };
}

function byteLengthOfFile(appRoot: string, outputPath: string): number {
  const file = Bun.file(resolve(appRoot, ...outputPath.split("/")));
  return file.size;
}

function compareStrings(left: string, right: string): number {
  return left.localeCompare(right, "en");
}

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll("\"", "&quot;");
}
