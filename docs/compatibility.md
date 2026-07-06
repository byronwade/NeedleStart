# Compatibility

Status: Planned.

Audience: app developers, deployers, maintainers.

NeedleStart should document runtime, platform, framework, and migration compatibility honestly.

## Planned Compatibility Areas

- Bun default adapter runtime.
- Node adapter.
- Static adapter.
- React version support.
- Vite/Rolldown compatibility.
- TypeScript support.
- Next.js migration subset.

## Rule

Do not call a platform supported until a fixture or integration test proves it.

Version support must follow [Versioning And Upgrades](versioning-and-upgrades.md). Do not claim compatibility for a package, runtime, React version, Vite/Rolldown version, adapter, or migration subset without evidence.

Adapter compatibility must also follow [Adapter Contract](adapter-contract.md), especially capability fields, unsupported-feature documentation, fixture requirements, and manifest snapshots.

## Compatibility Table Template

| Surface | Status | Evidence required |
| --- | --- | --- |
| Bun adapter runtime | Planned | Adapter integration tests |
| Node adapter | Planned | Node HTTP fixture |
| Static adapter | Planned | Static export fixture |
| React | Planned | SSR and hydration fixture |
| Vite/Rolldown | Planned | Dev and build fixture |
| TypeScript | Planned | Typecheck fixture |
| Next.js migration subset | Planned | Migration fixture and report |

## Compatibility Language

- Use "planned" before implementation.
- Use "experimental" only when code exists but API stability is not guaranteed.
- Use "supported" only with tests and documented limitations.
