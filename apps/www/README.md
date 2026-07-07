# Lumina Marketing App

Status: Verified.

This is the first Lumina marketing website source fixture. It exists so the compiler and CLI can
exercise a real app-shaped route tree through route discovery, CLI inspection, minimal dev serving,
static build output, and static built-output serving.

## Routes

- `/`
- `/about`
- `/docs`
- `/benchmarks`
- `/examples`
- `/roadmap`

## Current Verification

From the repository root:

```bash
bun run lumina -- routes apps/www --json
bun run lumina -- inspect apps/www --json
bun run lumina -- inspect apps/www why /
bun run lumina -- dev apps/www --once
bun run lumina -- build apps/www --json
bun run lumina -- start apps/www --once
```

These commands generate and inspect:

- `.lumina/routes.json`
- `.lumina/render-manifest.json`
- `.lumina/map.json`
- `.lumina/build-trace.json`
- `.lumina/perf.report.json`
- `dist/routes.manifest.json`
- `dist/render.manifest.json`
- `dist/adapter.manifest.json`
- `dist/public/*.html`

## Known Limitations

- Client hydration is not implemented yet.
- Component-level HMR is not implemented yet.
- Production SSR/API serving is not implemented yet.
- Benchmark pages describe status only and make no performance claims.
