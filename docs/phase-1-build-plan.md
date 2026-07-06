# Phase 1 Build Plan

This document turns the planning docs into the first implementation path. It should be read before creating package scaffolding or claiming local commands work.

## Current Truth

NeedleStart is still documentation-only. Phase 1 starts when the repository adds a Bun workspace, package directories, placeholder source files, and placeholder tests.

Until that happens:

- `bun install`, `bun test`, and `bun run typecheck` are planned commands, not verified commands.
- `needle dev`, `needle build`, and the other CLI commands are target UX, not implemented behavior.
- Public API examples in the docs are drafts.

## Phase 1 Goal

Create a clean monorepo foundation that makes later compiler, runtime, SEO, map, and agent work possible without package-boundary drift.

The first implementation PR should prove only this:

- The workspace installs.
- The package graph is explicit.
- Each package has an entrypoint.
- Placeholder tests and type checks run.
- Documentation still clearly separates planned behavior from implemented behavior.

## Package Scaffold

Create these packages first:

```txt
packages/create-needle
packages/cli
packages/core
packages/compiler
packages/vite-plugin
packages/react
packages/router
packages/seo
packages/map
packages/agent
packages/mcp
packages/cache
packages/schema
packages/devtools
packages/adapters/bun
packages/adapters/node
packages/adapters/static
```

Package names should be:

```txt
create-needle
@needle/cli
@needle/core
@needle/compiler
@needle/vite-plugin
@needle/react
@needle/router
@needle/seo
@needle/map
@needle/agent
@needle/mcp
@needle/cache
@needle/schema
@needle/devtools
@needle/adapter-bun
@needle/adapter-node
@needle/adapter-static
```

`@needle/server-bun` remains a planned runtime package name from earlier docs, but Phase 1 should prefer the adapter package path unless a later architecture decision reintroduces a separate server package. Bun-specific request handling belongs in `@needle/adapter-bun`; shared runtime contracts belong in `@needle/core` or generated output.

## Root Files

The Phase 1 scaffold should add or update:

- `package.json` with Bun workspace configuration.
- `bun.lock` after install.
- `tsconfig.base.json`.
- Root test and typecheck scripts.
- Package-level `package.json` files.
- Package-level `src/index.ts` files.
- Package-level placeholder tests where practical.

Do not add framework behavior in the same change unless the task explicitly says so.

## Package Minimums

Each package should define:

- `name`.
- `version`.
- `type`.
- `exports`.
- `types`.
- `scripts` when package-local checks are needed.
- `src/index.ts`.
- A local README once the package starts owning real behavior.

For Phase 1, exports can point to empty or placeholder entrypoints if they do not claim implemented functionality.

## Dependency Direction

Start with this conservative dependency flow:

```txt
@needle/core
  -> no internal dependencies

@needle/compiler
@needle/router
@needle/seo
@needle/map
@needle/cache
@needle/schema
  -> @needle/core

@needle/agent
@needle/mcp
@needle/devtools
  -> @needle/core and stable package APIs only

@needle/cli
  -> package APIs, not package internals

@needle/adapter-bun
@needle/adapter-node
@needle/adapter-static
  -> @needle/core and generated runtime contracts
```

Production runtime packages must not depend on `@needle/agent`, `@needle/mcp`, or `@needle/devtools`.

## First Types To Lock

Phase 1A should define the shared model in `@needle/core` before any package creates local substitutes:

- `NeedleApp`
- `RouteNode`
- `GraphEdge`
- `NeedleDiagnostic`
- `RenderMode`
- `CachePlan`
- `AdapterManifest`

`GraphEdge` must include `kind`, `source`, `confidence`, and `why`.

## Verification

After Phase 1 scaffolding exists, the minimum checks are:

```bash
bun install
bun test
bun run typecheck
```

If a command is not available yet, the PR must say so and update the relevant docs. Do not leave stale claims that the command passes.

## Out Of Scope

Phase 1 should not implement:

- Route discovery.
- Vite dev server integration.
- React rendering.
- Runtime request handling.
- Needle Map extraction.
- MCP tools.
- Safe edit transactions.
- Generated `.needle/*` artifacts.

Those belong to later roadmap tasks after the package foundation exists.

## Documentation Checklist

When Phase 1 lands, update:

- `README.md`: current status, setup commands, and implemented package structure.
- `AGENTS.md`: real commands, package boundaries, generated-file rules if any.
- `docs/roadmap.md`: Phase 1 status.
- `docs/package-map.md`: package names and dependency rules.
- `docs/task-backlog.md`: completed and next tasks.

