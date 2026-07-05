---
name: Implementation task
description: Turn a roadmap/backlog item into a scoped implementation task
title: "task: "
labels: ["task"]
assignees: []
---

## Goal

One sentence describing the outcome.

## Package Scope

- `packages/<package>`

## Files to Read First

- `README.md`
- `AGENTS.md`
- `docs/status.md`
- `ARCHITECTURE.md`
- `docs/<relevant-doc>.md`

## Implementation Requirements

- Requirement 1.
- Requirement 2.
- Requirement 3.

## Scope Gate

- [ ] Does this improve Needle Map or the Agent Kernel?
- [ ] Can this be implemented with minimal production runtime code?
- [ ] Does this have a clear agent demo or fixture proof?

## Public API or CLI

```ts
example()
```

```bash
needle example
```

## Generated Artifacts

List any manifests, generated files, or reports this task adds or changes.

## Tests Required

- [ ] Unit test
- [ ] Integration test
- [ ] Fixture test
- [ ] HTTP test
- [ ] Stable JSON test
- [ ] Security redaction test
- [ ] Safe edit rejection test

## Commands to Run

```bash
bun test
bun run typecheck
```

## Definition of Done

- Concrete result.
- Concrete result.
- Concrete result.

## Out of Scope

- Thing not to build yet.

## Documentation Updates

- [ ] `README.md`
- [ ] `AGENTS.md`
- [ ] `docs/status.md`
- [ ] `docs/cli.md`
- [ ] `docs/config.md`
- [ ] `docs/routing.md`
- [ ] `docs/manifest-contracts.md`
- [ ] `docs/security.md`
- [ ] `docs/testing.md`
- [ ] Other:
