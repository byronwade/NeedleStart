# Machine-Readable Documentation

Status: Planned.

Audience: AI agents, maintainers, framework contributors.

Lumina should make documentation consumable by humans and AI agents. Machine-readable docs are planned outputs, not implemented behavior.

## Planned Outputs

| Output | Purpose | Production surface |
| --- | --- | --- |
| `AGENTS.md` | App-local operating guide for AI agents in generated user applications. | Agent-only app-local artifact; not a production runtime bundle |
| `llms.txt` | Compact public docs or app-local summary for AI tools. | Docs or agent artifact; not a production runtime bundle |
| `llms-full.txt` | Full AI-readable public docs or app-local context. | Docs or agent artifact; not a production runtime bundle |
| `docs-index.json` | Index of docs pages, status, audience, tags, and source paths. | Public docs artifact only |
| `.lumina/routes.json` | Stable route manifest for apps. | Compiler source contract; adapter output consumes deployment-shaped `dist/*` copies |
| `.lumina/render-manifest.json` | Render modes and cache metadata for apps. | Compiler source contract; adapter output consumes deployment-shaped `dist/*` copies |
| `.lumina/map.json` | Queryable Lumina Map output for apps. | Compiler and agent source contract; not a production runtime bundle |
| `.lumina/map.readable.json` | Human- and agent-oriented Lumina Map export with labels, summaries, and source-doc links. | Agent and docs source contract; not a production runtime bundle |
| `.lumina/map.summary.md` | Markdown summary of routes, owners, risk surfaces, generated files, and recommended checks. | Agent and docs source contract; not a production runtime bundle |
| `.lumina/graph.json` | Compiler and agent graph data for apps. | Compiler and agent source contract; not a production runtime bundle |
| `.lumina/seo.report.json` | SEO audit output for apps. | Compiler and audit source contract; adapter output may copy report data into `dist/seo.report.json` |
| `.lumina/perf.report.json` | Performance and budget output for apps. | Compiler and audit source contract; not a production runtime bundle |
| `.lumina/context/*.ctx.json` | Route or surface context capsules for apps. | Agent source contract; not a production runtime bundle |
| `.lumina/context/agent-index.json` | Index of generated agent context. | Agent source contract; not a production runtime bundle |
| `.lumina/mutations.json` | Safe edit mutation log for apps. | Agent and safe-edit source contract; not a production runtime bundle |
| `.lumina/generated/*` | Generated runtime modules for apps. | May feed production build output, but not agent metadata |
| `dist/routes.manifest.json` | Deployment-oriented route manifest copy for adapters. | Adapter artifact |
| `dist/render.manifest.json` | Deployment-oriented render manifest copy for adapters. | Adapter artifact |
| `dist/seo.report.json` | Deployment-oriented SEO report copy for adapters. | Adapter artifact |
| `dist/adapter.manifest.json` | Adapter capabilities and deployment output metadata. | Adapter artifact |
| `dist/*` | Production build output. | Yes |

The root `AGENTS.md` in this repository is not generated. It remains the authoritative hand-maintained operating guide for contributors and AI agents working on Lumina itself. Generated `AGENTS.md` files are planned only for user applications created or managed by Lumina.

Canonical generated artifact names must stay aligned with [Manifest Contracts](manifest-contracts.md), [API Reference](api-reference.md), [Runtime Contract](runtime-contract.md), [Agent Kernel](agent-kernel.md), and public reference docs. The `.lumina/*` files are compiler and agent source contracts. The named `dist/*` files are adapter-shaped deployment outputs. The readable map exports are planned documentation products: they should explain graph evidence without becoming production runtime inputs.

## `docs-index.json` Draft

```json
{
  "schemaVersion": "lumina.docs-index.v0",
  "docsVersion": "unreleased",
  "generatedAt": "2026-07-06T00:00:00.000Z",
  "pages": [
    {
      "path": "docs/routing.md",
      "title": "Routing",
      "status": "planned",
      "audience": ["app developers", "AI agents"],
      "tags": ["routing", "file-conventions"],
      "source": "manual"
    },
    {
      "path": "docs/routing-contract.md",
      "title": "Routing Contract",
      "status": "planned",
      "audience": ["framework contributors", "runtime adapter authors", "AI agents"],
      "tags": ["routing", "manifests", "diagnostics"],
      "source": "manual"
    },
    {
      "path": "docs/api-route-contract.md",
      "title": "API Route Contract",
      "status": "planned",
      "audience": ["framework contributors", "runtime adapter authors", "security reviewers", "AI agents"],
      "tags": ["api-routes", "schemas", "diagnostics", "manifests"],
      "source": "manual"
    },
    {
      "path": "docs/schema-contract.md",
      "title": "Schema Contract",
      "status": "planned",
      "audience": ["framework contributors", "API route authors", "runtime adapter authors", "AI agents"],
      "tags": ["schemas", "validation", "serializers", "openapi"],
      "source": "manual"
    },
    {
      "path": "docs/cache-contract.md",
      "title": "Cache Contract",
      "status": "planned",
      "audience": ["framework contributors", "runtime adapter authors", "performance reviewers", "AI agents"],
      "tags": ["cache", "headers", "revalidation", "manifests"],
      "source": "manual"
    }
  ]
}
```

## Rules

- Include schema versions.
- Include docs or package version context once releases exist.
- Keep output deterministic.
- Use normalized POSIX-style paths.
- Do not include secrets, private tokens, or local machine paths.
- Keep AI-facing JSON compact.
- Link each generated item back to its source doc when practical.
- Distinguish docs for the framework repository from generated docs for user applications.
- Do not let generated app-local agent files override this repository's root `AGENTS.md`.

## Maintenance

Machine-readable docs should be generated once the docs index or public docs pipeline exists. Until then, this page is the contract draft.

Use [Documentation Verification](docs-verification.md) to check that `llms.txt`, `llms-full.txt`, `docs-index.json`, schema versions, and generated agent context remain documented consistently while the outputs are still planned.

Version behavior should follow [Versioning And Upgrades](versioning-and-upgrades.md).

Public docs metadata and route behavior should follow [Public Docs Site Architecture](public-docs-site-architecture.md) so generated docs indexes match the future website.

The future renderer, route mapping, frontmatter, canonical URLs, source docs, and website navigation should stay connected through [Public Frontmatter Standard](public-frontmatter-standard.md), [Docs Site Build Plan](docs-site-build-plan.md), and [Website Content Map](website-content-map.md).

Routing and route-manifest pages should follow [Routing Contract](routing-contract.md) so docs indexes, public reference pages, and generated route context agree on route terminology.

API route docs should follow [API Route Contract](api-route-contract.md) so docs indexes, public reference pages, generated route context, and future OpenAPI output agree on handler terminology.

Schema docs should follow [Schema Contract](schema-contract.md) so docs indexes, public reference pages, generated route context, and future OpenAPI output agree on validation and serializer terminology.

Cache docs should follow [Cache Contract](cache-contract.md) so docs indexes, public reference pages, route context, manifests, and future cache reports agree on cache terminology.

## Out Of Scope

- Embedding full source code in public AI docs by default.
- Shipping agent metadata in production runtime bundles.
- Letting AI docs override `AGENTS.md` or security policy.

