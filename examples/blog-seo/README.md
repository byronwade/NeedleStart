# Blog SEO Example

Status: Implemented.
Example status: Runnable.

The blog SEO example is a public content fixture for route discovery, dynamic route
handling in dev, meaningful static HTML for the index route, direct component import
map evidence, and the future metadata, sitemap, robots, and SEO audit lane.

SEO helpers are not implemented yet. This example prepares those surfaces without
claiming they exist.

## Prerequisites

Run this once from the repository root:

```bash
bun install
```

## Commands

From `examples/blog-seo/`:

```bash
bun run dev
bun run dev:once
bun run build
bun run build:json
bun run start
bun run start:once
bun run routes
bun run inspect
bun run inspect:why
```

Equivalent root commands:

```bash
bun run lumina -- dev examples/blog-seo
bun run lumina -- dev examples/blog-seo --once
bun run lumina -- build examples/blog-seo
bun run lumina -- build examples/blog-seo --json
bun run lumina -- start examples/blog-seo
bun run lumina -- start examples/blog-seo --once
bun run lumina -- routes examples/blog-seo --json
bun run lumina -- inspect examples/blog-seo --json
bun run lumina -- inspect examples/blog-seo why /
bun run lumina -- inspect examples/blog-seo why /blog/:slug
```

## Expected Routes

- `/`
- `/blog/:slug`

## Expected Runtime Behavior

- Dev serves `/`.
- Dev serves `/blog/hello-lumina` through the dynamic route.
- Build emits static HTML for `/`.
- Built start serves `/` from `dist/public`.
- Built start returns 404 for `/blog/hello-lumina` until production SSR or
  prerendered dynamic params exist.

## Expected Generated Artifacts

- `.lumina/routes.json`
- `.lumina/render-manifest.json`
- `.lumina/map.json`
- `.lumina/build-trace.json`
- `.lumina/perf.report.json`
- `dist/routes.manifest.json`
- `dist/render.manifest.json`
- `dist/adapter.manifest.json`
- `dist/public/index.html`

## Contracts Covered

- Routing Contract
- Manifest Contracts
- CLI JSON Contract
- Lumina Map
- Adapter Contract
- Testing Contract
- Future SEO Contract

## Verification Evidence

`tests/mvp-app-fixtures.test.ts` verifies this example as runnable. The test starts
the dev server, fetches the index and dynamic post route, builds the app, checks
compact generated artifacts, inspects the dynamic route, starts built output, and
asserts the current production dynamic-route 404 limitation.

## Known Limitations

- Metadata helpers are not implemented.
- Markdown content is a deterministic fixture and is not parsed by the framework.
- Sitemap and robots output remain planned.
- Production dynamic route serving remains planned.
- No Core Web Vitals, Lighthouse, or benchmark claim is made by this example.
