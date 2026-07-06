# Documentation Freshness Policy

Status: Planned.

Audience: maintainers, contributors, AI agents.

NeedleStart documentation must stay accurate as the framework changes. Docs freshness is a release requirement, not a cleanup task.

## Freshness Standard

A document is fresh when it:

- Describes current repository status honestly.
- Separates planned, scaffolded, implemented, and verified behavior.
- Links to the current source of truth for deeper detail.
- Names commands, packages, generated files, and JSON fields accurately.
- Has examples that are verified or clearly marked as planned.
- Includes verification requirements for implemented behavior.
- Does not contain stale benchmark, security, compatibility, or release claims.

## What Counts As Stale

Docs are stale when:

- A command changes but CLI docs, README, AGENTS, or task docs do not.
- A package is added, removed, renamed, or moved without updating package docs.
- Generated files change without updating manifest docs.
- A feature moves from planned to scaffolded, implemented, or verified without updating status docs.
- A benchmark claim exists without current raw data and methodology.
- A security-sensitive area changes without security docs and review notes.
- Agent-facing JSON changes without updating Agent Kernel, MCP, or machine-readable docs.
- Public website navigation no longer matches the docs hub.

## Required Update Triggers

| Change | Docs that must be checked |
| --- | --- |
| Setup command changes | `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `docs/status.md` |
| New package | `README.md`, `AGENTS.md`, `docs/package-map.md`, `docs/phase-1-build-plan.md` when relevant |
| New command | `README.md`, `AGENTS.md`, `docs/cli.md`, `docs/cli-json-contract.md`, `docs/api-reference.md` |
| New generated artifact | `AGENTS.md`, `docs/manifest-contracts.md`, `docs/machine-readable-docs.md` when agent-facing |
| Manifest schema change | `docs/manifest-contracts.md`, `docs/versioning-and-upgrades.md`, `docs/machine-readable-docs.md`, affected reference docs |
| Diagnostic shape or code change | `docs/diagnostics-contract.md`, `docs/cli-json-contract.md`, `docs/manifest-contracts.md`, affected feature contracts, public diagnostics reference |
| Phase/status change | `README.md`, `docs/status.md`, `docs/roadmap.md`, `docs/task-backlog.md` |
| Public API change | `docs/api-reference.md`, feature guide, examples, tests |
| Example, starter template, fixture, or create-command flow change | `docs/examples.md`, `docs/examples-contract.md`, `docs/getting-started.md`, `docs/public/guides/create-app.md`, `docs/public/reference/examples.md`, `docs/testing-contract.md` |
| Public API, config, or CLI breaking change | `docs/versioning-and-upgrades.md`, `docs/release.md`, `docs/cli-json-contract.md`, `docs/config-contract.md`, `docs/api-reference.md`, affected guide/reference docs |
| Test command, fixture, snapshot, or CI behavior change | `docs/testing.md`, `docs/testing-contract.md`, `docs/docs-verification.md`, `docs/product-build-readiness.md`, affected feature contracts |
| Config loading or environment behavior change | `docs/config.md`, `docs/config-contract.md`, `docs/security.md`, `docs/manifest-contracts.md`, affected runtime or adapter docs |
| Adapter, deployment output, or compatibility behavior change | `docs/adapters.md`, `docs/adapter-contract.md`, `docs/deployment.md`, `docs/compatibility.md`, `docs/runtime-contract.md`, `docs/manifest-contracts.md`, public adapter reference |
| Public website content change | `docs/public/`, `docs/public-docs.md`, `docs/public-docs-site-architecture.md`, `docs/website-content-map.md`, `README.md` when prominent |
| Public docs metadata, route, or navigation change | `docs/public-docs-site-architecture.md`, `docs/website-content-map.md`, `docs/public/README.md`, `docs/machine-readable-docs.md` |
| Documentation verification change | `docs/docs-verification.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `AGENTS.md`, `docs/docs-maintenance-checklist.md` |
| Routing or file convention change | `docs/routing.md`, `docs/routing-contract.md`, `docs/file-conventions.md`, `docs/compiler-ir.md`, `docs/manifest-contracts.md`, public reference docs |
| API route behavior change | `docs/api-routes.md`, `docs/api-route-contract.md`, `docs/schema.md`, `docs/hot-api-path.md`, `docs/runtime-contract.md`, `docs/security.md`, `docs/manifest-contracts.md`, public API route reference |
| Schema behavior change | `docs/schema.md`, `docs/schema-contract.md`, `docs/api-route-contract.md`, `docs/hot-api-path.md`, `docs/manifest-contracts.md`, `docs/api-reference.md`, public schema reference |
| Cache behavior change | `docs/cache.md`, `docs/cache-contract.md`, `docs/runtime-contract.md`, `docs/speed-strategy.md`, `docs/api-route-contract.md`, `docs/hot-api-path.md`, `docs/manifest-contracts.md`, `docs/security.md`, public cache reference |
| SEO behavior change | `docs/seo-engine.md`, `docs/seo-contract.md`, `docs/api-reference.md`, `docs/manifest-contracts.md`, `docs/runtime-contract.md`, `docs/cache-contract.md`, public SEO reference |
| Accessibility behavior, diagnostics, browser evidence, docs UI, or framework-owned HTML change | `docs/accessibility.md`, `docs/accessibility-contract.md`, `docs/testing-contract.md`, `docs/seo-contract.md`, public accessibility reference |
| Runtime or adapter change | `docs/runtime-contract.md`, `docs/adapters.md`, `docs/deployment.md`, `docs/speed-strategy.md` |
| Compatibility claim | `docs/compatibility.md`, `docs/versioning-and-upgrades.md`, test or fixture evidence |
| Performance claim | `docs/performance.md`, `docs/performance-contract.md`, `docs/benchmarks.md`, `docs/benchmark-methodology.md`, raw results |
| Route budget, performance diagnostic, perf report, Core Web Vitals language, or benchmark evidence change | `docs/performance.md`, `docs/performance-contract.md`, `docs/testing-contract.md`, `docs/manifest-contracts.md`, public performance reference |
| Rendering default, build pipeline, runtime speed path, React Compiler, React streaming, resource hint, fetch priority, 103 Early Hints, speculation, bfcache, image/font delivery, compression, hot API, cache strategy, compiler scaling, or benchmark-positioning decision change | `docs/speed-decisions.md`, `docs/speed-capability-audit.md`, `docs/speed-strategy.md`, `docs/performance-contract.md`, `docs/benchmark-methodology.md`, `docs/product-build-readiness.md` |
| Security-sensitive change | `SECURITY.md`, `docs/security.md`, `docs/security-contract.md`, `docs/testing-contract.md`, relevant feature docs |
| Agent or MCP behavior change | `AGENTS.md`, `docs/agent-kernel.md`, `docs/mcp-server.md`, `docs/safe-edit-transactions.md`, `docs/machine-readable-docs.md` |

## Pull Request Requirement

Every pull request must answer:

1. Which docs were checked?
2. Which docs were updated?
3. Which docs were intentionally not changed, and why?
4. Which commands or checks prove the docs are still accurate?

The PR template enforces this through `.github/PULL_REQUEST_TEMPLATE.md`.

## Periodic Freshness Audit

Before each release, and at least once per implementation phase:

1. Read `docs/status.md`.
2. Compare package structure against `docs/package-map.md`.
3. Compare commands against `docs/cli.md`.
4. Compare generated files against `docs/manifest-contracts.md`.
5. Compare roadmap status against `docs/task-backlog.md`.
6. Run the local Markdown link check.
7. Search for unsupported claims such as "works", "implemented", "verified", "fastest", or "secure".
8. Apply `docs/docs-verification.md`.
9. Update `docs/documentation-matrix.md` when quality or readiness changes.

## AI-Agent Rule

AI agents must not finish a task that changes setup, commands, architecture, safety, package boundaries, generated files, public APIs, benchmark claims, or release status without checking this policy and `docs/docs-maintenance-checklist.md`.

## Out Of Scope

- Pretending docs are fresh because no one noticed drift.
- Deferring docs updates for implemented behavior unless the PR explicitly marks a follow-up blocker.
- Making public claims that are not backed by implementation, tests, or raw evidence.
