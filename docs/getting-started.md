# Getting Started

Status: Planned.

This page describes the target onboarding path for NeedleStart. The repository is still in Phase 0, so the commands below are not verified local commands yet.

## Current Repository Status

NeedleStart currently contains planning, architecture, roadmap, risk, skill, and subagent documentation. It does not yet contain the Bun workspace, package scaffold, CLI, compiler, runtime, or generated artifacts.

Use these docs first:

- [README](../README.md): product overview and current status.
- [Phase 1 Build Plan](phase-1-build-plan.md): the next implementation path.
- [Task Backlog](task-backlog.md): concrete implementation sequence.
- [Documentation Standard](documentation-standard.md): how docs should grow.

## Target App Creation Flow

Planned command once the package exists:

```bash
bun create needle my-app
cd my-app
bun dev
```

Target result:

- A React app starts locally.
- The home page renders server HTML.
- Public routes include SEO metadata.
- Route and render manifests are generated.
- Needle Map and agent context can be inspected.

Do not claim this flow works until `create-needle`, `@needle/cli`, and the runtime path exist and have been verified.

## Target Project Structure

Planned application structure:

```txt
my-app/
  app/
    layout.tsx
    page.tsx
    api/
      health.ts
  needle.config.ts
  package.json
  public/
```

Planned generated output:

```txt
.needle/
  routes.json
  render-manifest.json
  map.json
  graph.json
  seo.report.json
  context/
    agent-index.json
dist/
```

Generated files must not be edited manually.

## Target Development Commands

Planned CLI commands:

```bash
needle dev
needle build
needle start
needle routes
needle inspect
needle check
needle seo
needle map
needle agent
needle mcp
```

The repository must keep CLI JSON output stable, compact, and documented as commands become real.

## What To Build First

The next implementation work is:

1. Add the Bun monorepo scaffold.
2. Add package entrypoints and placeholder tests.
3. Lock shared core types in `@needle/core`.
4. Implement deterministic route discovery.
5. Emit `.needle/routes.json`.

See [Phase 1 Build Plan](phase-1-build-plan.md) and [Task Backlog](task-backlog.md).

## Out Of Scope For Phase 0

- Running a local NeedleStart app.
- Publishing packages.
- Real route discovery.
- Real SSR or static build output.
- Real MCP tools.
- Safe edit writes.

