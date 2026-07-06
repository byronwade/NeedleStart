# Phase 1 Build Plan

Status: Scaffolded.
Audience: framework contributors, maintainers, AI agents.

This document turns the planning docs into the first implementation path. It should be read before hardening package scaffolding, expanding shared core types, or claiming framework behavior works.

Test command, fixture, snapshot, and CI expectations are defined in [Testing Contract](testing-contract.md).

## Current Truth

NeedleStart now has the initial Phase 1 scaffold: Bun workspace configuration, package directories, placeholder source files, shared core scaffold types, root verification scripts, and placeholder tests.

Current verified scaffold commands:

```bash
bun install
bun test
bun run typecheck
bun run docs:check
bun run structure:check
bun run performance:check
bun run check
```

`needle dev`, `needle build`, and the other CLI commands remain target UX, not implemented behavior. Public API examples in the docs are still drafts.

## Phase 1 Goal

Create a clean monorepo foundation that makes later compiler, runtime, SEO, map, and agent work possible without package-boundary drift.

The initial scaffold proves this foundation:

- The workspace installs.
- The package graph is explicit.
- Each package has an entrypoint.
- Placeholder tests and type checks run.
- Documentation still clearly separates planned behavior from implemented behavior.

Future Phase 1 hardening should preserve those guarantees while adding the smallest implementation surface needed for Phase 1A.

## Package Scaffold

The scaffold uses these package paths:

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

The Phase 1 scaffold includes:

- `package.json` with Bun workspace configuration.
- `bun.lockb` after install.
- `tsconfig.base.json`.
- Root test and typecheck scripts.
- Package-level `package.json` files.
- Package-level `src/index.ts` files.
- Package-level placeholder tests where practical.
- Initial `tests/` folders only when they match the planned fixture layout in [Testing Contract](testing-contract.md).

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

`NeedleDiagnostic` must follow [Diagnostics Contract](diagnostics-contract.md).

## Verification

The minimum scaffold checks are:

```bash
bun install
bun test
bun run typecheck
bun run docs:check
bun run structure:check
bun run performance:check
```

If a command is not available yet, the PR must say so and update the relevant docs. Do not leave stale claims that the command passes.

Placeholder tests should prove package entrypoints and type surfaces only. They should not imply route discovery, rendering, adapter behavior, or generated artifacts exist.

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

When Phase 1 scaffold files, package boundaries, commands, or status change, update:

- `README.md`: current status, setup commands, and implemented package structure.
- `AGENTS.md`: real commands, package boundaries, generated-file rules if any.
- `docs/roadmap.md`: Phase 1 status.
- `docs/package-map.md`: package names and dependency rules.
- `docs/testing.md` and `docs/testing-contract.md`: real scripts, fixture layout, and CI behavior.
- `docs/task-backlog.md`: completed and next tasks.

