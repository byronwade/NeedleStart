# Adapters

Status: Implemented.

Audience: deployers, app developers, adapter maintainers, AI agents.

Lumina adapters turn generated build output into deployable Bun, Node, or static output. Static built-output serving through `@lumina/adapter-bun` is implemented for build-time static page routes. Node adapter behavior, static export adapter behavior, SSR, API, hot API, streaming, compression, 103 Early Hints, and adapter-native route dispatch remain planned.

## Initial Adapters

| Adapter | Package | Status |
| --- | --- | --- |
| Bun | `@lumina/adapter-bun` | Implemented for static built HTML serving; broader runtime behavior planned. |
| Node | `@lumina/adapter-node` | Planned compatibility adapter path. |
| Static | `@lumina/adapter-static` | Planned static export path. |

## Generated Output

```txt
dist/
  public/
  server/
  adapter.manifest.json
  routes.manifest.json
  render.manifest.json
  seo.report.json
```

`dist/public/`, `dist/routes.manifest.json`, `dist/render.manifest.json`, and `dist/adapter.manifest.json` are implemented for the static build path. `dist/server/` and `dist/seo.report.json` remain planned. These files are deployment output. Canonical compiler and agent artifacts stay under `.lumina/`.

The named deployment artifacts are `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, and `dist/adapter.manifest.json`.

## Manifest

`dist/adapter.manifest.json` describes the current adapter output. It must not claim planned capabilities as implemented. The manifest should describe:

- adapter package,
- runtime through `runtime.name`,
- entry file,
- public directory,
- capabilities, including compression, route-known resource hints, 103 Early Hints support, and bfcache-aware headers,
- whether adapter-native route dispatch is enabled from generated route-table evidence,
- unsupported features,
- environment variable names,
- diagnostics.

## Rules

- User app code should not require Bun-only APIs.
- Adapter capability claims require tests.
- Generated route tables remain canonical even when a runtime adapter uses native route dispatch for speed.
- Compression, final `Link` headers, and 103 Early Hints must be backed by generated route asset metadata.
- Static export should fail clearly for non-static routes.
- Deployment pages must name unsupported features.
- Secrets must not appear in generated adapter manifests.

## Contract Vocabulary

Public adapter docs are checked against the same planned contract terms as internal docs:

- `@lumina/adapter-bun`, `@lumina/adapter-node`, and `@lumina/adapter-static`.
- `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, `dist/adapter.manifest.json`, `runtime.name`, `capabilities`, and `nativeRouteDispatch`.
- `Bun.serve` and `Bun.serve({ routes })` when the Bun adapter proves native route dispatch is faster.
- health endpoint behavior and static export rules.
- `ADAPTER_` diagnostics.
- compression, 103 Early Hints, `resourceHints`, and bfcache-aware delivery.

## Source

- [Adapter Contract](../../adapter-contract.md)
- [Adapter Architecture](../../adapters.md)
- [Deployment](../../deployment.md)
- [Compatibility](../../compatibility.md)
