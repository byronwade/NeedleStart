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
import { startLuminaDevServer } from "../packages/vite-plugin/src/index";

const repoRoot = join(import.meta.dir, "..");
const wwwRoot = join(repoRoot, "apps", "www");

describe("Vite dev integration", () => {
  test("serves apps/www routes with generated route, render, and map artifacts", async () => {
    const port = await getFreePort();
    const dev = await startLuminaDevServer({
      appRoot: wwwRoot,
      host: "127.0.0.1",
      port,
      logLevel: "silent",
    });

    try {
      expect(dev.routes.map((route) => route.path)).toEqual([
        "/about",
        "/benchmarks",
        "/docs",
        "/examples",
        "/roadmap",
        "/",
      ]);
      expect(dev.url).toStartWith("http://127.0.0.1:");

      const home = await fetch(`${dev.url}/`);
      expect(home.status).toBe(200);
      expect(home.headers.get("content-type")).toContain("text/html");
      const homeHtml = await home.text();
      expect(homeHtml).toContain("<h1>Your app ships with a map.</h1>");
      expect(homeHtml).toContain('data-lumina-route="/"');
      expect(homeHtml).toContain('<script type="module" src="/@lumina/client/app.page.js"></script>');

      const clientEntry = await fetch(`${dev.url}/@lumina/client/app.page.js`);
      expect(clientEntry.status).toBe(200);
      const clientEntryJs = await clientEntry.text();
      expect(clientEntryJs).toContain("hydrateRoot");
      expect(clientEntryJs).toContain("Your app ships with a map.");
      expect(clientEntryJs).toContain("document");

      const docs = await fetch(`${dev.url}/docs`);
      expect(docs.status).toBe(200);
      expect(await docs.text()).toContain("<h1>Documentation</h1>");

      const viteClient = await fetch(`${dev.url}/@vite/client`);
      expect(viteClient.status).toBe(200);
      expect(await viteClient.text()).toContain("createHotContext");

      const missing = await fetch(`${dev.url}/missing`);
      expect(missing.status).toBe(404);
      expect(await missing.text()).toContain("Route not found: /missing");

      for (const artifact of [
        ".lumina/routes.json",
        ".lumina/render-manifest.json",
        ".lumina/map.json",
      ]) {
        const path = join(wwwRoot, artifact);
        expect(existsSync(path)).toBe(true);
        expect(readFileSync(path, "utf8")).not.toContain("\n");
      }
    } finally {
      await dev.close();
    }
  }, 15_000);

  test("CLI can smoke-start and close the dev server", async () => {
    const port = await getFreePort();
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await cli.runCli(["dev", wwwRoot, "--port", String(port), "--once"], {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout).toHaveLength(1);
    expect(stdout[0]).toContain(`Lumina dev ${wwwRoot}`);
    expect(stdout[0]).toContain("Local http://127.0.0.1:");
    expect(stdout[0]).toContain("Routes 6");
    expect(stdout[0]).toContain("Artifacts .lumina/routes.json, .lumina/render-manifest.json, .lumina/map.json");
  });

  test("serves the virtual routes module during SSR", async () => {
    const appRoot = createVirtualRoutesApp();
    const port = await getFreePort();
    const dev = await startLuminaDevServer({
      appRoot,
      host: "127.0.0.1",
      port,
      logLevel: "silent",
    });

    try {
      const response = await fetchWithTimeout(`${dev.url}/`);
      expect(response.status).toBe(200);
      const html = await response.text();
      expect(html).toContain("<h1>Virtual routes</h1>");
      expect(html).toContain("<p>/about,/</p>");
    } finally {
      await dev.close();
      rmSync(appRoot, { recursive: true, force: true });
    }
  });

  test("passes dynamic and catch-all route params to dev page renders", async () => {
    const appRoot = createDynamicRoutesApp();
    const port = await getFreePort();
    const dev = await startLuminaDevServer({
      appRoot,
      host: "127.0.0.1",
      port,
      logLevel: "silent",
    });

    try {
      const blog = await fetchWithTimeout(`${dev.url}/blog/hello-lumina`);
      expect(blog.status).toBe(200);
      const blogHtml = await blog.text();
      expect(blogHtml).toContain("<h1>Post");
      expect(blogHtml).toContain("hello-lumina</h1>");

      const docs = await fetchWithTimeout(`${dev.url}/docs/guide/getting-started`);
      expect(docs.status).toBe(200);
      const docsHtml = await docs.text();
      expect(docsHtml).toContain("<h1>Docs");
      expect(docsHtml).toContain("guide/getting-started</h1>");

      const missingParam = await fetchWithTimeout(`${dev.url}/blog`);
      expect(missingParam.status).toBe(404);
      expect(await missingParam.text()).toContain("Route not found: /blog");

      const search = await fetchWithTimeout(`${dev.url}/search?q=lumina&page=2`);
      expect(search.status).toBe(200);
      const searchHtml = await search.text();
      expect(searchHtml).toContain("<h1>Search");
      expect(searchHtml).toContain("lumina");
      expect(searchHtml).toContain("2</h1>");
    } finally {
      await dev.close();
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 15_000);

  test("regenerates route artifacts and HMR report when a page is added", async () => {
    const appRoot = createVirtualRoutesApp();
    const port = await getFreePort();
    const dev = await startLuminaDevServer({
      appRoot,
      host: "127.0.0.1",
      port,
      logLevel: "silent",
    });

    try {
      const routeDir = join(appRoot, "app", "contact");
      mkdirSync(routeDir, { recursive: true });
      writeFileSync(
        join(routeDir, "page.tsx"),
        [
          "export default function ContactPage() {",
          "  return <main><h1>Contact</h1></main>;",
          "}",
          "",
        ].join("\n"),
        "utf8",
      );

      await waitFor(() => {
        const routes = JSON.parse(readFileSync(join(appRoot, ".lumina", "routes.json"), "utf8"));
        return routes.routes.some((route: { path: string }) => route.path === "/contact");
      });

      const hmrReport = JSON.parse(readFileSync(join(appRoot, ".lumina", "hmr-report.json"), "utf8"));
      expect(hmrReport.schemaVersion).toBe("lumina.hmr-report.v0");
      expect(hmrReport.changedFile).toBe("app/contact/page.tsx");
      expect(hmrReport.routes.map((route: { path: string }) => route.path)).toContain("/contact");

      const response = await fetchWithTimeout(`${dev.url}/contact`);
      expect(response.status).toBe(200);
      expect(await response.text()).toContain("<h1>Contact</h1>");
    } finally {
      await dev.close();
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 15_000);
});

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

function createVirtualRoutesApp(): string {
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, "lumina-vite-virtual-"));
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
      "import { routes } from \"virtual:lumina/routes\";",
      "",
      "export default function HomePage() {",
      "  return <main><h1>Virtual routes</h1><p>{routes.map((route) => route.path).join(\",\")}</p></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "about", "page.tsx"),
    [
      "export default function AboutPage() {",
      "  return <main><h1>About</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}

function createDynamicRoutesApp(): string {
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, "lumina-vite-params-"));
  mkdirSync(join(appRoot, "app", "blog", "[slug]"), { recursive: true });
  mkdirSync(join(appRoot, "app", "docs", "[...parts]"), { recursive: true });
  mkdirSync(join(appRoot, "app", "search"), { recursive: true });

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
    join(appRoot, "app", "blog", "[slug]", "page.tsx"),
    [
      "export default function BlogPage({ params }: { params: { slug: string } }) {",
      "  return <main><h1>Post {params.slug}</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "docs", "[...parts]", "page.tsx"),
    [
      "export default function DocsPage({ params }: { params: { parts: string[] } }) {",
      "  return <main><h1>Docs {params.parts.join(\"/\")}</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "search", "page.tsx"),
    [
      "export default function SearchPage({ searchParams }: { searchParams: { q?: string; page?: string } }) {",
      "  return <main><h1>Search {searchParams.q}/{searchParams.page}</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}

async function waitFor(assertion: () => boolean): Promise<void> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 5_000) {
    if (assertion()) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Timed out waiting for assertion.");
}

async function fetchWithTimeout(url: string): Promise<Response> {
  return await fetch(url, { signal: AbortSignal.timeout(5_000) });
}
