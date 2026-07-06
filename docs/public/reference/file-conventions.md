# File Conventions

Status: Planned.

Audience: app developers, AI agents.

NeedleStart plans to use file-based routing under `app/`.

| File | URL |
| --- | --- |
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/blog/[slug]/page.tsx` | `/blog/:slug` |
| `app/docs/[...parts]/page.tsx` | `/docs/*` |
| `app/(marketing)/pricing/page.tsx` | `/pricing` |
| `app/api/health.ts` | `/api/health` |

## Source

- [File Conventions](../../file-conventions.md)
- [Routing](../../routing.md)

