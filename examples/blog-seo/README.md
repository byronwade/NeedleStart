# Blog SEO Example

Status: Scaffolded.

The blog SEO example is a public content fixture for route discovery, dynamic route handling, and
future metadata, sitemap, robots, and meaningful-HTML tests. SEO helpers are not implemented yet.

## Expected Routes

- `/`
- `/blog/:slug`

## Current Verification

From the repository root:

```bash
bun run lumina -- routes examples/blog-seo --json
bun run lumina -- inspect examples/blog-seo --json
bun run lumina -- inspect examples/blog-seo why /
```

Expected generated artifacts:

- `.lumina/routes.json`
- `.lumina/render-manifest.json`
- `.lumina/map.json`

## Contracts Covered

- Routing Contract
- Manifest Contracts
- CLI JSON Contract
- Lumina Map
- Future SEO Contract

## Known Limitations

- Metadata helpers are not implemented.
- Markdown content is not parsed by the framework.
- Sitemap and robots output remain planned.
