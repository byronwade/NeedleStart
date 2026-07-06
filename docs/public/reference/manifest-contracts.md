# Manifest Contracts

Status: Planned.

Audience: framework contributors, adapter authors, AI agents.

NeedleStart planned manifests are the contracts between compiler, runtime adapters, CLI, Needle Map, Agent Kernel, MCP, devtools, and tests.

Planned generated files include:

- `.needle/routes.json`
- `.needle/render-manifest.json`
- `.needle/map.json`
- `.needle/graph.json`
- `.needle/seo.report.json`
- `.needle/perf.report.json`
- `.needle/context/*.ctx.json`
- `.needle/context/agent-index.json`
- `.needle/mutations.json`
- `.needle/generated/*`
- `dist/routes.manifest.json`
- `dist/render.manifest.json`
- `dist/seo.report.json`
- `dist/adapter.manifest.json`
- `dist/*`

The canonical compiler and agent contracts stay under `.needle/`. The named `dist/*` manifest and report files are deployment-oriented copies for runtime adapters, and `dist/*` is the planned production build output surface.

## Contract Rules

Generated JSON must use schema versions, normalized paths, stable ordering, and compact agent-friendly fields. Public artifacts must avoid absolute local paths and should document source inputs when practical.

Generated files must be deterministic and must not be edited manually.

Manifest fields should stay aligned with the routing, API route, schema, cache, SEO, performance, and diagnostics contracts that define their source behavior.

## Source

- [Manifest Contracts](../../manifest-contracts.md)
- [Routing Contract](../../routing-contract.md)
- [API Route Contract](../../api-route-contract.md)
- [Schema Contract](../../schema-contract.md)
- [Cache Contract](../../cache-contract.md)
- [SEO Contract](../../seo-contract.md)
- [Performance Contract](../../performance-contract.md)
- [Diagnostics Contract](../../diagnostics-contract.md)
- [Machine-Readable Documentation](../../machine-readable-docs.md)

