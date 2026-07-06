import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { cp } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, test } from "bun:test";
import * as compiler from "../packages/compiler/src/index";

const routeFixture = join(import.meta.dir, "fixtures", "route-discovery", "basic-app");

async function createWritableFixture(): Promise<string> {
  const appRoot = mkdtempSync(join(tmpdir(), "lumina-artifacts-"));
  await cp(routeFixture, appRoot, { recursive: true });
  return appRoot;
}

describe("render and map artifact generation", () => {
  test("writes deterministic render and map artifacts from discovered routes", async () => {
    const appRoot = await createWritableFixture();

    try {
      expect(typeof compiler.writeRenderManifest).toBe("function");
      expect(typeof compiler.writeLuminaMap).toBe("function");

      compiler.writeRoutesManifest({ appRoot });
      const renderResult = compiler.writeRenderManifest({ appRoot });
      const mapResult = compiler.writeLuminaMap({ appRoot });

      const renderRaw = readFileSync(join(appRoot, ".lumina", "render-manifest.json"), "utf8");
      const mapRaw = readFileSync(join(appRoot, ".lumina", "map.json"), "utf8");

      expect(renderRaw).not.toContain("\n");
      expect(mapRaw).not.toContain("\n");
      expect(JSON.parse(renderRaw)).toEqual(renderResult.manifest);
      expect(JSON.parse(mapRaw)).toEqual(mapResult.map);

      expect(renderResult).toMatchObject({
        path: ".lumina/render-manifest.json",
        manifest: {
          schemaVersion: "lumina.render-manifest.v0",
          generatedBy: {
            package: "@lumina/compiler",
            version: "0.0.0",
          },
          source: {
            routesManifest: ".lumina/routes.json",
          },
        },
      });
      expect(renderResult.manifest.routes.find((route) => route.path === "/")).toEqual({
        id: "app.page",
        path: "/",
        mode: "static",
        sourceFile: "app/page.tsx",
        generatedFiles: [
          ".lumina/routes.json",
          ".lumina/render-manifest.json",
        ],
      });
      expect(renderResult.manifest.routes.find((route) => route.path === "/api/health")?.mode).toBe("api");

      expect(mapResult).toMatchObject({
        path: ".lumina/map.json",
        map: {
          schemaVersion: "lumina.map.v0",
          generatedBy: {
            package: "@lumina/compiler",
            version: "0.0.0",
          },
          source: {
            routesManifest: ".lumina/routes.json",
            renderManifest: ".lumina/render-manifest.json",
          },
        },
      });
      expect(mapResult.map.nodes).toContainEqual({
        id: "route:/",
        kind: "route",
        label: "/",
      });
      expect(mapResult.map.nodes).toContainEqual({
        id: "file:app/page.tsx",
        kind: "page",
        label: "app/page.tsx",
      });
      expect(mapResult.map.nodes).toContainEqual({
        id: "artifact:.lumina/map.json",
        kind: "manifest",
        label: ".lumina/map.json",
      });
      expect(mapResult.map.edges).toContainEqual({
        id: "edge:route:app.page:source",
        from: "route:/",
        to: "file:app/page.tsx",
        kind: "route.source",
        source: "file",
        confidence: "high",
        why: "app/page.tsx defines the / route.",
      });
      expect(mapResult.map.edges).toContainEqual({
        id: "edge:route:app.page:layout:app.layout",
        from: "route:/",
        to: "file:app/layout.tsx",
        kind: "route.layout",
        source: "file",
        confidence: "high",
        why: "app/layout.tsx wraps the / route.",
      });
      expect(mapResult.map.edges).toContainEqual({
        id: "edge:route:app.page:render",
        from: "route:/",
        to: "artifact:.lumina/render-manifest.json",
        kind: "route.renderMode",
        source: "convention",
        confidence: "medium",
        why: "The render manifest records static mode for /.",
      });
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  });
});
