# Cache

Status: Planned.

Audience: app developers, runtime contributors, AI agents.

This page describes the planned cache overview. Cache behavior is not implemented yet.

NeedleStart caching must be explicit and inspectable.

The planned cache plan shape, `Cache-Control` header mapping, cache tags, revalidation behavior, diagnostics, generated manifests, security rules, and fixture requirements are defined in [Cache Contract](cache-contract.md).

## Principles

- No invisible caching.
- Every cacheable route, API, or generated artifact must expose its cache plan.
- Cache tags must be visible to Needle Map.
- Agent diagnostics must explain cache behavior.
- SSR and API routes default to `no-store` unless explicit route or API config opts into a safer cache plan.
- Cache keys and tags must not include secrets, raw emails, user tokens, or private identifiers.

## Planned Surfaces

- Route cache metadata.
- API response cache metadata.
- Hot API micro-cache.
- Cache tags.
- `revalidateTag`.
- `Cache-Control` header output.
- Cache report in dev and JSON output.
- Cache diagnostics.
- Cache metadata in generated manifests, render reports, performance reports, map output, or future cache report artifacts.
- Public cache reference.

## Out Of Scope

- Invisible caching.
- Safety-critical decisions based only on inferred graph data.
- Distributed cache in the first cache system.
