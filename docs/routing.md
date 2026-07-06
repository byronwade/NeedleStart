# Routing

Status: Planned.

Audience: app developers, framework contributors, AI agents.

NeedleStart plans to use file-based routing under `app/`.

## Planned Route Mapping

| File | Route |
| --- | --- |
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/blog/[slug]/page.tsx` | `/blog/:slug` |
| `app/docs/[...parts]/page.tsx` | `/docs/*` |
| `app/(marketing)/pricing/page.tsx` | `/pricing` |
| `app/api/health.ts` | `/api/health` |

## Requirements

- Route discovery must be deterministic.
- Dynamic params must be parsed.
- Route groups must not affect URL paths.
- API and page routes must be distinguished.
- Manifests must use normalized POSIX-style paths.

See `docs/file-conventions.md` and `docs/compiler-ir.md`.

## Out Of Scope

- React rendering details.
- Full middleware/proxy behavior.
- React Server Components defaults.
