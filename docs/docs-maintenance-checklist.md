# Documentation Maintenance Checklist

Use this checklist before merging documentation, package, command, architecture, safety, or release changes.

Also apply `docs/docs-freshness-policy.md` for any change that can make docs stale.

## Always Check

- `README.md` still describes current status honestly.
- `AGENTS.md` still gives correct agent workflow and safety rules.
- `docs/status.md` matches the real project phase.
- `docs/README.md` links to any new durable docs.
- `.github/PULL_REQUEST_TEMPLATE.md` still reflects the required review gates.
- `docs/docs-freshness-policy.md` still reflects current docs freshness rules.
- Planned, scaffolded, implemented, and verified behavior are clearly separated.
- New examples are either verified or clearly marked as planned.

## Update README When

- Public positioning changes.
- Setup commands change.
- Package structure changes.
- Prototype status changes.
- A user-facing feature becomes real.
- A planned feature is removed, renamed, or significantly rescoped.

## Update AGENTS When

- Commands change.
- Safety rules change.
- Generated-file rules change.
- Package ownership or edit boundaries change.
- Agent workflow changes.
- New high-risk areas are introduced.

## Update Status, Roadmap, And Backlog When

- A phase starts, completes, or changes scope.
- A package is added or removed.
- A new command is added.
- A feature moves from planned to scaffolded, implemented, or verified.
- A risk changes priority.

## Update Reference Docs When

- CLI syntax changes: update `docs/cli.md`.
- Config fields change: update `docs/config.md`.
- File conventions change: update `docs/file-conventions.md` and `docs/routing.md`.
- Generated files change: update `docs/manifest-contracts.md`.
- Public helpers change: update `docs/api-reference.md`.
- Agent JSON changes: update `docs/agent-kernel.md` and `docs/mcp-server.md`.

## Update Public Website Docs When

- A page should become user-facing website content.
- Product positioning changes.
- Comparisons change.
- Examples are added.
- Launch or migration messaging changes.
- Public content in `docs/public/` changes or needs a new page.

## Update Machine-Readable Docs When

- Agent-facing JSON changes.
- `llms.txt`, `llms-full.txt`, or `docs-index.json` behavior changes.
- New docs status labels or audience labels are introduced.
- Generated context capsules change.

## Update Benchmarks When

- A performance claim is added.
- A benchmark fixture changes.
- Hardware, runtime version, dependency version, or methodology changes.
- Raw benchmark data changes.

## Update Speed Strategy When

- Compiler work changes build-time or incremental behavior.
- Runtime or adapter work adds request-path overhead.
- Route modes, hot APIs, cache behavior, or generated manifests change.
- Agent-facing JSON grows or changes shape.
- New performance budgets or benchmark fixtures are introduced.
- Public speed positioning changes.

## Update Security Docs When

- A high-risk area is implemented.
- MCP write tools are added.
- Safe edit behavior changes.
- Runtime request routing changes.
- Environment variable behavior changes.
- A vulnerability report is received.

## Use Templates When

- Adding an implementation task: start from `docs/templates/task-template.md`.
- Adding an architecture decision: start from `docs/templates/adr-template.md`.
- Adding a documentation page: start from `docs/templates/documentation-page-template.md`.
