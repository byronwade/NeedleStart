# Testing

Status: Planned.

Audience: app developers, contributors, AI agents.

NeedleStart testing is planned around deterministic fixtures, stable JSON snapshots, HTTP adapter checks, browser checks for user-visible behavior, and explicit evidence reporting. Test tooling is not implemented yet.

## Planned Commands

```bash
bun test
bun run typecheck
bun run test:fixtures
bun run test:http
bun run test:browser
bun run docs:check
```

These commands are target commands, not verified commands.

## Planned Test Layers

- Unit tests.
- Fixture tests.
- Snapshot tests.
- Integration tests.
- HTTP tests.
- Browser tests.
- Security tests.
- Performance tests only when benchmark methodology applies.

## Rules

- Generated JSON snapshots must be deterministic.
- Fixture output must avoid absolute local paths and machine-specific data.
- Snapshot updates must be explicit and reviewed.
- External network calls are not allowed by default.
- Browser tests should cover real user-visible behavior, not component internals.

## Source

- [Testing Contract](../../testing-contract.md)
- [Testing Overview](../../testing.md)
- [Documentation Verification](../../docs-verification.md)
