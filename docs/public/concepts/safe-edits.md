# Safe Edits

Status: Planned.

Audience: AI agents, maintainers, app developers.

Safe edits are planned guardrails for automated changes. The first safe edit path should be low risk: route metadata.

## Planned Transaction Flow

1. Validate the target exists.
2. Validate the field is editable.
3. Check risk tier.
4. Produce a dry-run diff.
5. Apply the patch in memory using AST.
6. Format changed files.
7. Regenerate affected graph slices.
8. Run affected checks.
9. Apply only after checks pass or explicit override is present.
10. Append a mutation log.
11. Support undo.

## Planned Transaction Result

Safe edit results should expose:

- mutation ID
- risk tier
- affected files
- affected routes
- checks
- rollback availability

## Safety Rules

- No string replacement for safe edits.
- High-risk edits require explicit human sign-off in production workflows.
- MCP write tools must use the same transaction path as CLI writes.
- Mutation logs in `.needle/mutations.json` must be append-only.

## Source

- [Safe Edit Transactions](../../safe-edit-transactions.md)
- [Agent-Safe Workflows](agent-native.md)
- [Security](../../security.md)

