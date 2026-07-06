# Documentation Hub

This directory is the source of truth for NeedleStart planning, architecture, roadmap, and future implementation tasks.

## Start Here

- [Project Status](status.md): current phase, what exists, and what does not exist yet.
- [Getting Started](getting-started.md): current status and target onboarding flow.
- [Roadmap](roadmap.md): complete phase plan.
- [Phase 1 Build Plan](phase-1-build-plan.md): concrete monorepo scaffold path and verification expectations.
- [Documentation Standard](documentation-standard.md): docs information architecture, status labels, and page quality bar.
- [Documentation Research Notes](documentation-research.md): primary-source lessons from leading docs.
- [Documentation Freshness Policy](docs-freshness-policy.md): rules for keeping docs current as the project changes.

## User-Facing Docs

- [Public Website Content](public/README.md): public-facing Markdown source tree for the future website.
- [Guides](guides.md): planned task-focused guide set.
- [API Reference](api-reference.md): planned command, config, helper, and manifest reference index.
- [File Conventions](file-conventions.md): planned application file and route conventions.
- [CLI Reference](cli.md): planned `needle` command reference.
- [Configuration Reference](config.md): planned `needle.config.ts` reference.
- [Routing](routing.md): planned route conventions.
- [Manifest Contracts](manifest-contracts.md): planned generated manifest contracts.
- [Examples](examples.md): planned examples and fixtures.

## Core Architecture Documents

- [Product Strategy](product-strategy.md): positioning and strategic wedge.
- [Engineering Standards](engineering-standards.md): operating principles, review bar, definitions of ready and done.
- [Operating Cadence](operating-cadence.md): planned review rhythm for active development, phase changes, releases, and AI-agent work.
- [Package Map](package-map.md): package responsibilities and boundaries.
- [Compiler IR](compiler-ir.md): internal compiler model and manifest contracts.
- [Runtime Contract](runtime-contract.md): server behavior and build output expectations.
- [Adapter Architecture](adapters.md): Bun, Node, and static adapter strategy.
- [Agent Kernel](agent-kernel.md): agent context, safe edits, and generated agent files.
- [Safe Edit Transactions](safe-edit-transactions.md): transaction engine, risk tiers, dry runs, mutation logs, and undo.
- [Needle Map](needle-map.md): graph model, nodes, edges, and queries.
- [Migration Tooling](migration.md): migration commands, contract stubs, and reports.
- [Risk Mitigation](risk-mitigation.md): mitigation plan for semantic graph, scope, adoption, Bun perception, and safe edits.
- [Speed Strategy](speed-strategy.md): whole-system speed principles, surfaces, gates, and evidence rules.
- [SEO Engine](seo-engine.md): metadata, sitemap, robots, structured data, and audits.
- [API Routes](api-routes.md): planned route handler conventions.
- [Schema](schema.md): planned validation and serialization contracts.
- [Cache](cache.md): planned explicit cache behavior and cache tags.
- [MCP Server](mcp-server.md): planned MCP resources and tools.
- [Hot API Path](hot-api-path.md): generated validators, serializers, and fast handlers.
- [Performance](performance.md): route budgets, reports, and benchmark goals.
- [Benchmarks](benchmarks.md): planned benchmark areas and evidence rules.
- [Benchmark Methodology](benchmark-methodology.md): required benchmark metadata and comparison rules.
- [Prototype Acceptance Demo](prototype-acceptance.md): demo that proves the wedge.
- [Task Backlog](task-backlog.md): first concrete implementation tasks.
- [Compatibility](compatibility.md): planned runtime and platform compatibility.
- [Deployment](deployment.md): planned adapter deployment docs.
- [Testing](testing.md): planned test categories and deterministic output expectations.
- [Security](security.md): docs-level security requirements.
- [Accessibility](accessibility.md): docs and example accessibility requirements.
- [Public Docs Readiness](public-docs.md): requirements before docs become website content.
- [Website Content Map](website-content-map.md): future public website navigation and source mapping.
- [Comparisons](comparisons.md): comparison writing principles.
- [Release Process](release.md): planned release requirements.
- [Open Source Community](open-source-community.md): community and OSS readiness notes.
- [App Graph Visual](app-graph-visual.md): planned graph and workflow diagrams.
- [Machine-Readable Documentation](machine-readable-docs.md): planned `llms.txt`, `llms-full.txt`, and `docs-index.json` outputs.
- [Maintainer Guide](maintainer-guide.md): maintainer review, merge, and release responsibilities.
- [Documentation Strategy Audit](documentation-audit.md): audit, competitor lessons, matrices, IA, and plan.
- [Documentation Improvement Matrix](documentation-matrix.md): file-by-file quality and readiness matrix.
- [Documentation Completion Audit](documentation-completion-audit.md): requirement-to-evidence map for this docs-system pass.
- [Final PR Summary Draft](final-pr-summary.md): summary template for this docs-system work.
- [Docs Maintenance Checklist](docs-maintenance-checklist.md): update triggers for future contributors.
- [Glossary](glossary.md): shared terminology.
- [AI Skill Playbooks](../skills/README.md): root-level vendor-neutral skill workflows for agents.
- [AI Subagent Roles](../subagents/README.md): root-level delegated-agent role briefs.

## Templates

- [Implementation Task Template](templates/task-template.md)
- [Architecture Decision Template](templates/adr-template.md)
- [Documentation Page Template](templates/documentation-page-template.md)
- [Prompts](prompts/README.md)

## Decision Records

- [0001: Runtime and Build Split](decisions/0001-runtime-and-build-split.md)
- [0002: Agent-Native Core](decisions/0002-agent-native-core.md)
- [0003: Risk Mitigation From Day One](decisions/0003-risk-mitigation-from-day-one.md)

## Documentation Rules

- Follow [Documentation Standard](documentation-standard.md) when adding or reorganizing docs.
- Keep `README.md` concise and user-facing.
- Keep `AGENTS.md` operational for AI agents.
- Keep deep design details in `docs/`.
- Mark planned features as planned.
- Mark implemented features as implemented only after verification.
- Update roadmap status when implementation begins or scope changes.
- Prefer examples that can later become tests.
