# SEO Engine

NeedleStart is SEO-first because public routes should be understandable before JavaScript runs.

SEO-safe also means public-HTML-aware and accessibility-aware. A public route should expose meaningful HTML, explicit metadata, indexability, sitemap behavior, structured data, and enough diagnostics for humans and agents to understand risk.

## Product Promise

No SEO archaeology. Every public route tells you whether it can be crawled, indexed, shared, trusted, and understood from its initial HTML.

## Goals

- Public pages render meaningful HTML.
- Every indexable page has metadata.
- Every indexable page can be included in a sitemap.
- Canonical URLs are explicit.
- Bot-specific dynamic rendering is not the default strategy.
- Structured data is typed.
- SEO reports are machine-readable.
- Client-only public routes are visible as SEO and accessibility risk.
- SEO output feeds Needle Map and agent context.

## Public API Draft

```ts
import { defineMeta } from "needlestart"

export const meta = defineMeta({
  title: "Pricing | Acme",
  description: "Simple pricing for teams.",
  canonical: "/pricing",
  openGraph: {
    title: "Pricing | Acme",
    image: "/og/pricing",
  },
  structuredData: [
    organizationSchema({
      name: "Acme",
      url: "https://acme.com",
    }),
  ],
})
```

## Features

- `defineMeta()`
- Static metadata.
- Dynamic metadata.
- Title and description.
- Canonical URLs.
- Open Graph.
- Twitter/X cards.
- JSON-LD helpers.
- `robots.txt`.
- `sitemap.xml`.
- Sitemap indexes for large sites.
- RSS, Atom, and JSON feeds.
- `hreflang`.
- 404 and 410 status helpers.
- SEO audit CLI.
- Crawler preview.
- Public HTML audit.
- Accessibility-adjacent diagnostics for public pages.

## SEO Audit Output

```json
{
  "route": "/pricing",
  "status": "pass",
  "checks": {
    "title": "pass",
    "description": "pass",
    "canonical": "pass",
    "indexableHtml": "pass",
    "openGraph": "pass",
    "structuredData": "pass",
    "sitemap": "included",
    "headingStructure": "pass",
    "clientOnlyRisk": "pass"
  },
  "why": [
    "Route is public and declares static metadata.",
    "Initial HTML includes meaningful page content.",
    "Route is included in sitemap output."
  ]
}
```

## CLI

Planned commands:

```bash
needle seo
needle seo --json
needle seo --route /pricing
needle inspect why route /pricing
```

`needle inspect why` should be able to explain why a route passed, warned, failed, or was skipped by SEO checks.

## Required Checks

Public indexable routes should check:

- Title exists.
- Description exists.
- Canonical URL exists.
- Initial HTML has meaningful content.
- Route appears in sitemap unless excluded.
- Open Graph image is valid when configured.
- Structured data validates when configured.
- 404 and 410 pages return correct status.
- Public client-only routes produce an explicit warning unless marked non-indexable.
- Heading structure has at least a reasonable first-pass check.
- Meaningful images have alt text where detectable.
- Links and buttons have accessible names where detectable.

## Needle Map Integration

SEO output should feed the app graph.

Planned nodes and edges:

- `metadata` nodes.
- `sitemap` nodes.
- `affectsSeo` edges.
- Route-to-metadata edges.
- Component-to-SEO-risk edges where contracts identify LCP image, structured data, heading, or public copy risks.

## Agent Integration

Agent context should include:

- SEO status.
- Indexability.
- Metadata summary.
- Public HTML status.
- Safe metadata edit fields.
- SEO checks required after edits.
- Accessibility-adjacent warnings when available.

Safe edits that change public copy or metadata should trigger affected SEO checks.

## Out of Scope for Early SEO

- Full search engine simulation.
- Keyword scoring.
- Third-party SEO SaaS integration.
- Bot-specific dynamic rendering.
- Full accessibility certification.
- Browser-based visual SEO simulation.
