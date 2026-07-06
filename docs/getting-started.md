# Getting Started

Status: Planned.

Audience: new users, app developers, AI agents.

This page describes the target app onboarding path for NeedleStart. The repository is in Phase 1 scaffold, so repository maintenance commands are available, but the app creation commands below are not verified local commands yet.

## Current Repository Status

NeedleStart currently contains planning, architecture, roadmap, risk, skill, and subagent documentation plus the Phase 1 Bun workspace and package placeholders. It does not yet contain CLI behavior, compiler behavior, runtime behavior, or generated artifacts.

Use these docs first:

- [README](../README.md): product overview and current status.
- [Phase 1 Build Plan](phase-1-build-plan.md): the scaffold hardening and first implementation path.
- [Task Backlog](task-backlog.md): concrete implementation sequence.
- [Examples And Templates Contract](examples-contract.md): how future starter examples become verified.
- [Documentation Standard](documentation-standard.md): how docs should grow.

## Target App Creation Flow

Planned command once app creation behavior exists:

```bash
bun create needle my-app
cd my-app
needle dev
```

Generated apps should also expose `bun run dev`, `bun run build`, and `bun run start` package scripts that call the framework commands.

Target result:

- A React app should start locally.
- The home page should render server HTML.
- Public routes should include SEO metadata.
- `.needle/routes.json` and `.needle/render-manifest.json` should be generated.
- Needle Map and agent context should be inspectable.

Do not claim this flow works until `create-needle`, `@needle/cli`, and the runtime path exist and have been verified.

The default generated app must eventually map to a verified starter example as defined in [Examples And Templates Contract](examples-contract.md).

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
  perf.report.json
  context/
    *.ctx.json
    agent-index.json
  mutations.json
  generated/
dist/
  routes.manifest.json
  render.manifest.json
  seo.report.json
  adapter.manifest.json
  *
```

The generated artifact names are `.needle/routes.json`, `.needle/render-manifest.json`, `.needle/map.json`, `.needle/graph.json`, `.needle/seo.report.json`, `.needle/perf.report.json`, `.needle/context/*.ctx.json`, `.needle/context/agent-index.json`, `.needle/mutations.json`, `.needle/generated/*`, `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, `dist/adapter.manifest.json`, and `dist/*`.

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
needle edit
needle migrate
needle bench
```

The repository must keep CLI JSON output stable, compact, and documented as commands become real.

## What To Build First

The next implementation work is:

1. Expand and stabilize shared core types in `@needle/core`.
2. Implement deterministic route discovery.
3. Emit `.needle/routes.json`.
4. Add the stable CLI JSON envelope.
5. Make `needle dev` start the first verified app path.

See [Phase 1 Build Plan](phase-1-build-plan.md) and [Task Backlog](task-backlog.md).

## Out Of Scope Until Implementation

- Running a local NeedleStart app.
- Publishing packages.
- Real route discovery.
- Real SSR or static build output.
- Real MCP tools.
- Safe edit writes.

