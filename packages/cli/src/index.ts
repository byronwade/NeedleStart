import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { startBuiltLuminaApp } from "@lumina/adapter-bun";
import {
  writeLuminaMap,
  writeRenderManifest,
  writeRoutesManifest,
} from "@lumina/compiler";
import { getAffectedFiles, getAffectedRoutes } from "@lumina/map";
import { buildLuminaStaticApp, startLuminaDevServer } from "@lumina/vite-plugin";
import { benchmarkSkeletonReport } from "../../../benchmarks/status";

export const luminaCliStatus = {
  name: "@lumina/cli",
  phase: "implemented",
  implementsRuntimeBehavior: true,
} as const;

export type CliIo = {
  stdout?: (text: string) => void;
  stderr?: (text: string) => void;
};

export async function runCli(argv: string[], io: CliIo = {}): Promise<number> {
  const stdout = io.stdout ?? ((text: string) => console.log(text));
  const stderr = io.stderr ?? ((text: string) => console.error(text));
  const [command, appPath, ...flags] = argv;

  if (command === "bench" && appPath === "--list" && flags.includes("--json")) {
    stdout(
      JSON.stringify({
        schemaVersion: "lumina.cli.v0",
        command: "lumina bench --list",
        status: "ok",
        data: benchmarkSkeletonReport,
        diagnostics: [],
        meta: {
          cwd: ".",
        },
      }),
    );
    return 0;
  }

  if (command === "routes" && appPath && flags.includes("--json")) {
    const result = writeRoutesManifest({ appRoot: resolve(appPath) });
    stdout(
      JSON.stringify({
        schemaVersion: "lumina.cli.v0",
        command: "lumina routes",
        status: "ok",
        data: {
          artifact: result.path,
          routes: result.manifest.routes,
        },
        diagnostics: result.manifest.diagnostics,
        meta: {
          cwd: ".",
        },
      }),
    );
    return 0;
  }

  if (command === "inspect" && appPath && flags.includes("--json")) {
    const inspection = inspectApp(resolve(appPath));
    stdout(
      JSON.stringify({
        schemaVersion: "lumina.cli.v0",
        command: "lumina inspect",
        status: "ok",
        data: {
          target: ".",
          summary: inspection.summary,
          related: inspection.artifacts,
        },
        diagnostics: inspection.diagnostics,
        meta: {
          cwd: ".",
        },
      }),
    );
    return 0;
  }

  if (command === "inspect" && appPath && flags[0] === "why" && flags[1]) {
    const inspection = inspectApp(resolve(appPath));
    const route = inspection.routes.find((candidate) => candidate.path === flags[1]);
    if (!route) {
      stderr(`Route not found: ${flags[1]}`);
      return 3;
    }

    stdout(
      [
        `Route ${route.path}`,
        `Source: ${route.sourceFile}`,
        `Render mode: ${route.renderMode}`,
        `Layouts: ${route.layouts.length ? route.layouts.join(", ") : "none"}`,
        `Artifacts: ${inspection.artifacts.join(", ")}`,
        `Why: ${route.sourceFile} defines the ${route.path} route; ${route.layouts.length ? `${route.layouts.join(", ")} wraps it` : "no layout wraps it"}; the render manifest records ${route.renderMode} mode.`,
      ].join("\n"),
    );
    return 0;
  }

  if (command === "map" && appPath === "affected" && flags[0] && flags[1] && flags.includes("--json")) {
    const appRoot = resolve(flags[0]);
    const target = normalizeCliPath(flags[1]);
    const mapResult = writeLuminaMap({ appRoot });
    const affectedRoutes = getAffectedRoutes(mapResult.map, target);
    const relatedFiles = getAffectedFiles(mapResult.map, target);

    stdout(
      JSON.stringify({
        schemaVersion: "lumina.cli.v0",
        command: "lumina map affected",
        status: "ok",
        data: {
          target,
          affectedRoutes,
          relatedFiles,
          mapArtifact: mapResult.path,
        },
        diagnostics: mapResult.map.diagnostics,
        meta: {
          cwd: ".",
        },
      }),
    );
    return 0;
  }

  if (command === "dev" && appPath) {
    const appRoot = resolve(appPath);
    const portFlagIndex = flags.indexOf("--port");
    const port = portFlagIndex >= 0 ? Number(flags[portFlagIndex + 1]) : undefined;
    const selectedPort = Number.isFinite(port) ? port : undefined;
    let dev;
    try {
      dev = await startLuminaDevServer({
        appRoot,
        port: selectedPort,
        logLevel: "silent",
      });
    } catch (error) {
      stderr(formatDevStartupError(error, selectedPort ?? 5173));
      return 7;
    }

    stdout(
      [
        `Lumina dev ${appPath}`,
        `Local ${dev.url}`,
        `Routes ${dev.routes.length}`,
        "Artifacts .lumina/routes.json, .lumina/render-manifest.json, .lumina/map.json",
      ].join("\n"),
    );

    if (flags.includes("--once")) {
      await dev.close();
      return 0;
    }

    await waitForShutdown(dev.close);
    return 0;
  }

  if (command === "build" && appPath) {
    const appRoot = resolve(appPath);
    const build = await buildLuminaStaticApp({
      appRoot,
      logLevel: "silent",
    });

    if (flags.includes("--json")) {
      stdout(
        JSON.stringify({
          schemaVersion: "lumina.cli.v0",
          command: "lumina build",
          status: "ok",
          data: {
            routes: build.routes.length,
            outputs: build.outputs,
            manifests: build.manifests,
          },
          diagnostics: build.diagnostics,
          meta: {
            cwd: ".",
          },
        }),
      );
      return 0;
    }

    stdout(
      [
        `Lumina build ${appPath}`,
        `Routes     ${build.routes.length}`,
        `Outputs    ${build.outputs.length}`,
        `Artifacts  ${build.manifests.join(", ")}`,
        "",
        "Phase                 Status",
        "route discovery       ok",
        "render manifest       ok",
        "map generation        ok",
        "static output         ok",
        "adapter output        ok",
        "",
        "Done",
      ].join("\n"),
    );
    return 0;
  }

  if (command === "start" && appPath) {
    const appRoot = resolve(appPath);
    const portFlagIndex = flags.indexOf("--port");
    const port = portFlagIndex >= 0 ? Number(flags[portFlagIndex + 1]) : undefined;
    const builtRoutes = countBuiltRoutes(appRoot);
    if (builtRoutes === null || !existsSync(resolve(appRoot, "dist", "public"))) {
      stderr(`Build output not found for ${appPath}. Run lumina build ${appPath} before lumina start.`);
      return 4;
    }

    const server = await startBuiltLuminaApp({
      appRoot,
      port: Number.isFinite(port) ? port : undefined,
    });

    stdout(
      [
        `Lumina start ${appPath}`,
        `Local ${server.url}`,
        `Routes ${builtRoutes}`,
        "Serving dist/public",
      ].join("\n"),
    );

    if (flags.includes("--once")) {
      await server.close();
      return 0;
    }

    await waitForShutdown(server.close);
    return 0;
  }

  stderr("Usage: lumina dev <appPath> [--port <port>] | lumina build <appPath> [--json] | lumina start <appPath> [--port <port>] | lumina routes <appPath> --json | lumina inspect <appPath> --json | lumina inspect <appPath> why <route> | lumina map affected <appPath> <file> --json | lumina bench --list --json");
  return 2;
}

function countBuiltRoutes(appRoot: string): number | null {
  const manifestPath = resolve(appRoot, "dist", "routes.manifest.json");
  if (!existsSync(manifestPath)) return null;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  return Array.isArray(manifest.routes) ? manifest.routes.length : 0;
}

function inspectApp(appRoot: string) {
  const routesResult = writeRoutesManifest({ appRoot });
  const renderResult = writeRenderManifest({ appRoot });
  const mapResult = writeLuminaMap({ appRoot });
  const routes = routesResult.manifest.routes;

  return {
    routes,
    artifacts: [
      routesResult.path,
      renderResult.path,
      mapResult.path,
    ],
    diagnostics: [
      ...routesResult.manifest.diagnostics,
      ...renderResult.manifest.diagnostics,
      ...mapResult.map.diagnostics,
    ],
    summary: {
      routeCount: routes.length,
      pageCount: routes.filter((route) => route.kind === "page").length,
      apiRouteCount: routes.filter((route) => route.kind === "api").length,
      staticRouteCount: routes.filter((route) => route.renderMode === "static").length,
      artifactCount: 3,
    },
  };
}

function normalizeCliPath(path: string): string {
  return path.replaceAll("\\", "/").replace(/^\.\//, "");
}

function formatDevStartupError(error: unknown, port: number): string {
  const message = error instanceof Error ? error.message : String(error);
  if (message.toLowerCase().includes("port") || message.toLowerCase().includes("eaddrinuse")) {
    return `Port ${port} is already in use. Choose another port with --port <port>.`;
  }
  return `Lumina dev failed to start: ${message}`;
}

async function waitForShutdown(close: () => Promise<void>): Promise<void> {
  await new Promise<void>((resolveShutdown) => {
    const shutdown = () => resolveShutdown();
    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  });
  await close();
}

if (import.meta.main) {
  const exitCode = await runCli(process.argv.slice(2));
  process.exit(exitCode);
}
