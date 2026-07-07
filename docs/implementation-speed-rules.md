# Implementation Speed Rules

Status: Planned.

Audience: framework contributors, runtime authors, compiler authors, performance reviewers, AI agents.

This page turns the speed strategy into implementation rules agents can enforce while code is being built. It is not benchmark evidence and must not be used as a public performance claim.

Read this page before implementing route discovery, generated manifests, runtime adapters, hot API paths, Lumina Map queries, Agent Kernel output, or benchmark fixtures.

## Purpose

Lumina should prove speed early without making speed claims early. The first implementation slices must create the evidence path before feature work grows:

- fixture apps with stable names,
- tiny benchmark harness files,
- schema-versioned generated artifacts,
- dependency pins for measured work,
- request-path tests that prove runtime adapters do not rediscover source code,
- measured or `not implemented` status for every first speed surface.

## Speed Categories

Speed work must identify which category it affects:

| Category | Surfaces |
| --- | --- |
| Developer speed | route discovery, generated manifest size, dev server startup, rebuild or HMR work, fixture setup time |
| User speed | static request path, SSR request path, browser payload, route chunks, CSS, images, fonts, API latency, hot API latency |
| Agent speed | graph query latency, affected-check selection, agent context bytes, route capsule size, CLI JSON size |

Do not collapse these into one number. Each category needs its own evidence or `not implemented` status.

## Early Speed Proof

The planned early benchmark skeleton now exists and must stay in place before route discovery expands beyond the first implementation slice:

```txt
fixtures/apps/tiny-static/
fixtures/apps/medium-100-routes/
fixtures/apps/large-1000-routes/
benchmarks/route-discovery.bench.ts
benchmarks/manifest-size.bench.ts
benchmarks/graph-query.bench.ts
benchmarks/adapter-dispatch.bench.ts
```

These files start as deterministic skeletons that report `not implemented`. They must not include synthetic winning numbers. The first measured implementation should record baseline numbers rather than retrofitting benchmarks after architecture decisions are already locked.

## Dependency Pin Rule

Measured implementation work must not rely on floating dependency ranges.

- The scaffold uses pinned placeholder dev dependencies.
- Before benchmarked implementation work lands, pin Bun, TypeScript, Vite/Rolldown, React, parser libraries, and compiler libraries used by that work.
- Record versions in raw benchmark metadata when benchmarks run.
- Refresh current primary sources before changing major toolchain versions.

## Generated Artifact Rule

Every generated JSON artifact must include:

```json
{
  "schemaVersion": "lumina.routes.v0",
  "generatedBy": {
    "package": "@lumina/compiler",
    "version": "0.0.0"
  }
}
```

Concrete schemas may include additional `source`, `generatedAt`, build, route, adapter, or environment fields. They must not include absolute local paths, secrets, random IDs, or machine-specific values in public artifacts.

## Request-Path Rule

Production runtime adapters must load generated manifests and generated handlers only.

Runtime adapter behavior now exists for static built-output serving through `@lumina/adapter-bun`. That path must stay covered by tests that fail if production request handling imports or reads:

- `@lumina/compiler`
- `@lumina/map`
- `@lumina/agent`
- `@lumina/mcp`
- source route files outside generated runtime entrypoints
- repository docs or agent metadata

The test should prove runtime routing does not build the Lumina Map, scan `app/`, or walk source files during a request. New SSR, API, hot API, Node, or static-export adapter behavior must extend this rule with focused request-path tests.

## Code-Level Rules

Generated runtime files must follow these rules:

- No barrel imports.
- No broad glob imports.
- No dynamic import paths unless generated from the route manifest.
- No source-file reads in production runtime.
- No JSON pretty printing in runtime or agent artifacts by default.
- No absolute local paths in generated public artifacts.
- No broad dependency imports in Vite plugin hot hooks.
- No default telemetry.
- No runtime schema walking on `apiHot()` routes.
- No request-time image transforms in the first implementation.

If a feature needs an exception, document the measured reason in the task and update [Speed Decisions](speed-decisions.md).

## Build Internally First

The early internal speed work should focus on:

- Lumina compiler route and render extraction.
- Generated route matcher.
- Hot API schema, validator, and serializer path.
- Compact manifest and graph query engine.
- Performance report generation.
- Cache-plan layer.
- Tiny benchmark harness.

Do not start with:

- custom bundler work,
- React Compiler as a default,
- blanket prefetch, speculation, resource hints, or 103 Early Hints,
- request-time image transformation infrastructure.

## First Speed Status Surfaces

The first CI-friendly status output should eventually list each surface as measured, failing, or not implemented:

- route discovery,
- generated manifest size,
- dev plugin startup,
- runtime imports,
- static route request,
- SSR route request,
- hot API route,
- graph affected query,
- agent context bytes,
- browser payload.

Until benchmarks exist, docs and CI output must say `not implemented` instead of implying success.

## Review Gate

For speed-sensitive implementation, reviewers and agents must confirm:

- The change names the speed category it affects.
- The change follows or updates [Speed Decisions](speed-decisions.md).
- New generated JSON includes `schemaVersion` and `generatedBy`.
- Request-path behavior remains manifest-driven.
- Any benchmark output has raw metadata and no public claim wording.
- README, AGENTS, roadmap, task backlog, benchmark fixtures, and performance docs still agree.

## Out Of Scope

- Public speed rankings.
- Synthetic benchmark results.
- Treating skeleton benchmark files as evidence.
- Marking speed surfaces verified before raw data exists.
