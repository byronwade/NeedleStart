# Operating Cadence

Status: Planned.

Audience: maintainers, contributors, AI agents.

This document defines the planned rhythm for keeping NeedleStart disciplined as implementation starts. The project is in Phase 1 scaffold, so these are operating targets rather than active release ceremonies.

## Weekly Or Active-Development Cadence

When the project is under active implementation:

- Review open tasks against `docs/task-backlog.md`.
- Confirm `docs/status.md` still reflects reality.
- Review high-risk work for security, runtime, MCP, safe edit, or adapter implications.
- Keep PRs small enough to review.
- Record architecture decisions when direction changes.
- Update docs in the same change as behavior.

## Phase Boundary Review

At the start or end of each phase:

- Update `docs/status.md`.
- Update `docs/roadmap.md`.
- Update `docs/task-backlog.md`.
- Recheck `docs/package-map.md`.
- Recheck `docs/speed-strategy.md`.
- Recheck `docs/docs-freshness-policy.md`.
- Run the repository link check.
- Document checks that cannot run yet.

## Release Readiness Review

Before any release:

- Apply `docs/maintainer-guide.md`.
- Apply `docs/release.md`.
- Apply `SECURITY.md`.
- Apply `docs/benchmark-methodology.md` if performance is mentioned.
- Confirm public docs do not overclaim implementation.
- Confirm examples and quick-start commands are verified.

## AI-Agent Work Cadence

For AI-assisted work:

1. Read `AGENTS.md`.
2. Read relevant docs.
3. Identify required docs updates before editing.
4. Make scoped changes.
5. Run available checks.
6. State unavailable checks.
7. Update docs freshness and completion evidence when relevant.

## Out Of Scope

- Heavy ceremony before the project has implementation work.
- Release rituals without packages.
- Process that replaces technical review.

