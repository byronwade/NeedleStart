# Compatibility Policy

NeedleStart compatibility behavior is planned. This document defines how the project should think about supported runtimes, package versions, generated apps, manifests, adapters, and deprecations.

No compatibility promise is active until packages exist and `docs/status.md` marks behavior implemented or verified.

## Goals

- Make support expectations explicit before launch.
- Keep Bun as the speed default without trapping users in Bun-only app code.
- Keep Node and static adapter compatibility honest.
- Treat generated manifests and CLI JSON as public contracts once released.
- Avoid silent breaking changes in generated apps.

## Compatibility Surfaces

NeedleStart has several compatibility surfaces:

- CLI commands and flags.
- `needle.config.ts` fields.
- File-based routing conventions.
- Public helper APIs such as `defineMeta()`, `staticPage()`, and `apiHot()`.
- Schema DSL.
- Generated manifest schemas.
- MCP tools and resources.
- Safe edit transaction shape.
- Generated app templates.
- Runtime adapter behavior.
- Example app expectations.

## Runtime Compatibility

Planned runtime posture:

| Runtime or output | Position |
| --- | --- |
| Bun | Default and fastest intended path. |
| Node | Compatibility path, planned early. |
| Static output | Compatibility path for fully static route sets. |
| Edge runtime | Deferred. |
| Browser support | Determined by generated client output and Vite targets later. |

User application code should not require Bun-only APIs. Bun-specific behavior belongs inside `@needle/adapter-bun`.

## Version Support

Exact supported versions should be added once implementation begins.

Planned matrix:

| Dependency | Minimum | Tested | Notes |
| --- | --- | --- | --- |
| Bun | TBD | TBD | Default local and Bun adapter path. |
| Node | TBD | TBD | Node adapter path. |
| React | TBD | TBD | SSR and hydration support. |
| Vite | TBD | TBD | Frontend build foundation. |
| TypeScript | TBD | TBD | Compiler and app typing. |

Do not fill this table with guesses. Update only after implementation and CI verify versions.

## Manifest Compatibility

Generated manifests become public contracts once released.

Rules:

- Every manifest includes `schemaVersion`.
- Consumers should tolerate unknown optional fields.
- Removing, renaming, or changing a field meaning requires a major schema version change.
- Release notes must mention manifest schema changes.
- MCP and CLI JSON consumers should rely on fields and diagnostic codes, not human message text.

## CLI Compatibility

Stable CLI behavior includes:

- Command names.
- Flags.
- Exit codes.
- JSON envelope fields.
- Diagnostic codes.

Pre-`1.0.0`, commands may change, but changes must be reflected in:

- `docs/cli.md`
- `docs/status.md`
- README when user-facing
- release notes once releases exist

## Config Compatibility

Config fields are part of the public API.

Rules:

- New optional config fields are allowed.
- Renames require deprecation notes.
- Removed fields require migration guidance.
- Unsafe defaults must not be introduced silently.
- Secret-handling behavior must be conservative.

## Adapter Compatibility

Adapters must publish capabilities through `adapter.manifest.json`.

Rules:

- Unsupported behavior should fail clearly.
- Node adapter should not claim Bun-only features.
- Static adapter should reject unsupported dynamic runtime routes.
- Adapter capability changes should be documented in release notes.

## Generated App Compatibility

Generated apps should remain understandable across versions.

Rules:

- Template scripts should align with `docs/cli.md`.
- Generated config should align with `docs/config.md`.
- Generated `AGENTS.md` should align with current agent rules.
- Breaking template changes need migration notes.

## Deprecation Policy

For public surfaces:

1. Mark deprecated in docs.
2. Emit diagnostic where practical.
3. Provide migration guidance.
4. Keep compatibility through at least one prerelease cycle when practical.
5. Remove only with release notes.

## Out of Scope Initially

- Long-term support versions.
- Enterprise support matrix.
- Automatic upgrades across all generated apps.
- Edge runtime compatibility.
- Browser matrix guarantees.
