# App Graph Visual

Status: Planned.

Audience: app developers, framework contributors, AI agents.

Lumina should eventually include visual explanations of Lumina Map and the generated app graph.

## MVP Alpha Visual Target

MVP Alpha should make the first map easy to inspect before a devtools dashboard exists. The immediate visual story is route source file -> imported component -> generated manifests -> `.lumina/map.json`, with `route.source`, `file.imports`, `route.renderMode`, and `route.generates` edges.

Any visual map in MVP Alpha should be basic, deterministic, and backed by the same JSON that powers `lumina map --json` and `lumina inspect why`.

## Current Asset

The repository includes `docs/assets/lumina-map-data-flow.svg`.

## Needed Diagrams

- Compiler pipeline to manifests.
- Lumina Map layers.
- MVP Alpha Map route/file/manifest flow.
- Route to component to schema to test graph.
- Safe edit transaction lifecycle.
- MCP read and write safety flow.
- Adapter build output.

## Visual Rules

- Diagrams must support the text, not replace it.
- Include alt text or text equivalents.
- Keep generated artifact names exact.
- Mark speculative future diagrams as planned.

