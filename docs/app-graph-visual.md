# App Graph Visual Map

This document gives a visual representation of the app graph NeedleStart is building.

NeedleStart's product promise is:

```txt
Your app ships with a map.
```

That map is not just a diagram. It is a generated, queryable, explainable contract shared by the compiler, CLI, runtime adapters, SEO engine, cache system, schemas, Agent Kernel, MCP, tests, benchmarks, public docs, and future devtools.

The diagrams below use Mermaid so they render directly on GitHub.

## 1. App Graph as Product Spine

```mermaid
flowchart TB
  subgraph Source[Source App]
    Routes[Routes]
    Layouts[Layouts]
    Pages[Pages]
    Components[Components]
    APIs[API Routes]
    Schemas[Schemas]
    Metadata[Metadata]
    Styles[Styles]
    Tests[Tests]
    Content[Content]
    Config[needle.config.ts]
  end

  subgraph Compiler[Needle Compiler]
    Discovery[Route Discovery]
    RenderModes[Render Mode Extraction]
    CachePlans[Cache Plan Extraction]
    SeoExtract[SEO Metadata Extraction]
    SchemaExtract[Schema Extraction]
    GraphBuild[Needle Map Builder]
    Explain[Why Explanations]
    Codegen[Code Generation]
  end

  subgraph Manifests[Generated Contracts]
    RouteManifest[routes.manifest.json]
    RenderManifest[render.manifest.json]
    CacheManifest[cache.manifest.json]
    SeoReport[seo.report.json]
    MapManifest[map.manifest.json]
    AdapterManifest[adapter.manifest.json]
    PerfReport[perf.report.json]
    ContextCapsules[context capsules]
  end

  subgraph Consumers[Consumers]
    CLI[CLI]
    Runtime[Runtime Adapters]
    MCP[MCP Server]
    Agent[Agent Kernel]
    Devtools[Devtools]
    Tests2[Tests and Affected Checks]
    Benchmarks[Benchmarks]
    PublicDocs[Public Docs Website]
  end

  Source --> Compiler
  Discovery --> RouteManifest
  RenderModes --> RenderManifest
  CachePlans --> CacheManifest
  SeoExtract --> SeoReport
  SchemaExtract --> GraphBuild
  GraphBuild --> MapManifest
  Explain --> RouteManifest
  Explain --> RenderManifest
  Explain --> CacheManifest
  Explain --> SeoReport
  Codegen --> AdapterManifest
  Codegen --> ContextCapsules
  Manifests --> Consumers
```

## 2. Core Graph Node Families

```mermaid
flowchart LR
  Route[route]
  Layout[layout]
  Page[page]
  Component[component]
  API[api]
  Schema[schema]
  CacheTag[cacheTag]
  Metadata[metadata]
  Sitemap[sitemap]
  Test[test]
  Owner[owner]
  Package[package]
  Generated[generatedFile]
  Benchmark[benchmarkFixture]
  Doc[docPage]
  Risk[risk / dangerZone]

  Route -->|usesLayout| Layout
  Route -->|renders| Page
  Page -->|renders| Component
  Component -->|usesProps| Schema
  API -->|validatesWithSchema| Schema
  API -->|serializesWithSchema| Schema
  Route -->|definesMetadata| Metadata
  Metadata -->|affectsSeo| Sitemap
  Route -->|usesCacheTag| CacheTag
  API -->|usesCacheTag| CacheTag
  Component -->|coveredByTest| Test
  Route -->|coveredByTest| Test
  Package -->|ownedBy| Owner
  Route -->|ownedBy| Owner
  Route -->|generatesFile| Generated
  API -->|generatesFile| Generated
  Benchmark -->|benchmarkedBy| Route
  Risk -->|dangerZone| API
  Risk -->|dangerZone| Component
  Doc -->|documentedBy| Route
```

## 3. Route-Level Map Example

This is the shape a developer or agent should be able to inspect for one route.

```mermaid
flowchart TB
  Route[/route: /pricing/]
  File[app/pricing/page.tsx]
  Layout[app/layout.tsx]
  Hero[components/PricingHero.tsx]
  Table[components/PricingTable.tsx]
  FAQ[components/FAQ.tsx]
  Meta[meta: Pricing | Acme]
  Cache[cache: static]
  Render[render: staticPage]
  SEO[seo: pass]
  Test1[pricing.test.tsx]
  Test2[seo-pricing.test.ts]
  Owner[owner: growth-team]
  GeneratedHTML[dist/public/pricing/index.html]
  Ctx[.needle/context/pricing.ctx.json]

  Route -->|source| File
  Route -->|usesLayout| Layout
  File -->|renders| Hero
  File -->|renders| Table
  File -->|renders| FAQ
  Route -->|definesMetadata| Meta
  Route -->|hasCachePlan| Cache
  Route -->|hasRenderMode| Render
  Meta -->|affectsSeo| SEO
  Route -->|coveredByTest| Test1
  SEO -->|coveredByTest| Test2
  Route -->|ownedBy| Owner
  Route -->|generatesFile| GeneratedHTML
  Route -->|generatesContext| Ctx
```

Expected `needle inspect why route /pricing` explanation:

```txt
/pricing is static because the route declares staticPage(), metadata is statically analyzable, and no request-time APIs were detected.
/pricing is indexable because it has title, description, canonical URL, meaningful initial HTML, and sitemap inclusion.
/pricing is low-risk for metadata edits because meta fields are declared safe-editable and affected checks are available.
```

## 4. Edge Confidence Model

Needle Map should be honest about how it knows something.

```mermaid
flowchart LR
  Import[Import Edge]
  Contract[Contract Edge]
  Convention[Convention Edge]
  StaticAnalysis[Static Analysis Edge]
  Manual[Manual Edge]

  Import -->|source: import| Medium[Medium confidence]
  Contract -->|source: contract| High[High confidence]
  Convention -->|source: convention| LowMedium[Low to medium confidence]
  StaticAnalysis -->|source: typescript| Variable[Variable confidence]
  Manual -->|source: manual| HighReview[High if reviewed]

  LowMedium --> NeedsWhy[Must include why]
  Variable --> NeedsWhy
  Medium --> NeedsWhy
  High --> NeedsWhy
  HighReview --> NeedsWhy
```

Every edge must include:

```ts
{
  kind: EdgeKind
  source: "compiler" | "import" | "typescript" | "contract" | "convention" | "manual"
  confidence: number
  why: string
}
```

## 5. Affected Change Flow

This is the developer and AI-agent value loop.

```mermaid
sequenceDiagram
  participant Dev as Developer or Agent
  participant CLI as Needle CLI
  participant Map as Needle Map
  participant Checks as Affected Checks
  participant Reports as Stable JSON Reports

  Dev->>CLI: needle map affected components/PricingTable.tsx --json
  CLI->>Map: query affected graph
  Map-->>CLI: affected routes, tests, SEO, cache, owners
  CLI-->>Dev: compact impact report
  Dev->>CLI: needle check --affected --json
  CLI->>Checks: run typecheck, route tests, SEO, cache checks
  Checks-->>Reports: diagnostics with codes and evidence
  Reports-->>Dev: pass/warn/fail + next actions
```

## 6. Safe Edit Transaction Flow

```mermaid
flowchart TB
  Request[Agent or CLI requests edit]
  Target[Validate target exists]
  Field[Validate field is editable]
  Risk[Assign risk tier]
  DryRun[Produce dry-run diff]
  AST[Apply AST patch in memory]
  Graph[Regenerate affected graph slice]
  Checks[Run affected checks]
  Decision{Checks pass and risk allowed?}
  Write[Write files]
  Log[Append mutation log]
  Verify[Post-apply verification]
  Undo[Rollback available]
  Reject[Reject or request human approval]

  Request --> Target
  Target --> Field
  Field --> Risk
  Risk --> DryRun
  DryRun --> AST
  AST --> Graph
  Graph --> Checks
  Checks --> Decision
  Decision -->|yes| Write
  Write --> Log
  Log --> Verify
  Verify --> Undo
  Decision -->|no| Reject
```

Safe edits are not broad agent writes. They are transactions.

## 7. How MCP Uses the Map

```mermaid
flowchart LR
  MCP[MCP Server]
  Map[Needle Map Query Engine]
  SEO[SEO Report]
  Cache[Cache Manifest]
  Perf[Performance Report]
  Context[Context Capsules]
  SafeEdit[Safe Edit Engine]

  MCP -->|list_routes| Map
  MCP -->|get_route_context| Context
  MCP -->|get_related_files| Map
  MCP -->|get_impact_map| Map
  MCP -->|get_seo_report| SEO
  MCP -->|get_cache_report| Cache
  MCP -->|get_perf_report| Perf
  MCP -->|future write tools| SafeEdit
  SafeEdit --> Map
```

Initial MCP tools should be read-only. Write tools must route through safe edit transactions.

## 8. Map Layers Over Time

```mermaid
flowchart TB
  L0[Layer 0: File and Import Graph]
  L1[Layer 1: Explicit Contracts]
  L2[Layer 2: Convention Inference]
  L3[Layer 3: Targeted Static Analysis]

  L0 --> L1
  L1 --> L2
  L2 --> L3

  L0a[Routes, files, imports, tests]
  L1a[Component contracts, route contracts, ownership]
  L2a[Metadata exports, render declarations, schema exports]
  L3a[Prop/data consumption when useful]

  L0 --> L0a
  L1 --> L1a
  L2 --> L2a
  L3 --> L3a
```

Rules:

- Layer 0 must be deterministic and fast.
- Layer 1 is highest-confidence semantic truth.
- Layer 2 must explain conventions.
- Layer 3 must not block normal builds by default.
- Missing contracts produce low-confidence edges, not confident guesses.

## 9. Future Devtools View

This is the eventual visual UI shape. The CLI and manifests should work first.

```mermaid
flowchart LR
  Sidebar[Route / File / Component Picker]
  Canvas[Graph Canvas]
  Inspector[Node Inspector]
  Why[Why Panel]
  Checks[Checks Panel]
  SafeEdits[Safe Edits Panel]

  Sidebar --> Canvas
  Canvas --> Inspector
  Inspector --> Why
  Inspector --> Checks
  Inspector --> SafeEdits

  Why -->|render/cache/seo/graph explanations| Inspector
  Checks -->|affected checks| Inspector
  SafeEdits -->|dry run transaction| Inspector
```

The visual devtools should not outrun the query engine. Pretty maps are useful only after the graph is reliable.

## 10. First Prototype Visual Target

The first prototype should be able to show this graph for a small app:

```mermaid
flowchart TB
  Home[/route: //]
  Pricing[/route: /pricing/]
  API[/api: /api/health/]
  RootLayout[app/layout.tsx]
  HomePage[app/page.tsx]
  PricingPage[app/pricing/page.tsx]
  Hero[components/Hero.tsx]
  PricingHero[components/PricingHero.tsx]
  MetaHome[meta: Home]
  MetaPricing[meta: Pricing]
  SEOReport[seo.report.json]
  RoutesManifest[routes.manifest.json]
  RenderManifest[render.manifest.json]
  MapManifest[map.manifest.json]
  AgentCtx[route context capsules]

  Home --> RootLayout
  Pricing --> RootLayout
  Home --> HomePage
  Pricing --> PricingPage
  HomePage --> Hero
  PricingPage --> PricingHero
  Home --> MetaHome
  Pricing --> MetaPricing
  Home --> SEOReport
  Pricing --> SEOReport
  Home --> RoutesManifest
  Pricing --> RoutesManifest
  API --> RoutesManifest
  Home --> RenderManifest
  Pricing --> RenderManifest
  Home --> MapManifest
  Pricing --> MapManifest
  Pricing --> AgentCtx
```

The visual should make the product instantly legible:

```txt
Routes connect to files.
Files render components.
Components connect to schemas, tests, SEO, cache, and owners.
The compiler emits manifests.
Agents and humans query the same app graph.
```
