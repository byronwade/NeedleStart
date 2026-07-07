# Examples Catalog

Status: Planned.

Audience: app developers, docs maintainers, framework contributors, AI agents.

This catalog names the official examples Lumina should grow into. It complements [Examples And Templates Contract](examples-contract.md), [Getting Started](getting-started.md), [Public Examples Reference](public/reference/examples.md), and [Benchmark Fixtures](benchmark-fixtures.md).

Source fixtures now exist for `apps/www`, `examples/basic/`, `examples/blog-seo/`, `examples/multi-app-workspace/`, `examples/large-100-routes/`, and `examples/large-1000-routes/`. `apps/www` is runnable through the minimal dev/build/start path. `examples/basic/` is the first verified starter example, with test coverage for dev smoke startup, static build, built start, generated artifacts, and the root HTML response. The remaining standalone examples are compiler-verifiable fixtures, not runnable or verified examples yet. Every other entry is planned until files, commands, tests, and generated artifacts prove otherwise.

## Status Values

Use the same status values as [Examples And Templates Contract](examples-contract.md):

- Planned.
- Scaffolded.
- Runnable.
- Verified.
- Deprecated.

## Catalog

| Example | Planned path | Status | Purpose |
| --- | --- | --- | --- |
| Lumina Marketing App | `apps/www/` | Runnable | First marketing app source fixture for route discovery, generated manifests, Lumina Map, CLI inspection, dev serving, static build, and static start. |
| Basic Starter | `examples/basic/` | Verified | Smallest useful app for `bun create lumina`. |
| Blog SEO | `examples/blog-seo/` | Scaffolded | Static content, future metadata, sitemap, robots, and structured data. |
| Multi-App Workspace | `examples/multi-app-workspace/` | Scaffolded | Future workspace graph, shared-file identity, affected build, and split-app planning. |
| Large 100 Routes | `examples/large-100-routes/` | Scaffolded | Deterministic generated route-discovery and manifest-ordering fixture. |
| Large 1000 Routes | `examples/large-1000-routes/` | Scaffolded | Deterministic generated large-route and future graph-scaling fixture. |
| API Route | `examples/api-route/` | Planned | Standard API route methods, params, body handling, and errors. |
| Hot API | `examples/hot-api/` | Planned | Generated validation, serialization, and optional micro-cache. |
| Static Export | `examples/static-export/` | Planned | Fully static output and unsupported-route diagnostics. |
| Node Adapter | `examples/adapter-node/` | Planned | Node compatibility for SSR and static output. |
| Dashboard Client | `examples/dashboard-client/` | Planned | Intentional client interactivity and hydration boundaries. |
| Ecommerce | `examples/ecommerce/` | Planned | Product pages, cache tags, API routes, SEO, and performance budgets. |
| Agent Demo | `examples/agent-demo/` | Planned | Lumina Map inspection, context capsules, safe edit, mutation log, and undo. |
| Docs Site | `examples/docs-site/` | Planned | Future public docs renderer, frontmatter, navigation, search, and machine-readable outputs. |
| Large App Fixture | `playgrounds/large-app-fixture/` | Planned | Broader route discovery scale, graph generation, diagnostics, and benchmark evidence. |

## Default Starter Requirements

MVP Alpha is currently using `apps/www/` plus the scaffolded examples as the source fixture lane. These fixtures should not include API routes, MCP, safe edits, auth, databases, benchmark claims, or production adapter compatibility beyond the exact MVP scope.

The default starter is the first `examples/` entry to become verified.

It should include:

- One static page.
- One SSR page.
- One API route after API support exists.
- One metadata example.
- One generated route manifest.
- One README with commands and expected output.
- One small deterministic test set.

The default starter should not include auth, database setup, billing, third-party API keys, or complex styling.

## Public Guide Mapping

| Public guide | Example dependency |
| --- | --- |
| Create An App | Basic Starter |
| Add A Static Page | Basic Starter |
| Add SEO Metadata | Blog SEO |
| Create An API Route | API Route |
| Create A Hot API Route | Hot API |
| Inspect Lumina Map | Agent Demo or Large App Fixture |
| Use Agent Context | Agent Demo |

Public guides may describe planned workflows before examples exist, but they must not claim the examples run until verified.

## Example README Requirements

Each example README must include:

- Status.
- What it demonstrates.
- Prerequisites.
- Commands.
- Expected routes.
- Expected generated artifacts.
- Expected diagnostics, if any.
- Contracts covered.
- Known limitations.
- Verification evidence.

## Verification Gate

An example can move to verified only when:

- Commands run from a clean checkout.
- Tests pass.
- Generated artifacts match snapshots or documented expectations.
- Public docs link to the example status.
- README and AGENTS remain honest about package and command status.
- Platform limitations are documented in [Compatibility](compatibility.md).

## Out Of Scope For The Current Scaffold

- Calling scaffolded example apps runnable or verified.
- Claiming examples run.
- Remote template fetching.
- Benchmark numbers from planned examples.
