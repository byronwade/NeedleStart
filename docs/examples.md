# Examples

Status: Planned.

Audience: app developers, framework contributors, AI agents.

Examples should become the fastest way to understand NeedleStart behavior once implementation exists.

The detailed requirements for examples, templates, verification evidence, and create-command integration are defined in [Examples And Templates Contract](examples-contract.md).

## Planned Examples

The planned official inventory is canonical in [Examples Catalog](examples-catalog.md). Current planned paths are:

- `examples/basic/`
- `examples/blog-seo/`
- `examples/api-route/`
- `examples/hot-api/`
- `examples/static-export/`
- `examples/adapter-node/`
- `examples/dashboard-client/`
- `examples/ecommerce/`
- `examples/agent-demo/`
- `examples/docs-site/`
- `playgrounds/large-app-fixture/`

These directories do not exist yet. Do not describe them as scaffolded, runnable, or verified until files, commands, tests, generated artifacts, and status labels exist.

## Example Requirements

- Clear purpose.
- Commands to run.
- Expected output.
- Generated files.
- Tests.
- Agent notes when relevant.

## Example Status Labels

Use these labels:

- Planned: example is a target.
- Scaffolded: files exist, behavior incomplete.
- Runnable: commands start, but full evidence is incomplete.
- Verified: commands, tests, generated artifacts, and docs claims pass.
- Deprecated: retained for migration or compatibility notes.

## Minimum Example README

Every example should eventually include:

- What it demonstrates.
- Status label.
- Compatible NeedleStart version or workspace commit.
- Commands to run.
- Expected pages or endpoints.
- Generated `.needle/*` artifacts.
- Tests to run.
- Known limitations.
- Agent workflow notes when relevant.

Do not link an example from public onboarding as verified until the example meets [Examples And Templates Contract](examples-contract.md).

## Agent Demo Requirements

The `agent-demo` example should eventually prove:

- Route context inspection.
- Needle Map affected query.
- Safe metadata edit dry run.
- Safe metadata edit apply.
- Affected checks.
- Mutation log.
- Undo.
