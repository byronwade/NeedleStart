import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { cp } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, test } from "bun:test";
import * as cli from "../packages/cli/src/index";

const routeFixture = join(import.meta.dir, "fixtures", "route-discovery", "basic-app");

async function createWritableFixture(): Promise<string> {
  const appRoot = mkdtempSync(join(tmpdir(), "lumina-inspect-"));
  await cp(routeFixture, appRoot, { recursive: true });
  return appRoot;
}

describe("inspect CLI", () => {
  test("prints JSON-only app inspection data and writes required artifacts", async () => {
    const appRoot = await createWritableFixture();
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      const exitCode = await cli.runCli(["inspect", appRoot, "--json"], {
        stdout: (text) => stdout.push(text),
        stderr: (text) => stderr.push(text),
      });

      expect(exitCode).toBe(0);
      expect(stderr).toEqual([]);
      expect(stdout).toHaveLength(1);

      const payload = JSON.parse(stdout[0]!);
      expect(payload).toEqual({
        schemaVersion: "lumina.cli.v0",
        command: "lumina inspect",
        status: "ok",
        data: {
          target: ".",
          summary: {
            routeCount: 7,
            pageCount: 5,
            apiRouteCount: 2,
            staticRouteCount: 5,
            artifactCount: 3,
          },
          related: [
            ".lumina/routes.json",
            ".lumina/render-manifest.json",
            ".lumina/map.json",
          ],
        },
        diagnostics: [],
        meta: {
          cwd: ".",
        },
      });
      for (const artifact of payload.data.related) {
        expect(readFileSync(join(appRoot, artifact), "utf8")).not.toContain("\n");
      }
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  });

  test("explains why a route exists with stable human output", async () => {
    const appRoot = await createWritableFixture();
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      const exitCode = await cli.runCli(["inspect", appRoot, "why", "/"], {
        stdout: (text) => stdout.push(text),
        stderr: (text) => stderr.push(text),
      });

      expect(exitCode).toBe(0);
      expect(stderr).toEqual([]);
      expect(stdout).toEqual([
        [
          "Route /",
          "Source: app/page.tsx",
          "Render mode: static",
          "Layouts: app/layout.tsx",
          "Artifacts: .lumina/routes.json, .lumina/render-manifest.json, .lumina/map.json",
          "Why: app/page.tsx defines the / route; app/layout.tsx wraps it; the render manifest records static mode.",
        ].join("\n"),
      ]);
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  });
});
