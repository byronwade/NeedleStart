# Multi-App Workspace Example

Status: Scaffolded.

This example gives Lumina a deterministic multi-app workspace shape for future workspace graph,
shared-file identity, affected build, and split-app work. Workspace graph behavior is not
implemented yet.

## Apps

- `apps/marketing` with route `/`
- `apps/docs` with route `/`

## Current Verification

Current compiler verification runs against each app root independently:

```bash
bun run lumina -- routes examples/multi-app-workspace/apps/marketing --json
bun run lumina -- routes examples/multi-app-workspace/apps/docs --json
```

## Known Limitations

- `lumina.workspace.ts` is a source fixture only.
- Workspace graph commands remain planned.
- Shared package consumers are not analyzed yet.
