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
6. Regenerate affected graph slices.
7. Run affected checks.
8. Apply only after checks pass or explicit override is present.
9. Append a mutation log.
10. Support undo.

## Safety Rules

- No string replacement for safe edits.
- High-risk edits require explicit human sign-off in production workflows.
- MCP write tools must use the same transaction path as CLI writes.
- Mutation logs must be append-only.

## Reference

- [Safe Edit Transactions](../../safe-edit-transactions.md)
- [Agent-Native Development](agent-native.md)
- [Security](../../security.md)

