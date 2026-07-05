# Contributing to NeedleStart

NeedleStart is currently in planning and constitution mode. The first contributor responsibility is to keep the product direction, architecture, implementation contracts, and task sequence coherent.

We welcome contributions from both humans and AI agents.

## Areas Where Help Is Especially Needed

- Compiler internals and graph algorithms.
- Vite plugin and virtual modules.
- Runtime adapter details.
- MCP tool implementations.
- Documentation and examples.
- Testing and benchmarks.
- Security review for safe edits, MCP, manifests, and adapter output.

## Development Principles

- Keep runtime adapter code small.
- Put framework intelligence in the compiler.
- Make public behavior visible through manifests.
- Make agent-facing output stable, compact, schema-versioned, and documented.
- Prefer explicit cache rules over implicit behavior.
- Prefer deterministic generated output.
- Keep planned features separate from implemented features.
- Keep user app code portable across Bun, Node, and static output where possible.
- Do not expose secrets in manifests, logs, MCP responses, or agent context.

## Planned Setup

These commands are planned once the monorepo is scaffolded:

```bash
bun install
bun test
bun run typecheck
```

Do not claim these commands pass until package scaffolding exists.

## Contribution Flow

1. Read `README.md`.
2. Read `AGENTS.md`.
3. Read `docs/status.md`.
4. Read the relevant contract document in `docs/`.
5. Create or update a task using `docs/templates/task-template.md`.
6. Implement the smallest complete slice.
7. Add or update tests.
8. Update README, AGENTS, status, and relevant docs when setup, commands, generated artifacts, package structure, security rules, or project behavior changes.
9. Run checks.
10. Document remaining scope clearly.

For larger changes, open a discussion or design note first.

## Key Contract Docs

Read the docs that match your area:

| Area | Read first |
| --- | --- |
| Commands | `docs/cli.md` |
| Config | `docs/config.md` |
| Routing | `docs/routing.md` |
| Generated output | `docs/manifest-contracts.md` |
| Runtime/adapters | `docs/runtime-contract.md`, `docs/adapters.md`, `docs/deployment.md` |
| SEO | `docs/seo-engine.md` |
| API routes | `docs/api-routes.md`, `docs/schema.md`, `docs/hot-api-path.md` |
| Cache | `docs/cache.md` |
| Needle Map | `docs/needle-map.md`, `docs/risk-mitigation.md` |
| Agent/MCP/safe edits | `docs/agent-kernel.md`, `docs/mcp-server.md`, `docs/safe-edit-transactions.md`, `docs/security.md` |
| Tests | `docs/testing.md` |

## AI Agents

AI agents should follow `AGENTS.md` and use the structured task prompt template when creating work. Agents must keep README, AGENTS, status, and relevant docs accurate when setup, commands, architecture, safety rules, generated artifacts, or implementation state change.

AI-assisted contributions require the same review standard as human-authored code. Human maintainers remain accountable for merging and releasing changes.

## Code of Conduct

Be respectful. Focus on technical substance. The project values clarity, determinism, and dogfooding Needle Map and agent tools.

## Documentation Requirements

Every stable feature should eventually include:

- Overview.
- Public API example.
- Compiler behavior.
- Runtime or adapter behavior.
- CLI behavior.
- Manifest output when relevant.
- Agent notes when relevant.
- Security notes when relevant.
- Tests required.
- Common pitfalls.
- Out of scope.

## Testing Requirements

Use the test type that matches the behavior:

- Unit tests for pure compiler and parser logic.
- Fixture tests for app discovery.
- Integration tests for CLI flows.
- HTTP tests for runtime adapter behavior.
- Stable JSON tests for agent, SEO, map, manifest, and diagnostic output.
- Security redaction tests for config, manifests, MCP, logs, and agent context.
- Safe edit rejection tests as well as success tests.
- Benchmarks only when performance claims are introduced.

## Pull Request Checklist

- `README.md` is still accurate.
- `AGENTS.md` is still accurate.
- `docs/status.md` reflects any state change.
- The feature is either implemented or clearly marked as planned.
- New commands are documented in `docs/cli.md`.
- New generated files are documented in `docs/manifest-contracts.md`.
- New config fields are documented in `docs/config.md`.
- Tests are added or a clear reason is given.
- Agent-facing JSON output is stable.
- Secrets are not exposed in generated output.
- High-risk areas are called out.

## Out of Scope for Early Prototype

- Full custom bundler.
- Default React Server Components model.
- Edge runtime from day one.
- Visual editor.
- Database ORM.
- CMS product.
- Plugin marketplace.
- Enterprise cloud dashboard.
