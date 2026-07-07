# Testing

Status: Planned.

Audience: app developers, contributors, AI agents.

Lumina testing is planned around deterministic fixtures, stable JSON snapshots, HTTP adapter checks, browser checks for user-visible behavior, and explicit evidence reporting. Initial scaffold checks, route-discovery fixture tests, dev-server HTTP tests, static adapter HTTP tests, and the first browser hydration smoke check exist; broader feature-specific test tooling is still planned.

## Scaffold Commands

```bash
bun test
bun run typecheck
bun run docs:check
bun run test:browser
bun run structure:check
bun run performance:check
bun run check
```

These commands are verified for the Phase 1 scaffold, route discovery, explicit static/SSR render-mode extraction, route/render/map artifact generation, direct local import map edges, dev and production hydration bundle output, browser-verified interactive dev and production hydration, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina map affected --json`, static build/start, the early benchmark/status skeleton, and route-discovery benchmark JSON metadata. They prove scaffold integrity, documentation links and guardrails, package structure, performance documentation hygiene, TypeScript validity, scaffold tests, shared core model tests, route-discovery fixture behavior, `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/client/*.js`, `dist/public/_lumina/client/*.js`, `.lumina/build-trace.json`, `.lumina/perf.report.json`, deployment manifest copies, JSON-only CLI output, stable route explanation output, minimal map affected output, static built-output HTTP serving, browser hydration of the root-route counter in dev and built output, benchmark skeleton path/status coverage including `lumina bench <name> --json`, and `lumina bench route-discovery --json --run`. They do not prove persisted benchmark result files, SSR/API runtime adapter behavior, broader Lumina Map query modes, MCP tools, or safe edits.

## Future Target Commands

```bash
bun run test:fixtures
bun run test:http
```

`bun run test:browser` is implemented for the first root-route hydration smoke check in dev and built output. Fixture and broader HTTP/browser commands remain target commands until implementation lands.

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
