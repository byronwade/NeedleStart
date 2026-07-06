# Examples

Status: Planned.

Audience: app developers, framework contributors, AI agents.

NeedleStart examples are planned but not implemented yet. This page explains the public rules for official examples and starter templates.

## Planned Examples

| Example | Purpose | Current status |
| --- | --- | --- |
| `basic` | Smallest useful generated app. | Planned |
| `blog-seo` | Tutorial app for pages, metadata, sitemap, and public HTML checks. | Planned |
| `api-route` | Focused API route example. | Planned |
| `hot-api` | Fast API path with schema and serializer behavior. | Planned |
| `agent-demo` | Map inspection, safe edit preview, apply, log, and undo. | Planned |
| `large-app-fixture` | Large route tree, graph generation, and performance evidence. | Planned |

## Example Status

- Planned: target example only.
- Scaffolded: files exist, behavior incomplete.
- Runnable: commands start, but full evidence is incomplete.
- Verified: commands, tests, generated artifacts, and docs claims pass.
- Deprecated: retained for compatibility or migration notes.

No example in this repository is verified yet.

## Future Create Command

Planned examples may eventually be used by the create command:

```bash
bun create needle my-app
bun create needle my-blog --example blog-seo
```

These commands are not implemented yet.

## Verified Example Requirements

A verified example must include:

- README with status, purpose, prerequisites, commands, expected output, and limitations.
- Tests or fixture assertions.
- Expected `.needle/*` artifacts.
- Public HTML or HTTP assertions when relevant.
- Links to the contracts it exercises.
- Evidence from the current repository state.

## Related

- [Create An App](../guides/create-app.md)
- [Project Structure](project-structure.md)
- [Testing](testing.md)
- [Manifest Contracts](manifest-contracts.md)
- [Examples And Templates Contract](../../examples-contract.md)
