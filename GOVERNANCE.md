# Governance

Status: Planned.

Audience: maintainers, contributors, open source program reviewers, AI agents.

Lumina is currently in Phase 1: monorepo scaffold. Governance is intentionally lightweight until the project has package releases, regular contributors, and release activity.

MVP Alpha scope is governed by `docs/mvp-alpha-scope.md`. Maintainers should require a same-change scope update before accepting API routes, MCP, safe edits, migration tooling, benchmark claims, or other post-MVP work into the first prototype lane.

## Current Decision Model

- Human maintainers are accountable for product direction, implementation, release decisions, and security decisions.
- AI agents may propose and edit docs or code, but AI-assisted work must meet the same review, test, and documentation standards as human-authored work.
- Architecture decisions with long-term consequences should be recorded under `docs/decisions/`.

## Maintainer Responsibilities

Maintainers are responsible for:

- Upholding `docs/engineering-standards.md`.
- Keeping planned and implemented behavior separate.
- Protecting the app-graph-native, SEO-first, agent-safe product direction.
- Protecting MVP Alpha scope discipline until the first route, render, map, inspection, and demo workflow is verified.
- Reviewing changes to high-risk areas.
- Requiring evidence for benchmark, performance, security, and compatibility claims.
- Keeping governance, security, release, roadmap, and contribution docs current.

## Area Ownership

Planned ownership areas:

| Area | Scope | Required docs |
| --- | --- | --- |
| Docs and community | README, docs hub, public docs, contributor docs | `docs/documentation-standard.md`, `CONTRIBUTING.md` |
| Compiler and map | IR, manifests, graph extraction, affected queries | `docs/compiler-ir.md`, `docs/lumina-map.md` |
| Runtime and SEO | render modes, adapters, SEO output, performance | `docs/runtime-contract.md`, `docs/seo-engine.md` |
| Agent safety | Agent Kernel, MCP, safe edits, machine-readable docs | `docs/agent-kernel.md`, `docs/mcp-server.md`, `docs/safe-edit-transactions.md` |
| Verification | tests, benchmarks, release readiness | `docs/testing.md`, `docs/benchmark-methodology.md`, `docs/release.md` |

Area ownership does not exist as formal authority yet. It is a planning model for future maintainers and reviewers.

## Contributor Path

Planned contributor progression:

1. Documentation or small bug-fix contributor.
2. Repeated contributor with consistent test and docs hygiene.
3. Area reviewer for docs, compiler/map, runtime/SEO, agent safety, or verification.
4. Maintainer with merge authority.

Commit and release authority should be granted only after sustained, reviewable contributions.

## Review Expectations

- Reviews should apply `docs/engineering-standards.md`.
- Active implementation should follow the cadence in `docs/operating-cadence.md`.
- Documentation-only changes must pass link checks and status-honesty review.
- Feature changes must include tests or state why tests cannot run.
- High-risk changes require reviewer attention from the relevant area.
- Benchmark changes require methodology and raw data review.
- Agent or MCP write behavior requires safe edit transaction review.

## Conflict Resolution

When contributors disagree:

1. Restate the technical decision and affected users.
2. Identify which docs define the current policy.
3. If no policy exists, write an ADR or update governance docs.
4. Prefer the option that preserves project status honesty, safety, determinism, and scope discipline.
5. Maintainers make the final call until a broader governance model exists.

## Decision Records

Use `docs/templates/adr-template.md` for decisions that affect:

- Runtime or adapter architecture.
- Compiler IR and manifest contracts.
- Lumina Map graph semantics.
- Safe edit behavior.
- MCP write tools.
- Public API shape.
- Release or governance policy.
