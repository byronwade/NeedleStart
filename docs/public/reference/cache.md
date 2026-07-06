# Cache

Status: Planned.

Audience: app developers, AI agents.

Lumina caching is planned to be explicit, manifest-backed, and inspectable. The exact planned contract lives in [Cache Contract](../../cache-contract.md).

## Planned Defaults

| Surface | Default |
| --- | --- |
| Hashed static assets | Public immutable cache. |
| Static HTML | Route-specific cache plan. |
| Prerendered HTML | Cache plan with revalidation metadata when configured. |
| SSR routes | `no-store` unless configured. |
| API routes | `no-store` unless configured. |
| Hot API routes | `no-store` unless micro-cache or response cache is configured. |

## Planned Route Cache Example

```ts
import { prerender } from "lumina"

export const render = prerender({
  revalidate: 300,
  cache: {
    tags: ["products"],
    stale: 60,
  },
})
```

## Planned API Cache Example

```ts
export const config = {
  cache: {
    mode: "ttl",
    ttl: 60,
    tags: ["products"],
  },
}
```

## Planned Contract Rules

- Cache plans must map to `Cache-Control` headers consistently.
- SSR and API routes default to `no-store` unless explicitly configured.
- Cache tags must be deterministic and must not contain secrets, raw emails, user tokens, or private identifiers.
- Revalidation through `revalidateTag(tag)` is planned, but live invalidation behavior is not implemented.
- Hot API micro-cache behavior must be explicit, opt-in, deterministic, and unsafe for auth or session-sensitive data unless policy and tests prove it safe.
- Cache metadata must appear in generated manifests or reports so CLI, MCP, Lumina Map, runtime adapters, tests, and agents explain cache behavior the same way.
- Manual cache header overrides must produce diagnostics when they conflict with the generated cache plan.

## Current Status

This behavior is not implemented yet. The repository is in Phase 1 scaffold, so examples are target API design rather than verified commands.

The Phase 1A `@lumina/core` `CachePlan` is contract-backed for metadata shape. It supports explicit `mode` values of `no-store`, `immutable`, `ttl`, and `stale-while-revalidate`; `scope` values of `browser`, `shared`, `server`, and `micro`; optional `ttlSeconds`, `staleSeconds`, `tags`, and `headers`; and a required `reason`. Runtime behavior, manifests, fixtures, revalidation, micro-cache storage, and adapter tests remain planned.

## Source

- [Cache](../../cache.md)
- [Cache Contract](../../cache-contract.md)
- [Runtime Contract](../../runtime-contract.md)
- [Speed Strategy](../../speed-strategy.md)
