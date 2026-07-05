# Benchmark System Contract

NeedleStart should eventually benchmark itself against comparable frameworks such as Next.js, Astro, and TanStack Start. This document defines the benchmark system architecture, fixtures, metrics, outputs, and public reporting rules.

No benchmark results exist yet. Until NeedleStart has implementation and benchmark fixtures, this document is a contract for future work, not a performance claim.

## Goals

- Build a reproducible benchmark harness.
- Compare equivalent workloads across frameworks.
- Publish raw data alongside summaries.
- Separate build, runtime, dev, SEO/output, and agent-native benchmarks.
- Make performance claims only when raw results and methodology exist.
- Show where NeedleStart loses as well as where it wins.
- Avoid misleading comparisons when a feature has no equivalent in another framework.

## Non-Goals

Initially out of scope:

- Publishing benchmark results before NeedleStart is implemented.
- Comparing intentionally poor competitor implementations.
- Treating CI smoke numbers as official benchmark results.
- Hiding raw data behind charts.
- Claiming agent-native benchmarks are equivalent to ordinary framework benchmarks.

## Comparison Targets

Initial comparison targets:

- NeedleStart.
- Next.js.
- Astro.
- TanStack Start.

Future targets may include:

- Remix / React Router framework mode.
- Plain Vite plus custom server.
- Other frameworks relevant to specific workloads.

## Benchmark Principles

1. Same app semantics, framework-native implementation.
2. Pin framework, runtime, package manager, and dependency versions.
3. Separate cold and warm measurements.
4. Separate build-time, runtime, dev, SEO/output, and agent-workflow benchmarks.
5. Publish raw data.
6. Publish methodology.
7. Report variance, not just one best number.
8. Mark unsupported or non-equivalent features as not comparable.
9. Do not treat not comparable as failed.
10. Do not publish performance claims before the feature exists.

## Repository Layout

Planned layout:

```txt
benchmarks/
  README.md
  benchmark.config.ts
  fixtures/
    hello-static/
      needlestart/
      next/
      astro/
      tanstack-start/
    hello-ssr/
      needlestart/
      next/
      astro/
      tanstack-start/
    json-api/
      needlestart/
      next/
      astro/
      tanstack-start/
    hot-api/
      needlestart/
      next/
      astro/
      tanstack-start/
    blog-1000/
      needlestart/
      next/
      astro/
      tanstack-start/
    ecommerce-10000/
      needlestart/
      next/
      astro/
      tanstack-start/
    large-app-2000-routes/
      needlestart/
      next/
      astro/
      tanstack-start/
    agent-impact/
      needlestart/
      scripted-baseline/
  runner/
    src/
      cli.ts
      frameworks.ts
      scenarios.ts
      metrics.ts
      report.ts
  results/
    raw/
    summaries/
```

Do not add benchmark result files until real runs exist.

## Fixture Matrix

| Fixture | NeedleStart | Next.js | Astro | TanStack Start | Purpose |
| --- | --- | --- | --- | --- | --- |
| `hello-static` | yes | yes | yes | yes | Basic static route. |
| `hello-ssr` | yes | yes | yes, with server output | yes | SSR route. |
| `json-api` | yes | yes | yes, with server output | yes | JSON endpoint. |
| `hot-api` | yes | closest normal endpoint | closest endpoint | closest endpoint | NeedleStart hot path comparison. |
| `blog-1000` | yes | yes | yes | yes | Many prerendered pages. |
| `ecommerce-10000` | yes | yes | yes | yes | Dynamic catalog shape. |
| `large-app-2000-routes` | yes | yes | maybe limited | yes | Route discovery and build scale. |
| `agent-impact` | yes | scripted baseline | scripted baseline | scripted baseline | Graph and agent workflow comparison. |

## Benchmark Families

### Build Benchmarks

Measure:

- Clean build time.
- Rebuild time.
- Output size.
- Server bundle size.
- Client JS per route.
- CSS per route.
- Generated artifact size.
- Peak memory during build.

Fixtures:

- `hello-static`
- `blog-1000`
- `ecommerce-10000`
- `large-app-2000-routes`

### Runtime Benchmarks

Measure:

- Cold start time.
- First request latency.
- p50 latency.
- p95 latency.
- p99 latency.
- Requests per second.
- Memory RSS idle.
- Memory RSS under load.
- Static asset latency.
- SSR latency.
- API latency.
- Hot API latency.

Fixtures:

- `hello-static`
- `hello-ssr`
- `json-api`
- `hot-api`

### Dev Experience Benchmarks

Measure:

- Dev server startup.
- First page ready.
- Route discovery time.
- HMR update latency.
- Typegen or manifest generation time.
- Memory idle in dev.

Fixtures:

- `basic`
- `routing`
- `large-app-2000-routes`

### SEO and Output Benchmarks

Measure:

- HTML content completeness.
- Metadata presence.
- Sitemap generation time.
- Robots output.
- Structured data output.
- Route count.
- Initial JS weight.

This family is partly correctness and output quality, not only speed.

### Agent-Native Benchmarks

Measure:

- Time to answer what routes are affected by a component.
- Time to produce route context.
- Context size needed for an agent to make a safe edit.
- Affected check precision and recall on fixture changes.
- Safe metadata edit dry-run time.
- Safe metadata edit apply time.
- Rejected dangerous edit rate.
- Rollback success.

Competitors may not have native equivalents. Mark comparison mode clearly:

| Mode | Meaning |
| --- | --- |
| `native` | Framework provides a built-in primitive. |
| `scripted` | Benchmark uses a custom script over project files. |
| `manual-search` | Agent or script searches source without framework graph. |
| `not-applicable` | No meaningful equivalent. |

Do not score `not-applicable` as slower or failed.

## Planned Commands

Future CLI:

```bash
needle bench list
needle bench run hello-static --framework needlestart,next,astro,tanstack-start
needle bench run blog-1000 --framework all --repetitions 10
needle bench compare results/raw/<run-id>.json
needle bench report results/raw/<run-id>.json --format markdown
needle bench smoke
```

Smoke benchmarks should run tiny fixtures only. Full benchmarks should be manual or scheduled on controlled machines.

## Framework Command Contracts

Each framework adapter in the benchmark runner should define:

```ts
export type FrameworkBenchmarkAdapter = {
  id: "needlestart" | "next" | "astro" | "tanstack-start"
  name: string
  versionCommand: string
  installCommand: string
  devCommand: string
  buildCommand: string
  startCommand?: string
  previewCommand?: string
  outputDir?: string
  healthPath?: string
}
```

The runner should not assume every framework has the same production command shape.

## Result Contract

Raw benchmark runs should emit stable JSON.

```ts
export type BenchmarkRun = {
  schemaVersion: string
  runId: string
  startedAt: string
  commit: string
  environment: BenchmarkEnvironment
  frameworks: FrameworkResult[]
}
```

```ts
export type BenchmarkEnvironment = {
  os: string
  arch: string
  cpu: string
  cores: number
  memoryBytes: number
  nodeVersion?: string
  bunVersion?: string
  packageManager: string
  ci: boolean
}
```

```ts
export type FrameworkResult = {
  framework: "needlestart" | "next" | "astro" | "tanstack-start"
  frameworkVersion: string
  fixture: string
  mode: "dev" | "build" | "production" | "agent"
  comparability: "native" | "scripted" | "manual-search" | "not-applicable"
  commands: Array<{
    command: string
    exitCode: number
    durationMs: number
    stdoutPath: string
    stderrPath: string
  }>
  metrics: BenchmarkMetrics
  checks: BenchmarkCheck[]
}
```

```ts
export type BenchmarkMetrics = {
  buildMs?: number
  rebuildMs?: number
  devReadyMs?: number
  coldStartMs?: number
  firstRequestMs?: number
  p50Ms?: number
  p95Ms?: number
  p99Ms?: number
  requestsPerSecond?: number
  rssBytes?: number
  peakRssBytes?: number
  outputBytes?: number
  clientJsBytes?: number
  serverBytes?: number
  cssBytes?: number
  routeCount?: number
  manifestBytes?: number
  contextBytes?: number
  affectedPrecision?: number
  affectedRecall?: number
}
```

```ts
export type BenchmarkCheck = {
  name: string
  status: "pass" | "warn" | "fail" | "skipped"
  reason?: string
}
```

## Public Reporting Rules

Every public benchmark result must include:

- Date.
- Commit SHA.
- Environment.
- Framework versions.
- Runtime versions.
- Fixture source links.
- Commands run.
- Raw data link.
- Known limitations.
- Variance or repetitions.
- What this benchmark does not prove.

Public summaries must not hide raw data.

## Website Pages

Future benchmark website pages:

```txt
/benchmarks
/benchmarks/methodology
/benchmarks/results
/benchmarks/raw-data
/benchmarks/reproduce
```

Each result page should be generated from raw data when possible.

## CI Policy

CI can run benchmark smoke tests, but official benchmark results should be produced on controlled machines.

CI benchmark labels:

| Label | Meaning |
| --- | --- |
| `ci-smoke` | Functional benchmark harness check. Not official performance data. |
| `local-dev` | Local run. Useful for debugging, not official. |
| `controlled` | Official or publishable benchmark environment. |

## Integration With Docs

Update these docs when benchmark behavior changes:

- `docs/benchmark-methodology.md`
- `docs/testing.md`
- `docs/examples.md`
- `docs/comparisons.md`
- `docs/release.md`
- `docs/status.md`
- `docs/website-content-map.md`

## Out of Scope Initially

- Official benchmark results.
- Hosted benchmark dashboard.
- Automatic nightly full benchmark matrix.
- Benchmarking every framework feature.
- Claims about frameworks with non-equivalent primitives.
