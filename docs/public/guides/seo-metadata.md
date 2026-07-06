# Add SEO Metadata

Status: Planned.

Audience: app developers, AI agents.

This guide describes the planned workflow for adding route metadata.

## Planned API

```ts
import { defineMeta } from "needlestart"

export const meta = defineMeta({
  title: "Pricing",
  description: "Simple pricing for teams.",
  canonical: "/pricing",
})
```

## Planned Checks

`needle seo` should eventually verify:

- title
- description
- canonical URL
- meaningful initial HTML
- sitemap inclusion
- structured data when configured

## Source

- [SEO-First Rendering](../concepts/seo-first.md)
- [SEO Reference](../reference/seo.md)
- [SEO Engine](../../seo-engine.md)
- [SEO Contract](../../seo-contract.md)

