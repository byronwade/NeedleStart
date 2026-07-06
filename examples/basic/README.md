# Basic Example

Status: Scaffolded.

The basic example is the smallest route-discovery fixture that looks like a future Lumina starter
app. It is not yet a runnable app because dev, build, start, and rendering behavior remain planned.

## Expected Routes

- `/`

## Current Verification

From the repository root:

```bash
bun run lumina -- routes examples/basic --json
bun run lumina -- inspect examples/basic --json
bun run lumina -- inspect examples/basic why /
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

## Known Limitations

- No dev server.
- No static build output.
- No production adapter output.
