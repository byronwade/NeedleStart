# Inspect Needle Map

Status: Planned.

Audience: app developers, AI agents.

This guide describes the planned workflow for inspecting the app graph.

## Planned Commands

```bash
needle map
needle map route /pricing
needle map affected components/ProductCard.tsx
needle map explain components/ProductCard.tsx
```

## Planned Output

Needle Map should explain:

- related files
- affected routes
- affected tests
- SEO surfaces
- cache tags
- owners
- risk zones

## Related

- [Your App Ships With A Map](../concepts/app-graph.md)
- [Needle Map](../../needle-map.md)

