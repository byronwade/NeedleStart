# Release Process

Status: Planned.

Audience: maintainers, release reviewers, open source program reviewers.

No packages have been released yet. This page defines the future release process.

## Planned Release Requirements

- All required checks pass.
- README and AGENTS are accurate.
- Status and roadmap are updated.
- Breaking changes are documented.
- Security notes are reviewed.
- Benchmarks are updated when performance claims change.
- Migration notes are included when behavior changes.
- Versioned surfaces and schema changes are documented.

## Versioning

NeedleStart should use semantic versioning once packages are published.

See [Versioning And Upgrades](versioning-and-upgrades.md) for package, docs, manifest, API, deprecation, and upgrade-guide policy.

## Release Types

Planned release types:

- `0.x` prototype releases: APIs may change, but changes must be documented.
- Patch releases: bug fixes and docs corrections.
- Minor releases: new features or compatible API additions.
- Major releases: breaking changes after stable releases exist.

## Release Notes Structure

Future release notes should include:

- Summary.
- New features.
- Fixes.
- Breaking changes.
- Migration notes.
- Manifest or schema version changes.
- Deprecations.
- Security notes.
- Benchmark notes when performance claims changed.
- Docs updates.
- Contributors.

## Release Gate

Do not release if:

- Status docs contradict code.
- Generated artifacts changed without reference docs.
- Benchmark claims lack raw data and methodology.
- Security-sensitive behavior changed without security review.
- Agent-facing JSON changed without schema or docs updates.

## Post-Release

After release:

- Tag the release.
- Publish release notes.
- Update docs status where needed.
- Record follow-up tasks.
- Confirm install and quick-start commands still work.
