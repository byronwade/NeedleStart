import { describe, expect, test } from "bun:test";
import {
  createGraphEdge,
  type AdapterManifest,
  type CachePlan,
  type DiagnosticLocation,
  type DiagnosticSource,
  type LuminaApp,
  type LuminaDiagnostic,
  type RouteNode,
} from "../packages/core/src/index";

describe("core model contracts", () => {
  test("route and app models carry manifest-ready evidence", () => {
    const source = {
      file: "app/(marketing)/pricing/page.tsx",
      owner: "compiler",
    } satisfies DiagnosticSource;
    const location = {
      line: 1,
      column: 1,
    } satisfies DiagnosticLocation;

    const diagnostic = {
      code: "ROUTE_DUPLICATE_PATH",
      severity: "error",
      category: "routing",
      message: "Two route files resolve to the same path.",
      source,
      location,
      routePath: "/pricing",
      docs: "docs/routing-contract.md#diagnostics",
      why: "Route groups do not affect public URL paths.",
      remediation: "Move one route to a different public segment.",
      related: [
        {
          file: "app/(shop)/pricing/page.tsx",
          line: 1,
          column: 1,
          message: "This route resolves to the same public path.",
        },
      ],
      tags: ["routing", "conflict"],
    } satisfies LuminaDiagnostic;

    const cache = {
      mode: "ttl",
      scope: "shared",
      ttlSeconds: 300,
      staleSeconds: 60,
      tags: ["docs:pricing"],
      headers: {
        "cache-control": "public, s-maxage=300, stale-while-revalidate=60",
      },
      reason: "Explicit prerender cache policy from route metadata.",
    } satisfies CachePlan;

    const route = {
      id: "app.$group_marketing.pricing.page",
      kind: "page",
      path: "/pricing",
      sourceFile: "app/(marketing)/pricing/page.tsx",
      renderMode: "prerender",
      segments: [
        { kind: "group", value: "marketing" },
        { kind: "static", value: "pricing" },
      ],
      params: [],
      layouts: ["app/layout.tsx"],
      routeGroups: ["marketing"],
      cache,
      diagnostics: [diagnostic],
      metadata: {
        title: "Pricing",
      },
    } satisfies RouteNode;

    const app = {
      schemaVersion: "lumina.app.v0",
      name: "fixture",
      root: ".",
      routeRoot: "app",
      generatedBy: {
        package: "@lumina/compiler",
        version: "0.0.0",
      },
      routes: [route],
      diagnostics: [diagnostic],
    } satisfies LuminaApp;

    expect(app.routes[0]?.kind).toBe("page");
    expect(app.routes[0]?.cache?.mode).toBe("ttl");
    expect(app.diagnostics[0]?.category).toBe("routing");
  });

  test("graph edges expose deterministic evidence and optional risk context", () => {
    const edge = createGraphEdge({
      id: "edge:pricing-route-source",
      from: "route:/pricing",
      to: "file:app/(marketing)/pricing/page.tsx",
      kind: "route.source",
      source: "file",
      confidence: "high",
      why: "The route manifest maps /pricing to app/(marketing)/pricing/page.tsx.",
      fields: ["sourceFile", "path"],
      risk: "low",
    });

    expect(edge.kind).toBe("route.source");
    expect(edge.source).toBe("file");
    expect(edge.confidence).toBe("high");
    expect(edge.fields).toEqual(["sourceFile", "path"]);
    expect(edge.risk).toBe("low");
  });

  test("adapter manifests describe capabilities, diagnostics, and source inputs", () => {
    const manifest = {
      schemaVersion: "lumina.adapter.v0",
      adapter: "bun",
      package: "@lumina/adapter-bun",
      generatedBy: {
        package: "@lumina/compiler",
        version: "0.0.0",
      },
      source: {
        routesManifest: ".lumina/routes.json",
        renderManifest: ".lumina/render-manifest.json",
      },
      runtime: {
        name: "bun",
        versionRange: ">=1.3.0",
      },
      entry: "dist/server/index.js",
      publicDir: "dist/public",
      capabilities: {
        staticAssets: true,
        ssr: true,
        streaming: false,
        compression: "adapter-dependent",
        earlyHints103: false,
      },
      unsupported: [
        {
          feature: "edge-runtime",
          reason: "The Bun adapter targets Bun.serve output.",
        },
      ],
      diagnostics: [],
    } satisfies AdapterManifest;

    expect(manifest.generatedBy.package).toBe("@lumina/compiler");
    expect(manifest.source.routesManifest).toBe(".lumina/routes.json");
    expect(manifest.capabilities.staticAssets).toBe(true);
  });
});
