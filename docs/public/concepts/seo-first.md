# SEO-First Rendering

Status: Planned.

Audience: app developers, future website visitors, AI agents.

Lumina is planned to make public pages SEO-safe by default. That means public routes should render meaningful HTML, declare metadata explicitly, and produce machine-readable SEO diagnostics.

## Goals

- Meaningful initial HTML.
- Explicit title and description.
- Canonical URLs.
- Sitemap and robots output.
- Structured data helpers.
- Open Graph and social metadata.
- Stable SEO audit output for humans and agents.

## Why It Matters

SEO problems often appear late because metadata, rendering mode, sitemap behavior, and client-side rendering are handled separately. Lumina plans to make SEO visible at the route and manifest level.

## Planned Example

```ts
import { defineMeta, staticPage } from "lumina"

export const render = staticPage()

export const meta = defineMeta({
  title: "Pricing",
  description: "Pricing for a Lumina app.",
  canonical: "/pricing",
})
```

This example is planned and not implemented yet.

## Source

- [SEO Engine](../../seo-engine.md)
- [Add SEO Metadata](../guides/seo-metadata.md)
- [Performance](../../performance.md)

