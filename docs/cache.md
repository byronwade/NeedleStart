# Cache

Status: Planned.

Audience: app developers, runtime contributors, AI agents.

NeedleStart caching must be explicit and inspectable.

## Principles

- No invisible caching.
- Every cacheable route, API, or generated artifact must expose its cache plan.
- Cache tags must be visible to Needle Map.
- Agent diagnostics must explain cache behavior.

## Planned Surfaces

- Route cache metadata.
- API response cache metadata.
- Hot API micro-cache.
- Cache tags.
- `revalidateTag`.
- Cache report in dev and JSON output.

## Out Of Scope

- Invisible caching.
- Safety-critical decisions based only on inferred graph data.
- Distributed cache in the first cache system.
