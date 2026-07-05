# Routing Contract

NeedleStart routing is planned. This document defines the target `app/` conventions, route discovery rules, route IDs, params, layouts, special files, and diagnostics.

Routing is a compiler responsibility. Runtime adapters consume generated route matchers and manifests; they must not rediscover source files during normal requests.

## Goals

- Make route discovery deterministic across operating systems.
- Keep route conventions familiar to React meta-framework users.
- Give every route a stable ID for manifests, map nodes, diagnostics, and agent context.
- Support SEO-safe public pages by default.
- Support API routes and hot API routes without routing through React.
- Make route collisions and invalid segments fail clearly.

## App Root

Default route root:

```txt
app/
```

Configurable through:

```ts
export default defineConfig({
  app: {
    root: "app",
  },
})
```

The app root must be a relative path inside the project root.

## Basic Page Routes

| File | URL |
| --- | --- |
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/blog/page.tsx` | `/blog` |
| `app/blog/[slug]/page.tsx` | `/blog/:slug` |
| `app/docs/[...parts]/page.tsx` | `/docs/*` |
| `app/(marketing)/pricing/page.tsx` | `/pricing` |

A page route is a file named `page.tsx`, `page.ts`, `page.jsx`, or `page.js` under the app root.

TypeScript and TSX are preferred. JavaScript support may exist later for adoption, but the first prototype should focus on TypeScript.

## Route IDs

Every route gets a stable ID.

Examples:

| File | Route ID |
| --- | --- |
| `app/page.tsx` | `app.page` |
| `app/about/page.tsx` | `app.about.page` |
| `app/blog/[slug]/page.tsx` | `app.blog.$slug.page` |
| `app/docs/[...parts]/page.tsx` | `app.docs.$parts.catchall.page` |
| `app/(marketing)/pricing/page.tsx` | `app.marketing.pricing.page` |
| `app/api/health.ts` | `app.api.health` |

Rules:

- Route IDs use normalized POSIX-style paths.
- Route IDs are stable across operating systems.
- Route IDs do not include absolute paths.
- Dynamic params are represented with `$name` in IDs.
- Catch-all params include a catch-all marker.
- Route groups may appear in IDs but must not appear in URL paths.

## Route Segments

### Static Segments

```txt
app/pricing/page.tsx -> /pricing
```

Static segments must not contain `/`, `?`, `#`, or platform-specific path separators.

### Dynamic Segments

```txt
app/blog/[slug]/page.tsx -> /blog/:slug
```

Rules:

- Param names must be valid identifier-like names: letters, numbers, and `_`, not starting with a number.
- Duplicate param names in the same route are invalid.
- Params are strings by default.
- Schema exports may refine params later.

### Catch-All Segments

```txt
app/docs/[...parts]/page.tsx -> /docs/*
```

Rules:

- Catch-all segments must be the final route segment for a route branch.
- Catch-all params are arrays of strings.
- Catch-all routes have lower priority than static and single dynamic routes at the same level.

### Optional Catch-All Segments

Optional catch-all is deferred for the first prototype.

Potential future syntax:

```txt
app/docs/[[...parts]]/page.tsx
```

Do not implement optional catch-all until route priority and manifest semantics are locked.

### Route Groups

```txt
app/(marketing)/pricing/page.tsx -> /pricing
```

Rules:

- A segment wrapped in parentheses is a route group.
- Route groups organize files but do not affect URL paths.
- Route groups may affect layout nesting if a layout exists inside the group.
- Route group names should appear in route IDs to preserve source identity.

## Route Priority

When matching URLs, priority should be deterministic:

1. Static segments.
2. Dynamic segments.
3. Catch-all segments.
4. Not found route.

Example:

```txt
app/products/new/page.tsx       -> /products/new
app/products/[id]/page.tsx      -> /products/:id
app/products/[...parts]/page.tsx -> /products/*
```

`/products/new` must match the static route before `/products/:id`.

## Collisions

These files collide because they produce the same URL:

```txt
app/pricing/page.tsx
app/(marketing)/pricing/page.tsx
```

Collision behavior:

- Fail route discovery.
- Emit `NS_ROUTE_COLLISION`.
- Include both source files.
- Do not pick a winner silently.

## Layouts

A layout route file is named `layout.tsx`, `layout.ts`, `layout.jsx`, or `layout.js`.

Example:

```txt
app/layout.tsx
app/(marketing)/layout.tsx
app/(marketing)/pricing/page.tsx
```

The `/pricing` route uses layouts in this order:

1. `app/layout.tsx`
2. `app/(marketing)/layout.tsx`
3. `app/(marketing)/pricing/page.tsx`

Rules:

- Layout order is root to leaf.
- Route groups can contribute layouts.
- Layouts affect render output and Needle Map edges.
- Layouts can affect SEO, cache, performance, and risk.

## Pages

A page file should default-export a React component.

```tsx
import { defineMeta, staticPage } from "needlestart"

export const render = staticPage()

export const meta = defineMeta({
  title: "Pricing | Acme",
  description: "Simple pricing for teams.",
  canonical: "/pricing",
})

export default function PricingPage() {
  return <main>Pricing</main>
}
```

Planned page exports:

| Export | Purpose |
| --- | --- |
| `default` | React page component. |
| `render` | Route render mode. |
| `meta` | Route metadata. |
| `params` | Param schema when needed. |
| `loader` | Future data loading contract. |
| `contract` | Future route contract. |

## Params and Search Params

Planned component props:

```ts
export default function BlogPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: URLSearchParams
}) {
  return <main>{params.slug}</main>
}
```

Rules:

- Dynamic route params come from route segment names.
- Catch-all params are arrays of strings.
- Search params should be exposed consistently in SSR and dev.
- Param schema exports can validate and refine route params.

## Special Files

| File | Purpose | Initial status |
| --- | --- | --- |
| `app/not-found.tsx` | 404 page | planned |
| `app/error.tsx` | Error boundary page | planned |
| `app/loading.tsx` | Loading UI | deferred |
| `app/head.tsx` | Head override | deferred, prefer `defineMeta()` first |
| `app/robots.ts` | Robots generator | planned through SEO engine |
| `app/sitemap.ts` | Sitemap customization | planned later |

The first prototype should prioritize `not-found.tsx` and `error.tsx` only after basic route discovery and rendering are stable.

## API Routes

Basic API route files live under `app/api`.

| File | URL |
| --- | --- |
| `app/api/health.ts` | `/api/health` |
| `app/api/users/[id].ts` | `/api/users/:id` |

A basic API route exports HTTP method handlers:

```ts
export async function GET() {
  return { ok: true }
}
```

Supported planned methods:

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`
- `OPTIONS`
- `HEAD`

API routes must not render React.

## Hot API Routes

A hot API route uses `apiHot()` as its render mode.

```ts
import { apiHot, schema } from "needlestart"

export const render = apiHot({
  validate: true,
  serialize: "generated",
})

export const params = schema.object({
  id: schema.uint64(),
})

export async function GET({ params }) {
  return { id: params.id }
}
```

Hot API routes should still use the same URL discovery rules as normal API routes.

## Route Modes

Planned route modes:

| Helper | Manifest mode | Purpose |
| --- | --- | --- |
| `staticPage()` | `static` | Emit static HTML. |
| `prerender()` | `prerender` | Emit static HTML with revalidation metadata. |
| `ssr()` | `ssr` | Render per request. |
| `stream()` | `stream` | React streaming SSR. |
| `clientOnly()` | `client-only` | Intentionally skip server-rendered content. |
| API handler exports | `api` | Normal API route. |
| `apiHot()` | `api-hot` | Generated hot API handler. |

Invalid or conflicting declarations should emit `NS_RENDER_INVALID_EXPORT`.

## Metadata and SEO

Public page routes should define metadata through `defineMeta()`.

```ts
export const meta = defineMeta({
  title: "Docs | Acme",
  description: "Read Acme documentation.",
  canonical: "/docs",
})
```

Rules:

- Public indexable pages require title, description, and canonical URL.
- Canonical URL must respect base path and trailing slash config.
- SEO output must be reflected in route, SEO, and map manifests.
- `clientOnly()` routes must be treated as SEO risk unless explicitly marked non-indexable.

## File and Route Manifest Requirements

Route discovery should emit route manifest entries with at least:

```ts
export type RouteNode = {
  id: string
  path: string
  file: string
  kind: "page" | "api"
  params: Param[]
  layouts: string[]
  renderMode: RenderMode
  meta?: MetaDefinition
  owner?: Owner
  cache?: CachePlan
}
```

Routes must be sorted by stable keys in manifest output.

Suggested sort:

1. URL path.
2. Route kind.
3. Source file.
4. Route ID.

## Diagnostics

| Code | Meaning |
| --- | --- |
| `NS_ROUTE_APP_ROOT_MISSING` | App root does not exist. |
| `NS_ROUTE_INVALID_SEGMENT` | Segment syntax is invalid. |
| `NS_ROUTE_DUPLICATE_PARAM` | Route declares duplicate param names. |
| `NS_ROUTE_CATCHALL_NOT_LAST` | Catch-all segment is not final. |
| `NS_ROUTE_COLLISION` | Multiple files resolve to the same URL. |
| `NS_ROUTE_INVALID_PAGE_EXPORT` | Page route has invalid required exports. |
| `NS_ROUTE_INVALID_API_EXPORT` | API route has no valid method export. |
| `NS_ROUTE_UNSUPPORTED_FILE` | File looks routable but has unsupported extension or shape. |
| `NS_ROUTE_HEALTH_COLLISION` | User route collides with configured health endpoint. |

## Out of Scope for Initial Routing

- Optional catch-all routes.
- Intercepting routes.
- Parallel routes.
- Middleware/proxy route system.
- Full RSC routing semantics.
- Route-level image/font/script optimization.
- Locale routing automation.

## Implementation Notes

- Use structured path parsing, not ad hoc string assumptions.
- Normalize all manifest paths to POSIX style.
- Do not depend on filesystem traversal order.
- Keep route discovery pure and testable.
- Keep route discovery independent of Vite where practical.
- Feed route nodes into compiler IR, route manifest, Needle Map, SEO, agent context, and runtime route matcher.
