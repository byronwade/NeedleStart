# Create An App

Status: Planned.

Audience: new users, app developers.

This guide describes the target app creation flow. It is not implemented yet.

## Planned Command

```bash
bun create needle my-app
cd my-app
needle dev
```

Generated apps should also expose `bun run dev`, `bun run build`, and `bun run start` package scripts that call the equivalent `needle dev`, `needle build`, and `needle start` framework commands.

## Target Result

- A local development server should start.
- A React page should render.
- `.needle/routes.json` and `.needle/render-manifest.json` should be generated.
- SEO metadata should be visible for public pages.
- Needle Map and agent context should be inspectable.

## Current Reality

The repository has a Bun workspace, package placeholders, shared core types, CI, and enforcement scripts. The `create-needle` package is scaffolded, but app creation behavior is not implemented yet. Use [Phase 1 Build Plan](../../phase-1-build-plan.md) for shared-core expansion, route discovery, and the first implementation sequence.

The future default starter must follow [Examples And Templates Contract](../../examples-contract.md) before this guide can be marked verified.

## Source

- [Getting Started](../../getting-started.md)
- [Examples](../reference/examples.md)
- [CLI Reference](../reference/cli.md)
- [File Conventions](../reference/file-conventions.md)

