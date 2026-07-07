# File Conventions

Status: Planned.

Audience: app developers, AI agents.

Lumina plans to use file-based routing under `app/`.

Current repository evidence implements the route-discovery subset plus minimal Vite dev rendering for page routes, route params, search params, and app-level or route-level not-found/error components. Production SSR/API behavior remains planned.

## MVP Alpha File Conventions

MVP Alpha should support:

- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/(marketing)/pricing/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/not-found.tsx`
- `app/error.tsx`
- `components/*.tsx`
- `lumina.config.ts`

MVP Alpha should defer API routes, optional catch-all segments, production special-file rendering, contract files, app-local AGENTS generation, and llms outputs.

| Planned file | Planned URL |
| --- | --- |
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/blog/[slug]/page.tsx` | `/blog/:slug` |
| `app/docs/[...parts]/page.tsx` | `/docs/*` |
| `app/(marketing)/pricing/page.tsx` | `/pricing` |
| `app/api/health.ts` | `/api/health` |
| `app/api/users/[id].ts` | `/api/users/:id` |

Route groups in parentheses organize files without changing the URL path. Optional catch-all segments such as `[[...slug]]` are reserved for later support and should produce an unsupported-convention diagnostic until implemented.

Route IDs must be deterministic, path-derived, stable across operating systems, and independent of absolute local paths.

## Source

- [File Conventions](../../file-conventions.md)
- [Routing](../../routing.md)
- [Routing Contract](../../routing-contract.md)
- [Public Routing Reference](routing.md)

