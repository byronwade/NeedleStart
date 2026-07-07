import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
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

type RouteParams = Record<string, string | string[]>;
type SearchParams = Record<string, string | string[]>;

type RouteMatch = {
  route: RouteNode;
  params: RouteParams;
};

const virtualRoutesModuleId = "virtual:lumina/routes";
const resolvedVirtualRoutesModuleId = `\0${virtualRoutesModuleId}`;

export async function startLuminaDevServer(options: LuminaDevServerOptions): Promise<LuminaDevServer> {
  const appRoot = resolve(options.appRoot);
  let routeState = regenerateArtifacts(appRoot);
  let clientBundleWrite: Promise<void> = Promise.resolve();
  const queueClientBundleWrite = () => {
    const write = writeClientBundles(appRoot, routeState.routes);
    clientBundleWrite = write.catch(() => undefined);
    return write;
  };
  await queueClientBundleWrite();

  let vite: ViteDevServer;
  vite = await createServer({
    appType: "custom",
    configFile: false,
    esbuild: {
      jsx: "automatic",
      jsxImportSource: "react",
    },
    optimizeDeps: {
      include: [],
      noDiscovery: true,
    },
    ssr: {
      external: ["react", "react-dom", "react-dom/client", "react-dom/server", "react/jsx-dev-runtime", "react/jsx-runtime"],
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
            void queueClientBundleWrite().catch(() => undefined);
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
            const rawUrl = request.url ?? "/";
            const url = normalizeRequestPath(rawUrl);
            if (url.startsWith("/@lumina/client/")) {
              await serveClientBundle(appRoot, url, response);
              return;
            }
            if (shouldPassThroughToVite(request.method, url)) {
              next();
              return;
            }

            const match = findRoute(routeState.routes, url);
            const searchParams = readSearchParams(rawUrl);

            if (!match) {
              const notFoundFile = findNotFoundFile(appRoot, url);
              if (notFoundFile) {
                try {
                  const html = await renderSpecialFile(server, appRoot, notFoundFile, url, {
                    searchParams,
                  });
                  response.statusCode = 404;
                  response.setHeader("Content-Type", "text/html; charset=utf-8");
                  response.end(html);
                  return;
                } catch {
                  // Fall through to the stable generic 404 if the user's not-found component fails.
                }
              }
              response.statusCode = 404;
              response.setHeader("Content-Type", "text/html; charset=utf-8");
              response.end(`<!doctype html><h1>Route not found: ${escapeHtml(url)}</h1>`);
              return;
            }

            try {
              const html = await renderRoute(server, match.route, url, {
                params: match.params,
                searchParams,
              });
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
              const errorFile = findErrorFile(appRoot, match.route);
              if (errorFile) {
                try {
                  const html = await renderSpecialFile(server, appRoot, errorFile, url, {
                    error: error instanceof Error ? error : new Error(String(error)),
                    params: match.params,
                    searchParams,
                  });
                  response.statusCode = 500;
                  response.setHeader("Content-Type", "text/html; charset=utf-8");
                  response.end(html);
                  return;
                } catch {
                  // Fall through to the stable generic 500 if the user's error component fails.
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
          void queueClientBundleWrite().catch(() => undefined);
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
    close: async () => {
      await clientBundleWrite;
      await vite.close();
    },
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
  await writeClientBundles(appRoot, routeState.routes);
  const clientOutputs = copyClientBundlesToPublic(appRoot);

  const vite = await createServer({
    appType: "custom",
    configFile: false,
    esbuild: {
      jsx: "automatic",
      jsxImportSource: "react",
    },
    optimizeDeps: {
      include: [],
      noDiscovery: true,
    },
    ssr: {
      external: ["react", "react-dom", "react-dom/client", "react-dom/server", "react/jsx-dev-runtime", "react/jsx-runtime"],
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
      const html = await renderRoute(vite, route, route.path, {
        includeViteClient: false,
        includeClientEntry: true,
        clientBasePath: "/_lumina/client",
      });
      const outputPath = staticHtmlOutputPath(route.path);
      writeTextArtifact(appRoot, outputPath, html);
      outputs.push(outputPath);
      phaseTimings.push({
        name: `static html ${route.path}`,
        durationMs: 0,
        status: "ok",
      });
    }
    outputs.push(...clientOutputs);
    const ssrOutputs = await writeSsrServerBundle(appRoot, routeState.routes.filter((route) => route.kind === "page" && route.renderMode === "ssr"));
    outputs.push(...ssrOutputs);
    if (ssrOutputs.length > 0) {
      phaseTimings.push({
        name: "ssr server bundle",
        durationMs: 0,
        status: "ok",
      });
    }
  } finally {
    await vite.close();
  }

  copyJsonArtifact(appRoot, ".lumina/routes.json", "dist/routes.manifest.json", routeState.manifest);
  copyJsonArtifact(appRoot, ".lumina/render-manifest.json", "dist/render.manifest.json", routeState.renderManifest);
  const adapterManifest = createBunAdapterManifest(routeState.routes.some((route) => route.kind === "page" && route.renderMode === "ssr"));
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
  options: { includeViteClient?: boolean; includeClientEntry?: boolean; clientBasePath?: string; params?: RouteParams; searchParams?: SearchParams } = { includeViteClient: true },
): Promise<string> {
  const pageModule = await server.ssrLoadModule(`/${route.sourceFile}`);
  const Page = pageModule.default;
  if (typeof Page !== "function") {
    throw new Error(`${route.sourceFile} must export a default page component.`);
  }

  const params = options.params ?? {};
  const searchParams = options.searchParams ?? {};
  let app: ReactNode = createElement(Page, { params, searchParams });

  for (const layout of [...route.layouts].reverse()) {
    const layoutModule = await server.ssrLoadModule(`/${layout}`);
    const Layout = layoutModule.default;
    if (typeof Layout !== "function") {
      throw new Error(`${layout} must export a default layout component.`);
    }
    app = createElement(Layout, { children: app, params, searchParams });
  }

  const appHtml = renderToString(app);
  const includeViteClient = options.includeViteClient ?? true;
  const viteClient = includeViteClient ? '<script type="module" src="/@vite/client"></script>' : "";
  const includeClientEntry = options.includeClientEntry ?? includeViteClient;
  const clientEntry = includeClientEntry ? `<script type="module" src="${clientEntryUrl(route, options.clientBasePath)}"></script>` : "";
  const html = `<!doctype html>${appHtml}<div data-lumina-route="${escapeAttribute(route.path)}"></div>${viteClient}${clientEntry}`;
  return server.transformIndexHtml(url, html);
}

async function renderSpecialFile(
  server: ViteDevServer,
  appRoot: string,
  sourceFile: string,
  url: string,
  props: Record<string, unknown>,
): Promise<string> {
  const specialModule = await server.ssrLoadModule(`/${sourceFile}`);
  const Special = specialModule.default;
  if (typeof Special !== "function") {
    throw new Error(`${sourceFile} must export a default component.`);
  }

  let app: ReactNode = createElement(Special, props);
  for (const layout of [...layoutsForSpecialFile(appRoot, sourceFile)].reverse()) {
    const layoutModule = await server.ssrLoadModule(`/${layout}`);
    const Layout = layoutModule.default;
    if (typeof Layout !== "function") {
      throw new Error(`${layout} must export a default layout component.`);
    }
    app = createElement(Layout, { ...props, children: app });
  }

  const appHtml = renderToString(app);
  const html = `<!doctype html>${appHtml}<script type="module" src="/@vite/client"></script>`;
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
    .map((_, index) => `app = createElement(Layout${index}, { children: app, params, searchParams });`)
    .reverse();

  return [
    ...imports,
    "",
    `const luminaRouteSegments = ${JSON.stringify(route.segments)};`,
    "",
    "function readLuminaRouteParams(pathname) {",
    "  const parts = pathname.replace(/^\\/+|\\/+$/g, \"\").split(\"/\").filter(Boolean).map((part) => decodeURIComponent(part));",
    "  const params = {};",
    "  let partIndex = 0;",
    "  for (const segment of luminaRouteSegments) {",
    "    if (segment.kind === \"group\") continue;",
    "    if (segment.kind === \"static\") {",
    "      partIndex += 1;",
    "      continue;",
    "    }",
    "    if (segment.kind === \"dynamic\") {",
    "      params[segment.name] = parts[partIndex];",
    "      partIndex += 1;",
    "      continue;",
    "    }",
    "    if (segment.kind === \"catchAll\") {",
    "      params[segment.name] = parts.slice(partIndex);",
    "      break;",
    "    }",
    "  }",
    "  return params;",
    "}",
    "",
    "function readLuminaSearchParams(search) {",
    "  const values = new URLSearchParams(search);",
    "  const searchParams = {};",
    "  for (const [key, value] of values) {",
    "    if (Object.prototype.hasOwnProperty.call(searchParams, key)) {",
    "      const existing = searchParams[key];",
    "      searchParams[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];",
    "    } else {",
    "      searchParams[key] = value;",
    "    }",
    "  }",
    "  return searchParams;",
    "}",
    "",
    "const params = readLuminaRouteParams(window.location.pathname);",
    "const searchParams = readLuminaSearchParams(window.location.search);",
    "let app = createElement(Page, { params, searchParams });",
    ...layoutApplications,
    "hydrateRoot(document, app);",
  ].join("\n");
}

async function writeSsrServerBundle(appRoot: string, routes: RouteNode[]): Promise<string[]> {
  if (routes.length === 0) return [];

  const entryRoot = resolve(appRoot, ".lumina", "generated", "server");
  const outdir = resolve(appRoot, "dist", "server");
  const entry = resolve(entryRoot, "ssr-routes.tsx");
  mkdirSync(entryRoot, { recursive: true });
  mkdirSync(outdir, { recursive: true });
  writeFileSync(entry, createSsrRoutesModule(routes, entry, appRoot), "utf8");

  const result = await Bun.build({
    entrypoints: [entry],
    outdir,
    target: "bun",
    format: "esm",
    splitting: false,
    sourcemap: "none",
    minify: false,
    naming: "[name].[ext]",
  });

  if (!result.success) {
    throw new Error(`Lumina SSR bundle failed: ${result.logs.map((log) => log.message).join("; ")}`);
  }

  return ["dist/server/ssr-routes.js"];
}

function createSsrRoutesModule(routes: RouteNode[], fromFile: string, appRoot: string): string {
  const imports = [
    `import { createElement } from "react";`,
    `import { renderToString } from "react-dom/server";`,
  ];
  const entries: string[] = [];

  routes.forEach((route, routeIndex) => {
    const pageName = `Page${routeIndex}`;
    imports.push(`import ${pageName} from ${JSON.stringify(relativeModulePath(fromFile, appRoot, route.sourceFile))};`);
    route.layouts.forEach((layout, layoutIndex) => {
      imports.push(`import Layout${routeIndex}_${layoutIndex} from ${JSON.stringify(relativeModulePath(fromFile, appRoot, layout))};`);
    });

    const layoutApplications = route.layouts
      .map((_, layoutIndex) => `    app = createElement(Layout${routeIndex}_${layoutIndex}, { children: app, params, searchParams });`)
      .reverse();
    const clientEntry = `<script type="module" src="${clientEntryUrl(route, "/_lumina/client")}"></script>`;

    entries.push([
      "  {",
      `    path: ${JSON.stringify(route.path)},`,
      `    segments: ${JSON.stringify(route.segments)},`,
      "    render(context) {",
      "      const params = context.params ?? {};",
      "      const searchParams = context.searchParams ?? {};",
      `      let app = createElement(${pageName}, { params, searchParams });`,
      ...layoutApplications,
      "      const appHtml = renderToString(app);",
      `      return "<!doctype html>" + appHtml + ${JSON.stringify(`<div data-lumina-route="${escapeAttribute(route.path)}"></div>${clientEntry}`)};`,
      "    },",
      "  }",
    ].join("\n"));
  });

  return [
    ...imports,
    "",
    "export const ssrRoutes = [",
    entries.join(",\n"),
    "];",
    "",
  ].join("\n");
}

function clientEntryUrl(route: RouteNode, basePath = "/@lumina/client"): string {
  return `${basePath}/${route.id}.js`;
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

function findRoute(routes: RouteNode[], url: string): RouteMatch | undefined {
  for (const route of routes) {
    const params = matchRoute(route, url);
    if (params) return { route, params };
  }
  return undefined;
}

function matchRoute(route: RouteNode, url: string): RouteParams | undefined {
  const parts = splitRoutePath(url);
  if (!parts) return undefined;

  const params: RouteParams = {};
  let partIndex = 0;

  for (const segment of route.segments) {
    if (segment.kind === "group") continue;

    if (segment.kind === "static") {
      if (parts[partIndex] !== segment.value) return undefined;
      partIndex += 1;
      continue;
    }

    if (segment.kind === "dynamic") {
      const value = parts[partIndex];
      if (!value) return undefined;
      params[segment.name] = value;
      partIndex += 1;
      continue;
    }

    if (segment.kind === "catchAll") {
      const rest = parts.slice(partIndex);
      if (rest.length === 0) return undefined;
      params[segment.name] = rest;
      partIndex = parts.length;
    }
  }

  if (partIndex !== parts.length) return undefined;
  return params;
}

function splitRoutePath(pathname: string): string[] | undefined {
  const rawParts = pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  const parts: string[] = [];
  for (const part of rawParts) {
    try {
      parts.push(decodeURIComponent(part));
    } catch {
      return undefined;
    }
  }
  return parts;
}

function findNotFoundFile(appRoot: string, url: string): string | undefined {
  const parts = splitRoutePath(url) ?? [];
  const candidates: string[] = [];
  for (let index = parts.length; index >= 0; index -= 1) {
    const prefix = parts.slice(0, index);
    candidates.push(["app", ...prefix, "not-found.tsx"].join("/"));
    candidates.push(["app", ...prefix, "not-found.jsx"].join("/"));
  }
  return findFirstExistingSource(appRoot, candidates);
}

function findErrorFile(appRoot: string, route: RouteNode): string | undefined {
  const sourceParts = route.sourceFile.split("/");
  sourceParts.pop();
  const candidates: string[] = [];
  for (let index = sourceParts.length; index >= 1; index -= 1) {
    const prefix = sourceParts.slice(0, index);
    candidates.push([...prefix, "error.tsx"].join("/"));
    candidates.push([...prefix, "error.jsx"].join("/"));
  }
  return findFirstExistingSource(appRoot, candidates);
}

function layoutsForSpecialFile(appRoot: string, sourceFile: string): string[] {
  const sourceParts = sourceFile.split("/");
  sourceParts.pop();
  const layouts: string[] = [];
  for (let index = 1; index <= sourceParts.length; index += 1) {
    const layout = [...sourceParts.slice(0, index), "layout.tsx"].join("/");
    if (existsSync(resolve(appRoot, ...layout.split("/")))) layouts.push(layout);
  }
  return layouts;
}

function findFirstExistingSource(appRoot: string, candidates: string[]): string | undefined {
  return candidates.find((candidate) => existsSync(resolve(appRoot, ...candidate.split("/"))));
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

function readSearchParams(url: string): SearchParams {
  const values = new URL(url, "http://lumina.local").searchParams;
  const searchParams: SearchParams = {};
  for (const [key, value] of values) {
    const existing = searchParams[key];
    if (Array.isArray(existing)) {
      existing.push(value);
    } else if (typeof existing === "string") {
      searchParams[key] = [existing, value];
    } else {
      searchParams[key] = value;
    }
  }
  return searchParams;
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

function copyClientBundlesToPublic(appRoot: string): string[] {
  const sourceDir = resolve(appRoot, ".lumina", "client");
  const publicDir = resolve(appRoot, "dist", "public", "_lumina", "client");
  if (!existsSync(sourceDir)) return [];
  mkdirSync(publicDir, { recursive: true });

  return readdirSync(sourceDir)
    .filter((file) => /^[a-zA-Z0-9.-]+\.js$/.test(file))
    .sort(compareStrings)
    .map((file) => {
      copyFileSync(resolve(sourceDir, file), resolve(publicDir, file));
      return `dist/public/_lumina/client/${file}`;
    });
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

function createBunAdapterManifest(hasSsrOutput = false) {
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
      serverEntry: hasSsrOutput ? "dist/server/ssr-routes.js" : null,
    },
    runtime: {
      name: "bun",
    },
    publicDir: "dist/public",
    capabilities: {
      staticAssets: true,
      prerenderedHtml: true,
      ssr: hasSsrOutput,
      api: false,
      hotApi: false,
      streaming: false,
      healthEndpoint: false,
    },
    unsupported: [
      ...(hasSsrOutput ? [] : [{
        feature: "ssr",
        reason: "No SSR routes were emitted in this build output.",
      }]),
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
      staticHtmlFiles: outputs.filter((output) => output.endsWith(".html")).length,
      note: "Initial MVP build report; measured browser payload and benchmark evidence are not implemented.",
    },
    routes: routes
      .filter((route) => route.kind === "page")
      .map((route) => {
        const outputPath = staticHtmlOutputPath(route.path);
        const hasStaticHtml = route.renderMode === "static" && route.params.length === 0 && outputs.includes(outputPath);
        return {
          routeId: route.id,
          path: route.path,
          mode: route.renderMode,
          htmlOutput: hasStaticHtml ? outputPath : null,
          htmlBytes: hasStaticHtml ? byteLengthOfFile(appRoot, outputPath) : 0,
          budgets: [],
          diagnostics: [],
        };
      }),
    benchmarks: [],
    diagnostics: [],
  };
}

function byteLengthOfFile(appRoot: string, outputPath: string): number {
  return statSync(resolve(appRoot, ...outputPath.split("/"))).size;
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
