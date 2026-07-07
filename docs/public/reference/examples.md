# Examples

Status: Planned.

Audience: app developers, framework contributors, AI agents.

Lumina examples are scaffolded only where noted. Scaffolded examples are source fixtures for compiler and CLI evidence. `examples/basic/` is the first verified starter example; the other standalone examples are not runnable or verified public examples yet.

## Planned Examples

| Example | Planned path | Purpose | Current status |
| --- | --- | --- | --- |
| Lumina Marketing App | `apps/www/` | Route discovery, generated manifests, Lumina Map, and CLI inspection source fixture. | Runnable |
| Basic Starter | `examples/basic/` | Smallest useful generated app. | Verified |
| Blog SEO | `examples/blog-seo/` | Tutorial app for pages, metadata, sitemap, and public HTML checks. | Scaffolded |
| Multi-App Workspace | `examples/multi-app-workspace/` | Future workspace graph and shared-file identity fixture. | Scaffolded |
| Large 100 Routes | `examples/large-100-routes/` | Deterministic generated route-discovery fixture. | Scaffolded |
| Large 1000 Routes | `examples/large-1000-routes/` | Deterministic generated large-route fixture. | Scaffolded |
| API Route | `examples/api-route/` | Focused API route example. | Planned |
| Hot API | `examples/hot-api/` | Generated validation, serialization, and optional micro-cache. | Planned |
| Static Export | `examples/static-export/` | Fully static output and unsupported-route diagnostics. | Planned |
| Node Adapter | `examples/adapter-node/` | Node compatibility for SSR and static output. | Planned |
| Dashboard Client | `examples/dashboard-client/` | Intentional client interactivity and hydration boundaries. | Planned |
| Ecommerce | `examples/ecommerce/` | Product pages, cache tags, API routes, SEO, and performance budgets. | Planned |
| Agent Demo | `examples/agent-demo/` | Map inspection, safe edit preview, apply, log, and undo. | Planned |
| Docs Site | `examples/docs-site/` | Future public docs renderer, frontmatter, navigation, search, and machine-readable outputs. | Planned |
| Large App Fixture | `playgrounds/large-app-fixture/` | Large route tree, graph generation, and performance evidence. | Planned |

## Example Status

- Planned: target example only.
- Scaffolded: files exist, behavior incomplete.
- Runnable: commands start, but full evidence is incomplete.
- Verified: commands, tests, generated artifacts, and docs claims pass.
- Deprecated: retained for compatibility or migration notes.

`apps/www` is runnable through the minimal dev/build/start path, and `examples/basic/` is verified through fixture tests. Other standalone examples remain scaffolded or planned.

## MVP Alpha Demo

The first MVP source fixture is `apps/www/`. It should match [MVP Alpha Scope](../../mvp-alpha-scope.md) and avoid API routes, MCP, safe edits, auth, databases, and benchmark claims.

## Future Create Command

Planned examples may eventually be used by the create command:

```bash
bun create lumina my-app
bun create lumina my-blog --example blog-seo
```

These commands are not implemented yet.

## Verified Example Requirements

A verified example must include:

- README with status, purpose, prerequisites, commands, expected output, and limitations.
- Tests or fixture assertions.
- Expected `.lumina/*` artifacts.
- Public HTML or HTTP assertions when relevant.
- Links to the contracts it exercises.
- Evidence from the current repository state.

## Source

- [Create An App](../guides/create-app.md)
- [Project Structure](project-structure.md)
- [Testing](testing.md)
- [Manifest Contracts](manifest-contracts.md)
- [Examples And Templates Contract](../../examples-contract.md)
