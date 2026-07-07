import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  createGraphEdge,
  luminaCoreStatus,
  type AdapterManifest,
  type CachePlan,
  type GraphEdge,
  type LuminaApp,
  type LuminaDiagnostic,
  type RenderMode,
  type RouteNode,
} from "../packages/core/src/index";

const root = resolve(import.meta.dir, "..");

describe("Phase 1 scaffold", () => {
  test("root package exposes enforcement scripts", () => {
    const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
      scripts: Record<string, string>;
    };

    expect(packageJson.scripts.check).toBe(
      "bun run docs:check && bun run structure:check && bun run performance:check && bun run typecheck && bun test && bun run test:browser",
    );
    expect(packageJson.scripts["docs:check"]).toBe("bun scripts/check-docs.ts");
    expect(packageJson.scripts["structure:check"]).toBe("bun scripts/check-structure.ts");
    expect(packageJson.scripts["performance:check"]).toBe("bun scripts/check-performance-docs.ts");
    expect(packageJson.scripts.test).toBe("bun test tests/**/*.test.ts");
    expect(packageJson.scripts["test:browser"]).toBe("tsx scripts/check-browser-hydration.ts");
    expect(packageJson.scripts.typecheck).toBe("tsc -p tsconfig.json --noEmit");
  });

  test("core graph edges keep required evidence fields", () => {
    const edge = createGraphEdge({
      id: "edge:route-home-to-page",
      from: "route:/",
      to: "file:app/page.tsx",
      kind: "route.source",
      source: "file",
      confidence: "high",
      why: "The route manifest maps / to app/page.tsx.",
    });

    expect(edge.kind).toBe("route.source");
    expect(edge.source).toBe("file");
    expect(edge.confidence).toBe("high");
    expect(edge.why.length).toBeGreaterThan(0);
  });

  test("shared core types are available for future packages", () => {
    const renderMode: RenderMode = "static";
    const app: LuminaApp = {
      schemaVersion: "lumina.app.v0",
      name: "fixture",
      root: ".",
      routeRoot: "app",
      generatedBy: {
        package: "@lumina/compiler",
        version: "0.0.0",
      },
      routes: [],
      diagnostics: [],
    };
    const route: RouteNode = {
      id: "route:/",
      kind: "page",
      path: "/",
      sourceFile: "app/page.tsx",
      renderMode,
      segments: [],
      params: [],
      layouts: [],
      routeGroups: [],
      diagnostics: [],
    };
    const diagnostic: LuminaDiagnostic = {
      code: "LUMINA_PLACEHOLDER",
      severity: "info",
      category: "manifest",
      message: "Placeholder diagnostic shape.",
    };
    const cache: CachePlan = {
      mode: "no-store",
      scope: "server",
      reason: "Dynamic route defaults to no-store until explicit caching is configured.",
    };
    const publicCache: CachePlan = {
      mode: "ttl",
      scope: "shared",
      ttlSeconds: 60,
      staleSeconds: 300,
      tags: ["home"],
      reason: "Explicit shared TTL cache policy.",
    };
    const adapter: AdapterManifest = {
      schemaVersion: "lumina.adapter.v0",
      adapter: "bun",
      package: "@lumina/adapter-bun",
      generatedBy: {
        package: "@lumina/compiler",
        version: "0.0.0",
      },
      runtime: { name: "bun" },
      capabilities: {},
      unsupported: [],
    };
    const edge: GraphEdge = createGraphEdge({
      id: "edge:example",
      from: route.id,
      to: "file:app/page.tsx",
      kind: "route.source",
      source: "file",
      confidence: "high",
      why: "Example edge for scaffold type coverage.",
    });

    expect(app.name).toBe("fixture");
    expect(route.renderMode).toBe("static");
    expect(diagnostic.severity).toBe("info");
    expect(cache.mode).toBe("no-store");
    expect(publicCache.ttlSeconds).toBe(60);
    expect(publicCache.staleSeconds).toBe(300);
    expect(adapter.runtime.name).toBe("bun");
    expect(edge.why).toContain("scaffold");
    expect(luminaCoreStatus.implementsRuntimeBehavior).toBe(false);
  });

  test("agent playbooks stay under docs", () => {
    expect(existsSync(join(root, "skills"))).toBe(false);
    expect(existsSync(join(root, "subagents"))).toBe(false);
    expect(existsSync(join(root, "docs/skills"))).toBe(true);
    expect(existsSync(join(root, "docs/subagents"))).toBe(true);
  });
});
