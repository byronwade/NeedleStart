import { createServer } from "node:net";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { fileURLToPath } from "node:url";
import { chromium, type Browser } from "playwright";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const appRoot = fileURLToPath(new URL("../apps/www/", import.meta.url));

const watchdog = setTimeout(() => {
  console.error("Browser hydration check timed out.");
  process.exit(1);
}, 20_000);

const port = await getFreePort();
const devUrl = `http://127.0.0.1:${port}`;
console.log("Starting Lumina dev server...");
const dev = spawn("bun", ["packages/cli/src/index.ts", "dev", appRoot, "--port", String(port)], {
  cwd: repoRoot,
  env: { ...process.env, NO_COLOR: "1" },
});
const devOutput: string[] = [];
dev.stdout.on("data", (chunk) => devOutput.push(String(chunk)));
dev.stderr.on("data", (chunk) => devOutput.push(String(chunk)));
await waitForServer(devUrl, dev, devOutput);

console.log("Launching Chromium...");
let browser: Browser | undefined;

try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  page.setDefaultTimeout(5_000);
  console.log(`Opening ${devUrl}...`);
  await page.goto(devUrl, { waitUntil: "domcontentloaded" });

  console.log("Checking hydrated counter...");
  const counter = page.getByRole("button", { name: "Hydrated clicks: 0" });
  await counter.waitFor({ state: "visible" });
  await counter.click();
  await page.getByRole("button", { name: "Hydrated clicks: 1" }).waitFor({ state: "visible" });

  console.log("Browser hydration check passed.");
} finally {
  clearTimeout(watchdog);
  await browser?.close();
  await stopProcess(dev);
}

async function getFreePort(): Promise<number> {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (typeof address === "object" && address) {
        const selectedPort = address.port;
        server.close(() => resolve(selectedPort));
      } else {
        server.close(() => reject(new Error("Unable to allocate a localhost port.")));
      }
    });
  });
}

async function waitForServer(url: string, process: ChildProcessWithoutNullStreams, output: string[]): Promise<void> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 10_000) {
    if (process.exitCode !== null) {
      throw new Error(`Lumina dev server exited early with code ${process.exitCode}.\n${output.join("")}`);
    }

    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(500) });
      if (response.status < 500) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  throw new Error(`Timed out waiting for Lumina dev server at ${url}.\n${output.join("")}`);
}

async function stopProcess(process: ChildProcessWithoutNullStreams): Promise<void> {
  if (process.exitCode !== null) return;
  await new Promise<void>((resolve) => {
    process.once("exit", () => resolve());
    process.kill();
    setTimeout(resolve, 2_000).unref();
  });
}
