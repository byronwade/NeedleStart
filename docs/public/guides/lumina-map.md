# Inspect Lumina Map

Status: Planned.

Audience: app developers, AI agents.

This guide describes the planned workflow for inspecting the app graph. Lumina Map commands are not implemented yet.

## Planned Commands

```bash
lumina map
lumina map --json
lumina map file components/ProductCard.tsx
lumina map route /pricing
lumina map affected components/ProductCard.tsx
lumina map explain components/ProductCard.tsx
```

## Planned Output

Lumina Map should explain:

- related files
- affected routes
- affected tests
- SEO surfaces
- cache tags
- owners
- risk zones

## Source

- [Your App Ships With A Map](../concepts/app-graph.md)
- [Lumina Map](../../lumina-map.md)

