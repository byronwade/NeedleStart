# Benchmark Fixtures

Status: Planned.

Audience: maintainers, performance reviewers, compiler contributors, runtime adapter authors, AI agents.

This page defines the planned fixture set for proving Lumina speed claims. It complements [Benchmark Methodology](benchmark-methodology.md), [Performance Contract](performance-contract.md), [Speed Strategy](speed-strategy.md), [Speed Decisions](speed-decisions.md), and [Performance Evidence Checklist](checklists/performance-evidence.md).

The first benchmark skeleton paths and fixture placeholders exist. `route-discovery` can run locally against `fixtures/apps/tiny-static`, `manifest-size` can run locally against deterministic generated source from `fixtures/apps/medium-100-routes`, `graph-query` can run locally against deterministic generated source from `fixtures/apps/large-1000-routes`, and `adapter-dispatch` can run locally against built `fixtures/apps/tiny-static` output through `@lumina/adapter-bun`. These commands return raw metadata in the JSON response. This page is not public comparison evidence.

## Evidence Boundary

This document makes Lumina ready to collect speed evidence. It is not speed evidence.

Current limitations:

- Local route-discovery benchmark execution exists for `lumina bench route-discovery --json --run`.
- Local manifest-size benchmark execution exists for `lumina bench manifest-size --json --run`.
- Local graph-query benchmark execution exists for `lumina bench graph-query --json --run`.
- Local adapter-dispatch benchmark execution exists for `lumina bench adapter-dispatch --json --run`.
- `lumina bench --list --json` and `lumina bench <name> --json` are implemented, and they report skeleton status without running benchmarks.
- Route-discovery, manifest-size, graph-query, and adapter-dispatch raw metadata is returned in the command JSON response, but no reviewed raw result files exist yet.
- No public performance comparison can be made from this page.
- No market performance claim should cite this document as proof.

Before Lumina claims market performance, the repository needs implemented fixtures, equivalent-behavior definitions, raw results, runtime and dependency versions, hardware or environment metadata, run counts, variance, and review notes.

## Early Benchmark Skeleton

The first benchmark work should create stable paths before route discovery, graph queries, or adapter dispatch are implemented:

```txt
fixtures/apps/tiny-static/
fixtures/apps/medium-100-routes/
fixtures/apps/large-1000-routes/
benchmarks/route-discovery.bench.ts
benchmarks/manifest-size.bench.ts
benchmarks/graph-query.bench.ts
benchmarks/adapter-dispatch.bench.ts
```

These files report `not implemented` until the owning benchmark behavior exists. `benchmarks/route-discovery.bench.ts` now has a local run path for `fixtures/apps/tiny-static`, `benchmarks/manifest-size.bench.ts` now has a local run path for deterministic generated source from `fixtures/apps/medium-100-routes`, `benchmarks/graph-query.bench.ts` now has a local run path for deterministic generated source from `fixtures/apps/large-1000-routes`, and `benchmarks/adapter-dispatch.bench.ts` now has a local run path for built `fixtures/apps/tiny-static` output through `@lumina/adapter-bun`. They must not publish synthetic numbers.

The early skeleton should separate:

- developer speed: route discovery, manifest size, dev startup;
- user speed: static request path, SSR request path, browser payload, adapter dispatch;
- agent speed: graph query latency and agent context bytes.

## Fixture Rules

Every benchmark fixture must have:

- Stable name.
- Purpose.
- Source path.
- Status label.
- Required commands.
- Equivalent behavior definition.
- Raw result output path.
- Runtime versions.
- Dependency versions.
- Expected generated artifacts.
- Review owner or maintainer role.

Fixture output must be deterministic enough to compare across commits. When a fixture intentionally uses generated data, the generator must use a fixed seed.

## Planned Fixture Matrix

| Fixture | Purpose | Primary metrics | Initial status |
| --- | --- | --- | --- |
| `tiny-static` | Minimal app for route discovery, manifest shape, and static request-path smoke checks. | route discovery time, manifest bytes, static request status | Planned |
| `medium-100-routes` | Medium deterministic route set for manifest-size and route-discovery regression baselines. | discovery time, manifest bytes, diagnostics count | Planned |
| `large-1000-routes` | Large deterministic route set for route discovery, graph query, and agent context scaling. | discovery time, graph query time, context bytes, manifest bytes | Planned |
| `basic-static` | Small static site baseline. | build time, route JS, CSS, HTML bytes, static serve latency | Planned |
| `basic-ssr` | Minimal SSR route behavior. | SSR latency, cold start, response size, hydration bytes | Planned |
| `streaming-ssr` | Streaming path and shell timing. | time to first byte, shell flush, full response time | Planned |
| `api-json` | Standard API route path. | latency, throughput, validation overhead when enabled | Planned |
| `hot-api` | Generated hot API path. | latency, throughput, serializer cost, micro-cache behavior | Planned |
| `blog-seo` | Public content and SEO-heavy pages. | HTML completeness, metadata output, sitemap/robots time | Planned |
| `dashboard-client` | Client-heavy route with intentional hydration. | JS bytes, chunk count, hydration count, browser metrics | Planned |
| `large-route-graph` | Large app route discovery and graph output. | discovery time, graph time, context size, manifest size | Planned |
| `adapter-bun` | Bun adapter output. | static asset latency, SSR latency, API latency, headers | Planned |
| `adapter-node` | Node compatibility output. | parity, latency, unsupported diagnostics | Planned |
| `adapter-static` | Static export output. | export time, emitted file count, invalid route diagnostics | Planned |
| `docs-site` | Future public docs site. | build time, search index size, page payload, accessibility checks | Planned |
| `agent-context` | Agent context generation. | context generation time, capsule size, query latency | Planned |
| `safe-edit` | Safe metadata edit path. | dry-run time, apply time, affected check time, undo time | Planned |

## Fixture Requirements

### `basic-static`

Must prove:

- Static route emits HTML.
- Route manifest records static mode.
- Browser payload stays within planned budgets.
- Static output can be served by Bun and static adapters when those exist.

### `tiny-static`

Must prove:

- The smallest route fixture has deterministic files.
- Generated artifact skeletons remain compact.
- Static request-path tests have a stable future home.
- Route discovery can run against the fixture with raw metadata.
- The fixture never implies public comparison evidence before reviewed raw results exist.

### `medium-100-routes`

Must prove:

- Route count is deterministic.
- Manifest size can be tracked across commits.
- Route discovery diagnostics stay stable.
- Fixture generation uses a fixed seed when generated data is used.

### `large-1000-routes`

Must prove:

- Large route discovery remains deterministic.
- Graph and agent-context scaling have a stable future fixture.
- Manifest and context byte budgets have a repeatable source.
- Graph query benchmarks can run without inventing semantic edges.

### `basic-ssr`

Must prove:

- SSR route renders on request.
- Production errors are sanitized.
- Cache defaults are explicit.
- Bun and Node adapters return equivalent output when Node support exists.

### `hot-api`

Must prove:

- Request params validate.
- Response serialization is generated or explicitly marked generic.
- Invalid input returns structured diagnostics.
- Benchmark compares equivalent API behavior and explains differences.

### `large-route-graph`

Must prove:

- Route sorting is deterministic across operating systems.
- Graph extraction stays within documented time and size budgets.
- Context capsules remain bounded.
- Diagnostics remain stable for duplicate routes and unsupported conventions.

### `docs-site`

Must prove:

- Public Markdown routes build.
- Frontmatter validates.
- Navigation matches [Website Content Map](website-content-map.md).
- `docs-index.json`, `llms.txt`, and `llms-full.txt` generation rules are followed when implemented.
- Keyboard navigation and status labels remain accessible.

## Raw Result Layout

Planned result path:

```txt
benchmarks/results/<date>-<commit>/<fixture>/
  metadata.json
  raw-runs.jsonl
  summary.json
  environment.txt
  README.md
```

`metadata.json` should include commit SHA, fixture name, runtime versions, dependency versions, hardware, operating system, command, warmup details, run count, and whether results are lab-only or field data.

## Claim Rules

- Do not publish best-run-only numbers.
- Do not compare fixtures with different behavior.
- Do not mix Bun and Node results without labeling them.
- Do not use lab results as field-data claims.
- Do not publish browser-delivery claims without route asset evidence.
- Do not mark any performance doc verified until raw fixture evidence exists.

## Current Implemented Runners

`bun run lumina -- bench route-discovery --json --run` runs route discovery against `fixtures/apps/tiny-static` with one warmup and five measured runs. The JSON response includes commit SHA, fixture name, Bun and Node versions, compiler dependency versions, OS, hardware summary, command, warmup count, run count, raw per-run durations, route count, diagnostic count, and summary values.

`bun run lumina -- bench adapter-dispatch --json --run` builds a scratch copy of `fixtures/apps/tiny-static`, starts the built output through `@lumina/adapter-bun`, warms the request path once, and records five request batches for `/` and `/missing`. The JSON response includes commit SHA, fixture name, Bun and Node versions, adapter and build dependency versions, OS, hardware summary, command, warmup count, run count, raw per-run durations, status codes, response byte counts, and summary values.

`bun run lumina -- bench manifest-size --json --run` generates the fixed `fixtures/apps/medium-100-routes` source into a temporary directory, creates route, render, and map manifests in memory, and returns compact manifest byte counts with the same local metadata fields. The command measures generated artifact size, not user runtime speed.

`bun run lumina -- bench graph-query --json --run` generates the fixed `fixtures/apps/large-1000-routes` source into a temporary directory, creates one Lumina Map in memory, runs deterministic affected-route and related-file queries for five route source files, and returns route count, node count, edge count, diagnostic count, query count, affected route count, related file count, local timing, and min/median/max/mean duration summary values. The command measures agent-side graph query latency, not user runtime speed.

The commands do not persist files under `benchmarks/results/`, do not compare frameworks, and do not support public performance rankings.

## Out Of Scope For The Current Scaffold

- Synthetic results.
- CI performance gates.
- Public claims that Lumina is faster than another framework.
