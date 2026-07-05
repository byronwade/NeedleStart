# Package Map

This document defines planned package responsibilities and boundaries.

## Root Packages

| Package | Responsibility |
| --- | --- |
| `create-needle` | One-command project creation. |
| `@needle/cli` | CLI commands such as `dev`, `build`, `start`, `routes`, `inspect`, `seo`, `map`, `agent`, `mcp`, `edit`, `migrate`, `bench`, and `check`. |
| `@needle/core` | Shared types, config, route definitions, render modes, diagnostics, manifest schemas, adapter capability types, and public helper types. |
| `@needle/compiler` | App discovery, route IR, render mode extraction, manifests, generated modules, API codegen, graph inputs. |
| `@needle/vite-plugin` | Vite integration, virtual modules, route HMR, client and server entry wiring. |
| `@needle/react` | React SSR helpers, layouts, head manager, loaders, hydration, client entry helpers. |
| `@needle/router` | Generated route matcher, typed links, params, route helpers. |
| `@needle/seo` | Metadata, sitemap, robots, OG images, structured data helpers, SEO audits. |
| `@needle/map` | Semantic graph builder, file graph, query engine, affected checks. |
| `@needle/agent` | AGENTS.md generation, context capsules, task skeletons, safe edit orchestration. |
| `@needle/mcp` | MCP server tools and resources. |
| `@needle/cache` | Cache tags, route cache, response cache, invalidation primitives. |
| `@needle/schema` | Schema DSL, validators, serializers, OpenAPI generation. |
| `@needle/devtools` | Local-only dashboard for routes, map, SEO, performance, cache, and agent context. |
| `@needle/adapter-bun` | Default Bun adapter using `Bun.serve` and generated route matcher. |
| `@needle/adapter-node` | Node compatibility adapter using Node HTTP or a lightweight server with shims. |
| `@needle/adapter-static` | Static export adapter for fully static routes. |
| `@needle/adapters/*` | Later deployment targets such as Docker, Cloudflare, Vercel, and other cloud adapters. |

## Boundary Rules

- Shared public types belong in `@needle/core`.
- Compiler-only parsing and generation belongs in `@needle/compiler`.
- Runtime request handling belongs in adapter packages.
- Browser-facing React helpers belong in `@needle/react`.
- Agent context and safe edit code belongs in `@needle/agent`.
- MCP protocol code belongs in `@needle/mcp`.
- SEO metadata helpers and audits belong in `@needle/seo`.
- Graph storage and graph queries belong in `@needle/map`.
- Schema validation and serialization belongs in `@needle/schema`.
- Cache primitives and cache plan helpers belong in `@needle/cache`.

## Server Runtime Naming Decision

Earlier planning used `@needle/server-bun` for the production Bun server runtime. The current package direction is to use `@needle/adapter-bun` as the Bun runtime and deployment boundary.

Do not create both `@needle/server-bun` and `@needle/adapter-bun` unless a future ADR defines a shared server core package with a clear reason. For now:

- Bun-specific runtime code belongs in `@needle/adapter-bun`.
- Node compatibility code belongs in `@needle/adapter-node`.
- Static export code belongs in `@needle/adapter-static`.
- Shared adapter types belong in `@needle/core`.

## Import Rules

Planned direction:

- `@needle/cli` may depend on most internal packages.
- `@needle/compiler` may depend on `@needle/core`, `@needle/schema`, `@needle/seo`, `@needle/cache`, and `@needle/map` types.
- `@needle/adapter-bun` should depend on generated output, `@needle/core`, `@needle/router`, and minimal runtime helpers.
- `@needle/adapter-node` should depend on the same generated contracts as the Bun adapter.
- `@needle/adapter-static` should depend on generated manifests and static output contracts.
- `@needle/react` should not depend on compiler internals.
- `@needle/mcp` should use stable APIs from `@needle/map`, `@needle/seo`, `@needle/agent`, `@needle/cache`, and `@needle/core`.
- Production runtime packages must not depend on agent-only code.
- Devtools may depend on richer development-only packages, but must not be pulled into production runtime bundles.

## Adapter Rules

- Bun-specific APIs belong in `@needle/adapter-bun`.
- Node compatibility code belongs in `@needle/adapter-node`.
- Static export logic belongs in `@needle/adapter-static`.
- User application code must not require Bun-only APIs.
- Adapter capability output belongs in `adapter.manifest.json`.
- Adapter behavior must stay aligned with `docs/adapters.md` and `docs/deployment.md`.

## `@needle/map` Query API

The map package should expose one query engine for CLI, MCP, devtools, and Agent Kernel.

Planned API:

```ts
getAffected(node)
explainEdge(edgeId)
query("route:/pricing affectedBy component:ProductCard")
```

Do not duplicate graph query logic in MCP or CLI packages. Those packages should call `@needle/map`.

## `@needle/core` Contract Ownership

`@needle/core` should own shared, stable types:

- `NeedleConfig`
- `NeedleApp`
- `RouteNode`
- `RenderMode`
- `GraphNode`
- `GraphEdge`
- `NeedleDiagnostic`
- `SafeFix`
- manifest base types
- adapter capability types
- cache plan types

No package should define a competing local shape for these contracts.

## Package README Rule

Every package should eventually include a local `README.md` with:

- Responsibility.
- Public API.
- Internal dependencies.
- Generated files.
- Tests.
- Out of scope.
