# Project Structure

Status: Planned.

Audience: app developers, framework contributors, AI agents.

Lumina apps are planned to use a small application root, file-based routes under `app/`, generated framework artifacts under `.lumina/`, and production output under `dist/`.

The repository is in Phase 1 scaffold. This page describes target application structure and scaffolded repository structure, not verified generated app output.

## Application Structure

Planned generated app:

```txt
my-app/
  app/
    layout.tsx
    page.tsx
    api/
      health.ts
  lumina.config.ts
  package.json
  public/
```

| Path | Purpose | Status |
| --- | --- | --- |
| `app/` | Route modules, layouts, pages, route handlers, and route-level conventions. | Planned |
| `app/page.tsx` | Home page route. | Planned |
| `app/layout.tsx` | Root layout for nested pages. | Planned |
| `app/api/*` | API route handlers. | Planned |
| `lumina.config.ts` | Framework config. | Planned |
| `public/` | Static assets copied to output. | Planned |
| `.lumina/` | Generated route, render, SEO, graph, and agent artifacts. | Planned |
| `dist/` | Built production output. | Planned |

## Generated Files

Planned generated files:

```txt
.lumina/
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

The generated artifact names are `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/graph.json`, `.lumina/seo.report.json`, `.lumina/perf.report.json`, `.lumina/context/*.ctx.json`, `.lumina/context/agent-index.json`, `.lumina/mutations.json`, `.lumina/generated/*`, `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, `dist/adapter.manifest.json`, and `dist/*`. The `.lumina/*` files are canonical compiler and agent contracts; the named `dist/*` files are deployment-oriented adapter copies.

Generated files must be deterministic and must not be edited manually.

## Repository Structure

Lumina itself is scaffolded as a Bun workspace with package workspaces under `packages/`, adapter package workspaces under `packages/adapters/`, repository scripts under `scripts/`, tests under `tests/`, and documentation under `docs/`.

The planned example and large-fixture directories, including `examples/` and `playgrounds/`, do not exist yet. Public docs may name them as planned paths, but they must not describe those directories as scaffolded, runnable, or verified until the files, commands, tests, and example status labels exist.

Planned test fixture structure is defined in [Testing](testing.md) and the internal [Testing Contract](../../testing-contract.md).

Root-level AI collaboration playbooks should not exist. The canonical skill and subagent briefs live under:

```txt
docs/
  skills/
  subagents/
```

## Source

- [File Conventions](../../file-conventions.md)
- [Routing Contract](../../routing-contract.md)
- [Package Map](../../package-map.md)
- [Testing Contract](../../testing-contract.md)
- [Product Build Readiness](../../product-build-readiness.md)
