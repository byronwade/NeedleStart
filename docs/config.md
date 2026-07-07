# Configuration Reference

Status: Scaffolded.

Audience: app developers, framework contributors, adapter maintainers, AI agents.

Lumina configuration lives in `lumina.config.ts` for the current Bun build path. The MVP loader parses literal default exports and `defineConfig({ ... })` wrapper syntax at build time; it does not evaluate arbitrary config code in production request handling.

The deeper loading, validation, environment, normalized-config, and generated-output rules are defined in [Configuration Contract](config-contract.md).

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

`runtime` describes the default local execution target and compatibility target for generated server code. `adapter` selects the production output package. The implemented MVP pair is `runtime: "bun"` and `adapter: "bun"`, which maps to `@lumina/adapter-bun`. `adapter: "node"` maps to the planned `@lumina/adapter-node`, and `adapter: "static"` maps to the planned `@lumina/adapter-static`. Resolved adapter output is reported in `dist/adapter.manifest.json` with `runtime.name`.

Unsupported `runtime`, `adapter`, `appDir`, `outputDir`, or `outDir` values produce config diagnostics before build output is emitted.

## Planned Config Areas

- Runtime target.
- Production adapter.
- Route behavior.
- SEO defaults.
- Cache defaults.
- Generated output paths.
- Agent and MCP behavior.
- Devtools.
- Performance budgets.

## Normalized Config

The current Bun build path serializes normalized config in `dist/adapter.manifest.json` with `schemaVersion`, `appDir`, `outputDir`, `outDir`, `runtime`, `adapter`, and `mode`. Future normalized config fields still include planned `root` handling and the `luminaDir` alias for generated framework artifacts.

Normalized config should prefer relative paths when possible, avoid absolute local paths in public or agent-facing artifacts, and never include secrets.

## Rules

- Config should be typed. The current parser accepts the `defineConfig()` wrapper syntax; full published package typing remains planned.
- Defaults should be explicit in reference docs.
- Runtime adapter options must not leak Bun-only APIs into user app code.
- Config changes that affect generated artifacts must update manifest docs.
- Config loading must be deterministic.
- Server-only environment variables must not leak into client bundles.
- Client-exposed environment variables require an explicit public prefix or allow-list.
- `.env*` loading must be deterministic.
- Environment variables must not leak secrets into client bundles or generated artifacts.
- Config diagnostics should use stable codes once released.

## Out Of Scope

- Final config defaults beyond the MVP Bun adapter path.
- Host-specific deployment config.
- Secret management beyond documented environment-variable safety rules.
