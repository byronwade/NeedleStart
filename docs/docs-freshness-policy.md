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
| New command | `README.md`, `AGENTS.md`, `docs/cli.md`, `docs/api-reference.md` |
| New generated artifact | `AGENTS.md`, `docs/manifest-contracts.md`, `docs/machine-readable-docs.md` when agent-facing |
| Phase/status change | `README.md`, `docs/status.md`, `docs/roadmap.md`, `docs/task-backlog.md` |
| Public API change | `docs/api-reference.md`, feature guide, examples, tests |
| Public website content change | `docs/public/`, `docs/public-docs.md`, `docs/website-content-map.md`, `README.md` when prominent |
| Routing or file convention change | `docs/routing.md`, `docs/file-conventions.md`, `docs/compiler-ir.md` |
| Runtime or adapter change | `docs/runtime-contract.md`, `docs/adapters.md`, `docs/deployment.md`, `docs/speed-strategy.md` |
| Performance claim | `docs/performance.md`, `docs/benchmarks.md`, `docs/benchmark-methodology.md`, raw results |
| Security-sensitive change | `SECURITY.md`, `docs/security.md`, relevant feature docs |
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
8. Update `docs/documentation-matrix.md` when quality or readiness changes.

## AI-Agent Rule

AI agents must not finish a task that changes setup, commands, architecture, safety, package boundaries, generated files, public APIs, benchmark claims, or release status without checking this policy and `docs/docs-maintenance-checklist.md`.

## Out Of Scope

- Pretending docs are fresh because no one noticed drift.
- Deferring docs updates for implemented behavior unless the PR explicitly marks a follow-up blocker.
- Making public claims that are not backed by implementation, tests, or raw evidence.
