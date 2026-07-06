# Governance

NeedleStart is intended to be a fully open source project with transparent planning, public contribution paths, and clear maintainer accountability.

This governance model is intentionally lightweight during Phase 0. It should evolve as the contributor base grows.

## Project Values

NeedleStart prioritizes:

- App-graph-native architecture.
- Honest planned-vs-implemented status.
- Public docs and reproducible benchmarks that do not overclaim.
- Stable machine-readable contracts for humans, tools, and AI agents.
- Safe edit workflows with real checks and rollback.
- Open source community participation.
- Sustainable maintainer practices.

## Maintainer Responsibilities

Maintainers are responsible for:

- Reviewing pull requests.
- Keeping project status accurate.
- Enforcing the Code of Conduct.
- Protecting security-sensitive disclosures.
- Making release decisions.
- Keeping roadmap priorities aligned with the product strategy.
- Ensuring benchmark claims have raw data and methodology.
- Keeping public docs honest about planned versus implemented behavior.

## Contributor Responsibilities

Contributors are expected to:

- Follow `CODE_OF_CONDUCT.md`.
- Read `README.md`, `AGENTS.md`, and relevant docs before making changes.
- Keep changes scoped.
- Add tests when implementing behavior.
- Avoid claiming planned behavior is implemented.
- Update docs when commands, generated files, package boundaries, security rules, or public positioning change.
- Explain tradeoffs clearly.

## Decision Process

Small changes can be handled through pull request review.

Significant changes should use an ADR or strategy document update, especially when they affect:

- Public API.
- CLI commands.
- Package boundaries.
- Generated manifests.
- Runtime adapters.
- Safe edit rules.
- MCP tools.
- Benchmark methodology.
- Public positioning.
- Release policy.

Decision records live in:

```txt
docs/decisions/
```

## Roadmap Process

The roadmap is public and lives in `docs/roadmap.md`.

The current implementation truth table lives in `docs/status.md`.

The task backlog lives in `docs/task-backlog.md`.

Maintainers should update these documents when work starts, scope changes, features are deferred, or commands become verified.

## Community Process

NeedleStart should support community growth through:

- Clear issue templates.
- Good first issues once packages exist.
- Public roadmap discussions.
- Transparent release notes.
- Contributor-friendly examples.
- Public docs that explain planned versus implemented behavior.
- Respectful comparison docs and benchmarks.

## Open Source Program Readiness

NeedleStart aims to be eligible for open source support programs by keeping:

- A permissive license.
- Active public development.
- A Code of Conduct.
- Public contribution guidelines.
- Security reporting guidance.
- Public roadmap and status docs.
- Clear community impact metrics.
- Open source infrastructure usage policies.

Specific readiness notes for Vercel's Open Source Program are documented in `docs/open-source-community.md`.

## Review and Update Cadence

Review this governance file when:

- The first packages are scaffolded.
- The first external contributor opens a pull request.
- A public community space is created.
- A release process is activated.
- The project applies for an open source support program.
- Maintainer roles change.
