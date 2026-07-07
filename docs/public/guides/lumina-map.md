# Inspect Lumina Map

Status: Planned.

Audience: app developers, AI agents.

This guide describes the workflow for inspecting the app graph. The current implemented command is the minimal `lumina map affected <appPath> <file> --json` query for direct local import route impact; broader Lumina Map commands remain planned.

## MVP Alpha Map

For MVP Alpha, Lumina Map should be a deterministic file-level graph that connects routes, source files, imported components, render modes, and generated manifests. It should help a developer or agent answer why a route exists before deeper semantic contracts exist.

## Current And Planned Commands

```bash
lumina map affected apps/www components/Hero.tsx --json
lumina inspect <appPath> --json
lumina inspect <appPath> why /
```

Current MVP behavior: these commands read the same generated evidence as `.lumina/routes.json`, `.lumina/render-manifest.json`, and `.lumina/map.json`.

Future planned commands after MVP Alpha:

```bash
lumina map --json
lumina map file components/ProductCard.tsx
lumina map route /pricing
lumina map explain components/ProductCard.tsx
```

## Planned Output

MVP Alpha Map should explain:

- route source files
- imported components
- layout relationships
- render modes
- generated manifest relationships
- why a route or file matters

Future map work should add affected tests, SEO surfaces, cache tags, owners, risk zones, MCP reads, and safe edit integration after MVP Alpha proves the file-level map.

## Example Edge Kinds

```txt
route.source
route.layout
file.imports
route.renderMode
route.generates
```

## Source

- [Your App Ships With A Map](../concepts/app-graph.md)
- [Lumina Map](../../lumina-map.md)

