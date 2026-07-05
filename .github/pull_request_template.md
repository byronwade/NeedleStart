## Summary

Describe the change and why it matters.

## Type of Change

- [ ] Documentation only
- [ ] Scaffolding
- [ ] Implementation
- [ ] Tests
- [ ] Refactor
- [ ] Security
- [ ] Release or governance

## Status and Scope

- [ ] Planned behavior is clearly marked as planned.
- [ ] Implemented behavior is marked implemented only after verification.
- [ ] `docs/status.md` was updated if implementation state changed.
- [ ] Remaining scope is documented.

## Documentation Updates

- [ ] `README.md` is still accurate.
- [ ] `AGENTS.md` is still accurate.
- [ ] `docs/README.md` is still accurate.
- [ ] `docs/cli.md` was updated if commands or flags changed.
- [ ] `docs/config.md` was updated if config changed.
- [ ] `docs/routing.md` was updated if route behavior changed.
- [ ] `docs/manifest-contracts.md` was updated if generated artifacts changed.
- [ ] `docs/security.md` was updated if high-risk or secret-handling behavior changed.
- [ ] `docs/testing.md` was updated if test expectations changed.
- [ ] Not applicable.

## Generated Artifacts

- [ ] New generated files are documented.
- [ ] Generated JSON includes schema versions where relevant.
- [ ] Generated output is deterministic.
- [ ] Generated output redacts secrets.
- [ ] Production output excludes agent-only metadata.
- [ ] Not applicable.

## Tests

- [ ] Unit tests added or updated.
- [ ] Fixture tests added or updated.
- [ ] Integration tests added or updated.
- [ ] HTTP adapter tests added or updated.
- [ ] Stable JSON tests added or updated.
- [ ] Security redaction tests added or updated.
- [ ] Safe edit rejection tests added or updated.
- [ ] Tests intentionally deferred with reason below.

Reason if tests are deferred:

```txt

```

## Commands Run

```bash
# paste commands here
```

If commands could not be run, explain why:

```txt

```

## Risk Review

High-risk areas touched:

- [ ] Auth or sessions
- [ ] Billing or payments
- [ ] Cache invalidation
- [ ] Deployment adapters
- [ ] File-system write tools
- [ ] Safe edit APIs
- [ ] MCP write tools
- [ ] Environment variable handling
- [ ] Runtime request routing
- [ ] Schema validators or serializers
- [ ] Server functions
- [ ] None

Security notes:

```txt

```

## Agent Review

- [ ] Agent-facing JSON output is stable.
- [ ] MCP behavior, if changed, follows read-only or safe-edit rules.
- [ ] Safe edits, if changed, are AST-based, previewable, logged, check-backed, and reversible.
- [ ] Needle Map edges, if changed, include `kind`, `source`, `confidence`, and `why`.
- [ ] Not applicable.

## Reviewer Notes

Anything reviewers should inspect especially closely:

```txt

```
