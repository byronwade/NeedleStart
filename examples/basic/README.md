# Basic Example

Status: Verified.

The basic example is the smallest Lumina starter fixture. It proves the default static page path, generated route/render/map artifacts, local dev smoke startup, static build output, and static Bun adapter serving.

## Prerequisites

Run commands from the repository root after installing workspace dependencies:

```bash
bun install
```

## Commands

From `examples/basic/`:

```bash
bun run dev
bun run dev:once
bun run build
bun run build:json
bun run start
bun run start:once
bun run routes
bun run inspect
bun run inspect:why
```

From the repository root, the same framework commands are:

```bash
bun run lumina -- dev examples/basic --once
bun run lumina -- build examples/basic
bun run lumina -- build examples/basic --json
bun run lumina -- start examples/basic --once
bun run lumina -- routes examples/basic --json
bun run lumina -- inspect examples/basic --json
bun run lumina -- inspect examples/basic why /
```

## Expected Routes

- `/`

## Expected Generated Artifacts

- `.lumina/routes.json`
- `.lumina/render-manifest.json`
- `.lumina/map.json`
- `.lumina/build-trace.json`
- `.lumina/perf.report.json`
- `dist/routes.manifest.json`
- `dist/render.manifest.json`
- `dist/adapter.manifest.json`
- `dist/public/index.html`

## Expected Runtime Behavior

- `lumina dev` smoke-starts and writes generated artifacts.
- `lumina build` emits static HTML for `/`.
- `lumina start` serves built output through `@lumina/adapter-bun`.
- The built `/` response contains `Basic Lumina App`.

## Contracts Covered

- Routing Contract
- Manifest Contracts
- CLI JSON Contract
- Lumina Map
- Runtime Contract
- Adapter Contract

## Verification Evidence

`tests/mvp-app-fixtures.test.ts` copies this example into a writable fixture, smoke-starts dev, builds it, checks compact route/render/map/build artifacts, removes source route files, starts the built output, and asserts the built `/` route serves successfully.

## Known Limitations

- Production SSR routes remain planned.
- API routes remain planned.
- Metadata and SEO helpers remain planned.
- Benchmark results remain planned; current performance artifacts are status reports, not speed claims.
