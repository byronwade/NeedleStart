# Lumina Marketing App

Status: Scaffolded.

This is the first Lumina marketing website source fixture. It exists so the compiler and CLI can
exercise a real app-shaped route tree before runtime rendering, `lumina dev`, `lumina build`, and
`lumina start` are implemented.

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
```

These commands generate and inspect:

- `.lumina/routes.json`
- `.lumina/render-manifest.json`
- `.lumina/map.json`

## Known Limitations

- The app does not run in dev mode yet.
- The app does not build static HTML yet.
- The app cannot be served from built output yet.
- Benchmark pages describe status only and make no performance claims.
