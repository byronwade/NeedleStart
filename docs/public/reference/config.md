# Configuration Reference

Status: Scaffolded.

Audience: app developers, adapter maintainers.

Lumina configuration lives in `lumina.config.ts` for the current Bun build path. The MVP loader parses literal default exports and `defineConfig({ ... })` wrapper syntax at build time.

## MVP Config

```ts
import { defineConfig } from "lumina"

export default defineConfig({
  appDir: "app",
  outputDir: ".lumina",
  outDir: "dist",
  runtime: "bun",
  adapter: "bun",
})
```

`runtime` is the local execution and server-code compatibility target. `adapter` is the production output selector. The implemented MVP pair is `runtime: "bun"` and `adapter: "bun"`, which maps to `@lumina/adapter-bun`. `adapter: "node"` maps to the planned `@lumina/adapter-node`, and `adapter: "static"` maps to the planned `@lumina/adapter-static`. Build output records the resolved adapter runtime in `dist/adapter.manifest.json` as `runtime.name`.

Unsupported `runtime`, `adapter`, `appDir`, `outputDir`, or `outDir` values produce config diagnostics before build output is emitted.

## Environment Rules

Environment behavior is planned, not implemented. Server-only environment variables must not be exposed to browser bundles by default. Client-exposed values require an explicit public prefix or allow-list. `.env*` loading must be deterministic, diagnostics must not print secret values, and generated artifacts must not serialize secrets.

The planned public prefix is `LUMINA_PUBLIC_`, but the final prefix must be confirmed before client environment support ships.

## Generated Output Impact

Config fields that affect routes, rendering, SEO, performance, workspace graph, affected work, agent context, browser bundle generation, or adapter behavior must be reflected in generated artifacts such as `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/graph.json`, `.lumina/seo.report.json`, `.lumina/perf.report.json`, `.lumina/workspace.json`, `.lumina/workspace-graph.json`, `.lumina/affected.json`, `.lumina/build-trace.json`, `.lumina/cache-report.json`, `.lumina/hmr-report.json`, `.lumina/split-report.json`, `.lumina/context/*.ctx.json`, `.lumina/context/agent-index.json`, `.lumina/mutations.json`, `.lumina/client/*.js`, `.lumina/generated/*`, `.lumina/generated/server-entry.ts`, `.lumina/generated/client/*.tsx`, `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, `dist/adapter.manifest.json`, and `dist/*`.

Runtime adapters should consume normalized generated output instead of rediscovering raw source config in production.

## Planned Normalized Config

When config is serialized for tools or generated artifacts, the current Bun build path includes:

- `schemaVersion`
- `root`
- `appDir`
- `outputDir`
- `luminaDir`
- `outDir`
- `runtime`
- `adapter`
- `mode`

Normalized config output should use relative paths when possible, avoid absolute local paths in public or agent-facing artifacts, and never serialize secrets.

## Source

- [Configuration Reference](../../config.md)
- [Configuration Contract](../../config-contract.md)

