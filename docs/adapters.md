# Adapter Architecture

Status: Implemented.
Audience: app developers, framework contributors, deployment owners.

This page describes adapter architecture. Static built-output serving through `@lumina/adapter-bun` is implemented for build-time static page routes. Node adapter behavior, static export adapter behavior, SSR, API, hot API, streaming, compression, 103 Early Hints, and adapter-native route dispatch remain planned.

Lumina is planned to default to Bun, but the framework must not create an all-in Bun adoption risk.

Adapter support begins early so Bun is the fast default and Node/static output are credible deployment paths.

The planned adapter input/output contract, manifest shape, capability rules, environment variables, health endpoint behavior, diagnostics, fixture requirements, and compatibility evidence are defined in [Adapter Contract](adapter-contract.md).

## Goals

- Keep user application code runtime-portable.
- Isolate Bun-specific APIs inside adapter packages.
- Generate adapter-aware server entries.
- Document adapter capabilities in build output.
- Keep compression, 103 Early Hints, final `Link` headers, and bfcache-aware delivery adapter-owned and evidence-backed.
- Keep generated route tables canonical, while allowing adapter-native route dispatch only after parity and timing evidence.
- Benchmark Bun, Node, static, and comparable framework paths publicly.

## Initial Adapters

```txt
@lumina/adapter-bun
@lumina/adapter-node
@lumina/adapter-static
```

### `@lumina/adapter-bun`

Default adapter.

Implemented responsibility:

- Serve `dist/public` static HTML through `Bun.serve`.

Planned responsibilities:

- Use generated route matcher.
- Optionally lower compatible generated routes into native `Bun.serve({ routes })` when evidence proves it is faster.
- Serve static assets.
- Serve prerendered HTML.
- Invoke SSR handlers.
- Invoke API and hot API handlers.

### `@lumina/adapter-node`

Compatibility adapter.

Responsibilities:

- Use Node `http` or a small compatible server.
- Provide compatibility shims where needed.
- Run the same generated route matcher and handler contracts.
- Avoid requiring Bun-only APIs in user code.

### `@lumina/adapter-static`

Static export adapter.

Responsibilities:

- Export static routes.
- Emit sitemap and robots outputs.
- Fail clearly when non-static routes cannot be exported.
- Document unsupported runtime features in `dist/adapter.manifest.json`.

## Config

```ts
import { defineConfig } from "lumina"

export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

`runtime` describes the default local execution target. `adapter` controls production build output.

Config loading and validation rules are documented in `docs/config-contract.md`. Adapter packages should consume normalized generated output and should not require user application code to import Bun-only APIs.

## Generated Server Entry

```ts
// .lumina/generated/server-entry.ts
import { createServer } from "@lumina/adapter-bun"

export default createServer({
  manifest,
  routes,
  handlers,
})
```

The compiler chooses the adapter import during build. Runtime packages consume generated artifacts; they do not rediscover app source structure.

## Adapter Manifest

Adapter deployment output uses `dist/routes.manifest.json`, `dist/render.manifest.json`, and `dist/adapter.manifest.json` today for the static build path. `dist/seo.report.json` is planned. Every adapter manifest must include `runtime.name`, adapter package identity, explicit `capabilities`, unsupported features, environment-variable names, and diagnostics.

```json
{
  "schemaVersion": "lumina.adapter.v0",
  "adapter": "bun",
  "package": "@lumina/adapter-bun",
  "runtime": {
    "name": "bun"
  },
  "capabilities": {
    "static": true,
    "ssr": false,
    "api": false,
    "hotApi": false,
    "streaming": false,
    "nativeRouteDispatch": {
      "enabled": false,
      "source": "generated-route-table",
      "modes": []
    },
    "compression": {
      "staticPrecompressed": true,
      "dynamicText": true,
      "encodings": ["br", "gzip"]
    },
    "resourceHints": {
      "htmlLinks": true,
      "earlyHints103": false
    },
    "bfcacheAwareHeaders": true
  },
  "unsupported": []
}
```

Detailed manifest fields and capability semantics are defined in [Adapter Contract](adapter-contract.md). Capability values must describe verified behavior, not desired behavior.

## Contract Vocabulary

Adapter docs are checked automatically so internal docs, public docs, and agent rules keep the same contract language. Keep these terms aligned when adapter behavior changes:

- `@lumina/adapter-bun`, `@lumina/adapter-node`, and `@lumina/adapter-static`.
- `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, `dist/adapter.manifest.json`, `runtime.name`, `capabilities`, and `nativeRouteDispatch`.
- `Bun.serve` and optional `Bun.serve({ routes })` lowering for proven faster paths.
- health endpoint behavior and static export rules.
- `ADAPTER_` diagnostics.
- compression, 103 Early Hints, `resourceHints`, and bfcache-aware delivery.

## Benchmark Requirements

Benchmark identical apps across:

- Bun adapter.
- Node adapter.
- Static adapter where applicable.
- Next.js Node path for comparable API and rendering paths.

Measure:

- Cold start.
- Requests per second.
- Memory.
- Bundle size.
- Static serving latency.
- SSR latency.
- Hot API latency.

## Documentation Promise

Use this public message:

> Bun is the default adapter path for speed-sensitive deployments, with Node and static adapter paths designed early enough to avoid Bun lock-in.

Performance claims must be backed by reproducible benchmarks.

## Failure Modes

- User app imports Bun-only APIs directly.
- Adapter-specific code leaks into `@lumina/core`.
- Node adapter lags far enough to become theoretical.
- Benchmarks only cover unrealistic toy routes.
- Adapter manifests do not clearly document unsupported features.
