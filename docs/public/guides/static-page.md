# Add A Static Page

Status: Planned.

Audience: app developers, AI agents.

This guide describes the planned workflow for adding a static public page. Static page routing and rendering are not implemented yet.

## Planned File

```txt
app/about/page.tsx
```

## Planned Example

```tsx
import { defineMeta, staticPage } from "lumina"

export const render = staticPage()

export const meta = defineMeta({
  title: "About",
  description: "About this Lumina app.",
  canonical: "/about",
})

export default function AboutPage() {
  return <main><h1>About</h1></main>
}
```

This API is planned and not implemented.

## Checks

When implemented, this workflow should run:

- route discovery
- typecheck
- render check
- SEO audit

## Source

- [Render Modes](../reference/render-modes.md)
- [Add SEO Metadata](seo-metadata.md)

