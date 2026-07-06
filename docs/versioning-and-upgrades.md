# Versioning And Upgrades

Status: Planned.

Audience: maintainers, framework contributors, app developers, AI agents.

This page defines how Lumina should version packages, documentation, generated manifests, public APIs, and upgrade guides once implementation begins. No package has been published yet, so this is a policy draft.

The current `0.0.0` versions in `package.json` files are private scaffold placeholder versions. Treat them as workspace metadata only, not as release versions, docs versions, API versions, or compatibility guarantees.

## Why This Exists

Framework users need to know which docs match their installed version. Agents need the same thing, especially when reading `llms.txt`, manifest schemas, or generated context. Mature docs systems keep upgrade guides, changelogs, API versions, migration notes, and compatibility evidence close to release work.

Lumina should keep those rules established before early implementation creates undocumented contracts.

Research backing:

- Next.js keeps version-specific upgrade guides.
- Vite publishes migration guides for major versions and calls out breaking changes.
- Stripe treats API versioning and changelogs as first-class developer experience.
- OpenAPI treats machine-readable contracts as source-controlled artifacts that can drive docs, tests, and tooling.

## Versioned Surfaces

| Surface | Versioning rule | Docs requirement |
| --- | --- | --- |
| Published packages | Use semantic versioning after packages are published. | Release notes and compatibility docs must name the version. |
| CLI commands | Command options, exit codes, and JSON output are public contracts once released. | Update [CLI Reference](cli.md) and [API Reference](api-reference.md). |
| Public helper APIs | Helper names, signatures, defaults, and errors are public contracts once released. | Update feature docs and API reference. |
| Config | Config fields, defaults, loading behavior, environment policy, and normalized output are public contracts once released. | Update [Config](config.md), [Configuration Contract](config-contract.md), and migration notes for changes. |
| Manifests | Every generated JSON artifact must include `schemaVersion` and `generatedBy`. | Update [Manifest Contracts](manifest-contracts.md) and machine-readable docs. |
| Agent context | Context capsule JSON must include schema versions. | Update [Agent Kernel](agent-kernel.md), [MCP Server](mcp-server.md), and [Machine-Readable Documentation](machine-readable-docs.md). |
| Docs site | Public docs should identify the product version they describe once releases exist. | Add docs-site version switcher or version labels before stable public launch. |
| Examples | Examples should name compatible Lumina versions. | Update example READMEs when examples exist. |

## Pre-1.0 Policy

Before `1.0.0`:

- APIs may change.
- Breaking changes must still be documented.
- Upgrade notes must exist for any change that affects app source, generated files, CLI output, config, adapter behavior, or agent-facing JSON.
- Deprecated names should include a replacement and removal target when practical.
- Public docs must keep using planned, scaffolded, implemented, and verified status labels.

## Stable Release Policy

After `1.0.0`:

- Patch releases should avoid breaking public APIs.
- Minor releases may add compatible APIs, commands, manifest fields, or adapters.
- Major releases may include breaking changes, but must include upgrade guides.
- Breaking changes to generated manifests require schema version changes.
- Breaking changes to CLI JSON output or exit-code meaning require schema or release notes.
- Breaking changes to config loading, env exposure, or normalized config output require migration notes.
- Agent-facing JSON changes require compatibility notes because agents and MCP clients may consume those contracts directly.

## Manifest Schema Versioning

Generated files should use explicit schema versions:

```json
{
  "schemaVersion": "lumina.routes.v0",
  "generatedBy": {
    "package": "@lumina/compiler",
    "version": "0.0.0"
  },
  "generatedAt": "2026-07-06T00:00:00.000Z",
  "routes": []
}
```

Schema version changes:

| Change | Schema version impact |
| --- | --- |
| Add optional field | Same schema version allowed if consumers can ignore it. |
| Add required field | New schema version. |
| Rename field | New schema version and migration notes. |
| Remove field | New schema version and breaking-change note. |
| Change field meaning | New schema version and compatibility note. |
| Change ordering or path normalization | New schema version if consumers observe output. |

## Documentation Versioning

Once public docs are generated, each page should expose:

- Product version or docs channel.
- Page status.
- Last reviewed date or generated timestamp when available.
- Source file path for repository docs.
- Links to upgrade guides when version-specific behavior changed.

Do not add fake version metadata before the docs site parser exists. Keep this as the target contract.

## Upgrade Guide Requirements

Every major release and every pre-1.0 breaking change should include:

- Who is affected.
- What changed.
- Why it changed.
- Exact before and after examples.
- Migration command or codemod when available.
- Manual migration steps when automation is not available.
- Generated files affected.
- Agent/MCP behavior affected.
- Tests or checks to run after upgrading.
- Known limitations.

## Changelog Requirements

Release notes should group changes by:

- New features.
- Fixes.
- Breaking changes.
- Deprecations.
- Migration notes.
- Manifest/schema changes.
- Security notes.
- Performance and benchmark notes.
- Documentation updates.

## Deprecation Policy

Deprecations should include:

- Deprecated API, command, config field, file convention, or manifest field.
- Replacement.
- First version where the deprecation appears.
- Earliest removal version.
- Diagnostic message.
- Link to migration notes.

Agents should treat deprecated surfaces as editable only when the requested task explicitly targets migration.

## Compatibility Evidence

Compatibility statements require evidence:

- Runtime compatibility needs adapter fixtures.
- React compatibility needs SSR and hydration fixtures.
- Vite/Rolldown compatibility needs build and dev fixtures.
- Node/static compatibility needs adapter-specific tests.
- Migration compatibility needs migration fixtures and reports.
- Manifest compatibility needs stable JSON tests.

The compatibility table in [Compatibility](compatibility.md) should point to evidence once tests exist.

## Machine-Readable Docs

Generated docs outputs should include version context:

- `docs-index.json` should include the docs version or channel once releases exist.
- `llms.txt` should link to current docs and upgrade guides.
- `llms-full.txt` should include version labels so agents do not mix contracts.
- Context capsules should identify their schema version and generator version.

## Out Of Scope

- Maintaining old docs versions before any package release exists.
- Promising long-term support before maintainers define a support window.
- Claiming backward compatibility for planned APIs.
- Versioning private implementation details that are not exposed through packages, commands, config, manifests, docs, or generated output.
