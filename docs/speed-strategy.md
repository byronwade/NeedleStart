# Speed Strategy

Status: Planned.

Audience: framework contributors, maintainers, performance reviewers, AI agents.

NeedleStart should be fast as a whole system, not only fast on one benchmark. Speed must be designed into the compiler, runtime, route model, app graph, agent workflows, generated artifacts, and documentation.

The goal is not to make vague speed claims. The goal is to make fast paths the default, make slow paths visible, and require evidence before publishing performance claims.

## Speed Principles

1. Static first: public pages should compile to static HTML whenever safe.
2. Build-time intelligence: route discovery, render-mode classification, SEO extraction, API codegen, graph generation, and agent context should happen before runtime when possible.
3. Small runtime: production adapters consume generated artifacts and should not rediscover source structure.
4. Explicit render modes: every route should explain whether it is static, prerendered, SSR, streaming, client-only, API, or hot API.
5. Hot APIs for hot paths: performance-critical API routes can opt into generated validation and serialization.
6. Inspectable caching: cache plans must be explicit, manifest-backed, and visible to agents.
7. Fast agent workflows: agents should use compact JSON, Needle Map, affected checks, and context capsules instead of reading the whole repo.
8. Large-app readiness: incremental work must be designed for thousands of routes, not toy apps only.
9. Benchmark honesty: public claims require raw data, methodology, fixture source, and comparable behavior.

## Speed Surfaces

| Surface | Speed goal | Primary docs | Evidence required |
| --- | --- | --- | --- |
| Dev startup | Start quickly after config and route discovery. | `docs/roadmap.md`, `docs/compiler-ir.md` | Dev fixture timing after scaffold exists |
| HMR and route updates | Recompute changed route slices, not the whole app. | `docs/compiler-ir.md`, `docs/needle-map.md` | Incremental route fixture |
| Static pages | Serve prebuilt HTML with minimal runtime work. | `docs/runtime-contract.md`, `docs/seo-engine.md` | Static output and HTTP tests |
| SSR routes | Keep request routing small and manifest-driven. | `docs/runtime-contract.md`, `docs/adapters.md` | Adapter HTTP latency fixture |
| Hot APIs | Avoid generic framework overhead for selected APIs. | `docs/hot-api-path.md`, `docs/schema.md` | Normal vs hot API benchmark |
| App graph | Query affected files and routes quickly. | `docs/needle-map.md`, `docs/risk-mitigation.md` | Large graph fixture and query timing |
| Agent context | Return compact context without repository-wide reads. | `docs/agent-kernel.md`, `docs/machine-readable-docs.md` | Stable JSON size and response timing |
| Client payload | Keep public page JS and CSS budgets visible. | `docs/performance.md` | Route budget report |
| Builds | Avoid unnecessary rebuilds with content/config hashing. | `docs/compiler-ir.md` | Build cache fixture |

## Compiler Speed Rules

- Use structured parsing and stable caches.
- Cache by source content hash, config hash, compiler version, and graph schema version.
- Normalize paths once and reuse normalized IDs.
- Sort output deterministically without expensive repeated work.
- Do not run deep TypeScript semantic analysis as a default build blocker.
- Prefer layered graph extraction: file graph, explicit contracts, convention inference, optional static analysis.
- Emit compact manifests that runtime adapters can load directly.

## Runtime Speed Rules

- Adapters must consume generated manifests and handlers.
- Runtime must not discover routes from source files.
- Runtime must not build Needle Map.
- Runtime must not load agent context in production bundles.
- Static asset and prerendered HTML lookup should happen before SSR work.
- SSR should default to no-store unless route config explicitly opts into caching.
- Hot API handlers should have generated validators and serializers when configured.

## Client Speed Rules

- Public pages should have stricter JS and CSS budgets.
- Client-only rendering should be intentional and visible in manifests.
- Hydration bloat should warn in performance reports.
- Route-level reports should show JS, CSS, render mode, SEO status, and budget status.
- Examples must not normalize unnecessary client-side JavaScript.

## Agent Workflow Speed Rules

- Agents should start from `AGENTS.md`, docs indexes, route context, and Needle Map outputs.
- Agent-facing JSON should be compact and schema-versioned where possible.
- `needle map affected` and `needle agent context` should avoid requiring repository-wide reads.
- Affected checks should run only relevant checks when the graph can identify them safely.
- Safe edits should run affected checks, not unrelated full-suite checks by default.

## Large-App Speed Targets

These are planned targets, not current claims:

- Route discovery should stay deterministic on thousands of routes.
- Incremental graph updates should target sub-200ms updates for typical changed-file paths.
- Agent context responses should stay compact enough for LLM context windows.
- Large app fixtures should include thousands of routes and enough components/tests to expose graph scaling problems.

Do not publish these as achieved until fixtures and raw benchmark results prove them.

## Benchmark Evidence Rules

Every speed claim must link to:

- `docs/benchmark-methodology.md`.
- Fixture source.
- Raw results.
- Commit SHA.
- Runtime versions.
- Hardware or environment.
- Number of runs and variance.

Claims must distinguish:

- Bun adapter speed.
- Node adapter compatibility.
- Static export performance.
- Hot API path performance.
- Generic SSR and API route performance.
- Build-time and dev-time performance.

## Speed Gates For New Features

Before scheduling or merging a feature, answer:

1. Does it preserve static-first rendering where possible?
2. Does it move work to build time when safe?
3. Does it keep production runtime packages small?
4. Does it add runtime cost to every request or only to configured routes?
5. Does it affect generated manifest size?
6. Does it affect agent-facing JSON size?
7. Does it need a budget, benchmark, or fixture?
8. Does it create invisible caching or hidden invalidation?

If the answer is unclear, add a risk note to the task before implementation.

## Out Of Scope

- Claiming NeedleStart is faster than another framework before benchmarks exist.
- Building a custom bundler before the Vite/Rolldown path is proven.
- Adding broad runtime magic to compensate for missing compiler output.
- Making hot API behavior the default for every route before generic correctness exists.

