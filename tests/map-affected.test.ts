import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import * as cli from "../packages/cli/src/index";
import * as compiler from "../packages/compiler/src/index";
import { getAffectedRoutes } from "../packages/map/src/index";

describe("Lumina Map affected queries", () => {
  test("map output records direct component imports and affected routes", () => {
    const appRoot = createImportGraphApp();

    try {
      const map = compiler.createLuminaMap({ appRoot });

      expect(map.nodes).toContainEqual({
        id: "file:components/Hero.tsx",
        kind: "component",
        label: "components/Hero.tsx",
        sourceFile: "components/Hero.tsx",
      });
      expect(map.edges).toContainEqual({
        id: "edge:file:app.page:imports:components.Hero",
        from: "file:app/page.tsx",
        to: "file:components/Hero.tsx",
        kind: "file.imports",
        source: "static-analysis",
        confidence: "high",
        why: "app/page.tsx imports components/Hero.tsx.",
      });

      expect(getAffectedRoutes(map, "components/Hero.tsx")).toEqual([
        {
          id: "app.page",
          path: "/",
          sourceFile: "app/page.tsx",
          reason: "components/Hero.tsx is imported by app/page.tsx, which defines /.",
        },
      ]);
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  });

  test("CLI emits compact JSON for map affected queries", async () => {
    const appRoot = createImportGraphApp();
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      const exitCode = await cli.runCli(["map", "affected", appRoot, "components/Hero.tsx", "--json"], {
        stdout: (text) => stdout.push(text),
        stderr: (text) => stderr.push(text),
      });

      expect(exitCode).toBe(0);
      expect(stderr).toEqual([]);
      expect(stdout).toHaveLength(1);
      expect(stdout[0]).not.toContain("\n");

      const output = JSON.parse(stdout[0]!);
      expect(output).toEqual({
        schemaVersion: "lumina.cli.v0",
        command: "lumina map affected",
        status: "ok",
        data: {
          target: "components/Hero.tsx",
          affectedRoutes: [
            {
              id: "app.page",
              path: "/",
              sourceFile: "app/page.tsx",
              reason: "components/Hero.tsx is imported by app/page.tsx, which defines /.",
            },
          ],
          relatedFiles: ["app/page.tsx", "components/Hero.tsx"],
          mapArtifact: ".lumina/map.json",
        },
        diagnostics: [],
        meta: {
          cwd: ".",
        },
      });
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  });
});

function createImportGraphApp(): string {
  const appRoot = mkdtempSync(join(tmpdir(), "lumina-map-affected-"));
  mkdirSync(join(appRoot, "app"), { recursive: true });
  mkdirSync(join(appRoot, "components"), { recursive: true });

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
      "import { Hero } from \"../components/Hero\";",
      "export default function HomePage() {",
      "  return <main><Hero /></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "components", "Hero.tsx"),
    [
      "export function Hero() {",
      "  return <h1>Lumina Map</h1>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}
