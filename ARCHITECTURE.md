# Architecture

NeedleStart is built around one product-level premise:

```txt
Your app ships with a map.
```

The architecture exists to make large React applications explain themselves to humans, AI agents, CLI tools, runtime adapters, docs, benchmarks, and tests.

NeedleStart is built around a simple split:

- Bun is the speed default for local workflow and the first production adapter path.
- Vite/Rolldown handles frontend build mechanics.
- The Needle compiler handles framework intelligence, explanations, and app graph generation.
- Runtime adapters handle production request routing and static output from generated artifacts.
- The Agent Kernel and Needle Map expose structure to humans and agents.

## Strategic Technology Decision

Recommended stack:

- Bun: package manager, test runner, local workflow, and default production adapter runtime.
- Vite and Rolldown: frontend build, React transforms, HMR, assets, and plugin ecosystem.
- Custom Needle compiler: route graph, render modes, SEO generation, cache plans, Needle Map, codegen, explanations, and manifests.
- Adapter packages: thin runtime or output layers around generated server artifacts.

This split lets NeedleStart move quickly without reinventing a bundler while putting framework intelligence where it belongs: at build time.

## Architecture Goals

- Make the app graph a first-class framework contract.
- Keep runtime adapters small and predictable.
- Make render, cache, SEO, adapter, route, and graph decisions explainable.
- Emit stable JSON for humans, agents, MCP, devtools, benchmarks, and CI.
- Keep public HTML and SEO behavior visible.
- Keep safe edits constrained, previewable, check-backed, logged, and reversible.
- Avoid hidden cache behavior.
- Avoid framework magic that cannot be inspected.

## System Layers

### Layer 1: Developer Framework

Responsible for file-based routes, layouts, React rendering, metadata, API routes, CLI commands, developer-facing config, and familiar app ergonomics.

### Layer 2: Compiler

Responsible for app discovery, route graph, render modes, server/client boundaries, SEO manifests, cache plans, API code generation, hot API handlers, Needle Map generation, agent context generation, explanations, and deployment manifests.

The compiler should answer not only what happened, but why.

### Layer 3: Runtime and Adapters

Responsible for static file serving, prerendered HTML serving, SSR requests, streaming SSR requests, API handlers, hot API handlers, cache headers, redirects, 404 and 500 responses, health endpoint, request logging, and static export behavior.

Initial adapters:

- `@needle/adapter-bun`
- `@needle/adapter-node`
- `@needle/adapter-static`

### Layer 4: Agent Kernel

Responsible for AGENTS.md generation, llms.txt and llms-full.txt generation, route context capsules, safe edit plans, safe edit transactions, mutation logs, agent-facing diagnostics, and MCP server integration.

### Layer 5: Needle Map

Responsible for file graph, semantic graph, route impact, affected checks, ownership, cache tag visibility, SEO impact, risk scoring, generated-file visibility, and human or agent queries.

Needle Map is not a decorative graph. It is the product spine.

## Technology Decisions

### Runtime and Adapters

Bun is the default runtime path because it provides a high-performance HTTP server, package manager, test runner, and native TypeScript-friendly workflow. Bun-specific production request handling belongs in `@needle/adapter-bun`.

Node and static adapters move early so Bun remains the speed default without becoming an adoption trap. User application code must not require Bun-only APIs.

### Frontend Build

Vite/Rolldown is the initial frontend build foundation. It provides HMR, React transforms, CSS handling, asset handling, and plugin compatibility. NeedleStart should not begin with a custom bundler.

### Compiler

The custom Needle compiler owns framework-specific intelligence that Vite does not understand:

- Route modes.
- Route explanations.
- SEO metadata.
- Public HTML diagnostics.
- Agent context.
- Semantic app graph.
- Cache plans.
- Cache explanations.
- API validators and serializers.
- Deployment manifests.
- Benchmark and docs metadata outputs later.

### Adapter-Aware Server Output

The production server entry should be generated and small. It should load the build manifest, route requests, serve static assets, call SSR handlers, call API handlers, and expose predictable error behavior.

The compiler chooses the adapter import during build.

```ts
// .needle/generated/server-entry.ts
import { createServer } from "@needle/adapter-bun"
```

Adapters consume generated artifacts. They do not rediscover app source structure.

## Request Flow

Bun adapter request flow:

```txt
Bun.serve
  -> generated route matcher
  -> static asset handler
  -> prerendered HTML handler
  -> hot API handler
  -> normal API handler
  -> SSR renderer
  -> not found handler
  -> error handler
```

Node adapter should use the same generated route matcher and handler contracts with Node-compatible request handling.

Static adapter should export compatible static routes and fail clearly for unsupported runtime routes.

## Build Flow

```txt
source app
  -> config load
  -> route discovery
  -> layout discovery
  -> render mode extraction
  -> metadata extraction
  -> schema extraction
  -> cache plan extraction
  -> route explanations
  -> render explanations
  -> cache explanations
  -> route manifest
  -> render manifest
  -> SEO report
  -> cache manifest
  -> Needle Map
  -> agent context capsules
  -> Vite build
  -> generated server modules
  -> adapter output
```

## Core Internal Model

```ts
export type NeedleApp = {
  root: string
  config: NeedleConfig
  routes: RouteNode[]
  layouts: LayoutNode[]
  components: ComponentNode[]
  apis: ApiNode[]
  serverFns: ServerFunctionNode[]
  schemas: SchemaNode[]
  content: ContentNode[]
  graph: NeedleGraph
}
```

## Monorepo Structure

Target structure:

```txt
needlestart/
  packages/
    create-needle/
    cli/
    core/
    compiler/
    vite-plugin/
    react/
    router/
    seo/
    map/
    agent/
    mcp/
    cache/
    schema/
    devtools/
    adapter-bun/
    adapter-node/
    adapter-static/
  examples/
  tests/
  docs/
```

See `docs/roadmap.md` for the build order and `docs/package-map.md` for package boundaries.

```ts
export type RouteNode = {
  id: string
  path: string
  file: string
  kind: "page" | "api"
  params: Param[]
  layouts: string[]
  renderMode: RenderMode
  meta?: MetaDefinition
  owner?: Owner
  cache?: CachePlan
  why?: Explanation[]
}
```

```ts
export type GraphEdge = {
  id: string
  from: string
  to: string
  kind: EdgeKind
  source: "compiler" | "import" | "typescript" | "contract" | "convention" | "manual"
  confidence: number
  why: string
  fields?: string[]
  risk?: "low" | "medium" | "high"
}
```

## Route Modes

Planned route modes:

- `staticPage()`: compile to static HTML.
- `prerender()`: build static HTML with revalidation metadata.
- `ssr()`: render on request.
- `stream()`: render with React streaming.
- `clientOnly()`: intentionally skip server-rendered content.
- `apiHot()`: generate specialized API handler path.

Every route mode should be inspectable through manifests and `needle inspect why` once implemented.

## Runtime Rule

If a behavior can be computed at build time, it should not be recomputed on every request.

## Explanation Rule

If the framework makes a decision about render mode, cache behavior, SEO status, adapter output, route matching, or graph edges, it should expose a compact explanation when practical.

This is part of the product, not debug garnish.

## Production Rule

Production server bundles must not include agent context capsules, MCP server implementation unless explicitly running in dev mode, mutation logs, devtools UI, llms-full.txt, or test fixtures.

## Caching Rule

No invisible caching.

Every cacheable route, function, component, or API response must expose its cache plan in a manifest. Cache tags must be queryable by Needle Map and agent diagnostics.

## Strategy Rule

Do not chase framework parity feature by feature.

Prioritize features that make the app graph more useful, make framework behavior more explainable, make public output safer, or make agent workflows more trustworthy.

## Contract Docs

Detailed contracts live in:

- `docs/product-strategy.md`
- `docs/cli.md`
- `docs/config.md`
- `docs/routing.md`
- `docs/manifest-contracts.md`
- `docs/runtime-contract.md`
- `docs/adapters.md`
- `docs/deployment.md`
- `docs/security.md`
- `docs/testing.md`
