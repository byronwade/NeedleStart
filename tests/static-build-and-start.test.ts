import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:net";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import * as cli from "../packages/cli/src/index";

const repoRoot = join(import.meta.dir, "..");
const wwwRoot = join(repoRoot, "apps", "www");

describe("static build and Bun start integration", () => {
  test("Bun adapter request path stays generated-output only", () => {
    const adapterSource = readFileSync(join(repoRoot, "packages", "adapters", "bun", "src", "index.ts"), "utf8");

    for (const forbidden of [
      "@lumina/compiler",
      "@lumina/map",
      "@lumina/agent",
      "@lumina/mcp",
      "@lumina/devtools",
      "node:fs",
      "readFile",
      "readdir",
      "glob",
      ".lumina/build-trace",
      ".lumina/hmr-report",
      "docs/",
    ]) {
      expect(adapterSource).not.toContain(forbidden);
    }

    expect(adapterSource).toContain("dist/public");
    expect(adapterSource).toContain("Bun.file");
  });

  test("CLI build emits static HTML, manifests, and early build reports for apps/www", async () => {
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await cli.runCli(["build", wwwRoot, "--json"], {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout).toHaveLength(1);

    const output = JSON.parse(stdout[0]!);
    expect(output.schemaVersion).toBe("lumina.cli.v0");
    expect(output.command).toBe("lumina build");
    expect(output.status).toBe("ok");
    expect(output.data.routes).toBe(17);
    expect(output.data.outputs).toContain("dist/public/index.html");
    expect(output.data.outputs).toContain("dist/public/about/index.html");
    expect(output.data.outputs).toContain("dist/public/docs/reference/cli/index.html");
    expect(output.data.outputs).toContain("dist/public/_lumina/client/app.page.js");
    expect(output.data.manifests).toContain(".lumina/build-trace.json");
    expect(output.data.manifests).toContain(".lumina/perf.report.json");
    expect(output.data.manifests).toContain("dist/adapter.manifest.json");

    for (const artifact of [
      ".lumina/routes.json",
      ".lumina/render-manifest.json",
      ".lumina/map.json",
      ".lumina/build-trace.json",
      ".lumina/perf.report.json",
      "dist/routes.manifest.json",
      "dist/render.manifest.json",
      "dist/adapter.manifest.json",
    ]) {
      const artifactPath = join(wwwRoot, artifact);
      expect(existsSync(artifactPath)).toBe(true);
      expect(readFileSync(artifactPath, "utf8")).not.toContain("\n");
    }

    const homeHtml = readFileSync(join(wwwRoot, "dist", "public", "index.html"), "utf8");
    expect(homeHtml).toContain("<h1>Your app ships with a map.</h1>");
    expect(homeHtml).toContain('data-lumina-route="/"');
    expect(homeHtml).toContain('<script type="module" src="/_lumina/client/app.page.js"></script>');
    expect(readFileSync(join(wwwRoot, "dist", "public", "_lumina", "client", "app.page.js"), "utf8")).toContain("hydrateRoot");

    const buildTrace = readFileSync(join(wwwRoot, ".lumina", "build-trace.json"), "utf8");
    const perfReport = readFileSync(join(wwwRoot, ".lumina", "perf.report.json"), "utf8");
    const secondBuildExitCode = await cli.runCli(["build", wwwRoot, "--json"], {
      stdout: () => {},
      stderr: (text) => stderr.push(text),
    });
    expect(secondBuildExitCode).toBe(0);
    expect(readFileSync(join(wwwRoot, ".lumina", "build-trace.json"), "utf8")).toBe(buildTrace);
    expect(readFileSync(join(wwwRoot, ".lumina", "perf.report.json"), "utf8")).toBe(perfReport);
  }, 20_000);

  test("Bun adapter serves built static output without source route files", async () => {
    const appRoot = createBuildStartApp();

    try {
      const buildExitCode = await cli.runCli(["build", appRoot, "--json"], {
        stdout: () => {},
        stderr: () => {},
      });
      expect(buildExitCode).toBe(0);

      rmSync(join(appRoot, "app"), { recursive: true, force: true });

      const { startBuiltLuminaApp } = await import("../packages/adapters/bun/src/index");
      expect(typeof startBuiltLuminaApp).toBe("function");

      const port = await getFreePort();
      const server = await startBuiltLuminaApp({
        appRoot,
        host: "127.0.0.1",
        port,
      });

      try {
        const home = await fetchWithTimeout(`${server.url}/`);
        expect(home.status).toBe(200);
        expect(home.headers.get("content-type")).toContain("text/html");
        expect(home.headers.get("cache-control")).toBe("no-store");
        expect(await home.text()).toContain("<h1>Built Home</h1>");

        const about = await fetchWithTimeout(`${server.url}/about`);
        expect(about.status).toBe(200);
        expect(about.headers.get("cache-control")).toBe("no-store");
        expect(await about.text()).toContain("<h1>Built About</h1>");

        const clientBundle = await fetchWithTimeout(`${server.url}/_lumina/client/app.page.js`);
        expect(clientBundle.status).toBe(200);
        expect(clientBundle.headers.get("content-type")).toContain("application/javascript");
        expect(clientBundle.headers.get("cache-control")).toBe("public, max-age=31536000, immutable");
        expect(await clientBundle.text()).toContain("hydrateRoot");

        const missing = await fetchWithTimeout(`${server.url}/missing`);
        expect(missing.status).toBe(404);
        expect(missing.headers.get("cache-control")).toBe("no-store");
        expect(await missing.text()).toContain("Lumina route not found");

        const malformedAsset = await fetchWithTimeout(`${server.url}/%E0%A4%A.js`);
        expect(malformedAsset.status).toBe(400);
        expect(malformedAsset.headers.get("content-type")).toContain("text/html");
        expect(malformedAsset.headers.get("cache-control")).toBe("no-store");
        const malformedBody = await malformedAsset.text();
        expect(malformedBody).toContain("Lumina request invalid");
        expect(malformedBody).not.toContain("URIError");
        expect(malformedBody).not.toContain("decodeURIComponent");
      } finally {
        await server.close();
      }
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);

  test("Bun adapter serves built SSR output without source route files and sanitizes SSR errors", async () => {
    const appRoot = createSsrBuildStartApp();

    try {
      const stdout: string[] = [];
      const buildExitCode = await cli.runCli(["build", appRoot, "--json"], {
        stdout: (text) => stdout.push(text),
        stderr: () => {},
      });
      expect(buildExitCode).toBe(0);

      const output = JSON.parse(stdout[0]!);
      expect(output.data.outputs).toContain("dist/public/index.html");
      expect(output.data.outputs).toContain("dist/server/ssr-routes.js");

      const adapterManifest = JSON.parse(readFileSync(join(appRoot, "dist", "adapter.manifest.json"), "utf8"));
      expect(adapterManifest.capabilities.ssr).toBe(true);
      expect(adapterManifest.unsupported.map((item: { feature: string }) => item.feature)).not.toContain("ssr");

      rmSync(join(appRoot, "app"), { recursive: true, force: true });

      const { startBuiltLuminaApp } = await import("../packages/adapters/bun/src/index");
      const server = await startBuiltLuminaApp({
        appRoot,
        host: "127.0.0.1",
        port: await getFreePort(),
      });

      try {
        const dashboard = await fetchWithTimeout(`${server.url}/dashboard?tab=reports`);
        expect(dashboard.status).toBe(200);
        expect(dashboard.headers.get("content-type")).toContain("text/html");
        expect(dashboard.headers.get("cache-control")).toBe("no-store");
        const dashboardBody = await dashboard.text();
        expect(dashboardBody).toContain("<h1>SSR Dashboard</h1>");
        expect(dashboardBody).toContain("reports");
        expect(dashboardBody).toContain('data-lumina-route="/dashboard"');

        const broken = await fetchWithTimeout(`${server.url}/broken`);
        expect(broken.status).toBe(500);
        expect(broken.headers.get("cache-control")).toBe("no-store");
        const brokenBody = await broken.text();
        expect(brokenBody).toContain("Lumina server error");
        expect(brokenBody).not.toContain("Exploded SSR secret");
        expect(brokenBody).not.toContain(appRoot);
      } finally {
        await server.close();
      }
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);

  test("CLI can smoke-start built output and close", async () => {
    const appRoot = createBuildStartApp();
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      const buildExitCode = await cli.runCli(["build", appRoot, "--json"], {
        stdout: () => {},
        stderr: () => {},
      });
      expect(buildExitCode).toBe(0);

      const port = await getFreePort();
      const startExitCode = await cli.runCli(["start", appRoot, "--port", String(port), "--once"], {
        stdout: (text) => stdout.push(text),
        stderr: (text) => stderr.push(text),
      });

      expect(startExitCode).toBe(0);
      expect(stderr).toEqual([]);
      expect(stdout).toHaveLength(1);
      expect(stdout[0]).toContain(`Lumina start ${appRoot}`);
      expect(stdout[0]).toContain("Local http://127.0.0.1:");
      expect(stdout[0]).toContain("Routes 2");
      expect(stdout[0]).toContain("Serving dist/public");
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);

  test("CLI start reports a clean error before build output exists", async () => {
    const appRoot = createBuildStartApp();
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      const port = await getFreePort();
      const startExitCode = await cli.runCli(["start", appRoot, "--port", String(port), "--once"], {
        stdout: (text) => stdout.push(text),
        stderr: (text) => stderr.push(text),
      });

      expect(startExitCode).toBe(4);
      expect(stdout).toEqual([]);
      expect(stderr).toHaveLength(1);
      expect(stderr[0]).toContain("Build output not found");
      expect(stderr[0]).toContain("lumina build");
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);
});

function createBuildStartApp(): string {
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, "lumina-build-start-"));
  mkdirSync(join(appRoot, "app", "about"), { recursive: true });

  writeFileSync(
    join(appRoot, "app", "layout.tsx"),
    [
      "export default function RootLayout({ children }: { children: unknown }) {",
      "  return <html lang=\"en\"><body>{children}</body></html>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "page.tsx"),
    [
      "export default function HomePage() {",
      "  return <main><h1>Built Home</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "about", "page.tsx"),
    [
      "export default function AboutPage() {",
      "  return <main><h1>Built About</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}

function createSsrBuildStartApp(): string {
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, "lumina-ssr-build-start-"));
  for (const directory of ["app", "app/dashboard", "app/broken"]) {
    mkdirSync(join(appRoot, directory), { recursive: true });
  }

  writeFileSync(
    join(appRoot, "app", "layout.tsx"),
    [
      "export default function RootLayout({ children }: { children: unknown }) {",
      "  return <html lang=\"en\"><body>{children}</body></html>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "page.tsx"),
    [
      "export default function HomePage() {",
      "  return <main><h1>Static Home</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "dashboard", "page.tsx"),
    [
      "import { ssr } from \"@lumina/react\";",
      "export const render = ssr();",
      "export default function DashboardPage({ searchParams }: { searchParams: Record<string, string | string[]> }) {",
      "  return <main><h1>SSR Dashboard</h1><p>{searchParams.tab}</p></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "broken", "page.tsx"),
    [
      "import { ssr } from \"@lumina/react\";",
      "export const render = ssr();",
      "export default function BrokenPage() {",
      "  throw new Error(\"Exploded SSR secret\");",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}

async function getFreePort(): Promise<number> {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (typeof address === "object" && address) {
        const port = address.port;
        server.close(() => resolve(port));
      } else {
        server.close(() => reject(new Error("Unable to allocate a localhost port.")));
      }
    });
  });
}

async function fetchWithTimeout(url: string): Promise<Response> {
  return await fetch(url, { signal: AbortSignal.timeout(5_000) });
}
