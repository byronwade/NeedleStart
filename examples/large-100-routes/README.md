# Large 100 Routes Example

Status: Implemented.
Example status: Runnable.

This example provides a deterministic generated source fixture for route-discovery ordering and
manifest-size work. The generator uses fixed route names from `route-001` through `route-100`.

## Current Verification

Generate source into a target directory, then run route discovery and inspection:

```bash
bun examples/large-100-routes/scripts/generate-routes.ts .tmp-large-100
bun run lumina -- routes .tmp-large-100 --json
bun run lumina -- inspect .tmp-large-100 --json
bun run lumina -- inspect .tmp-large-100 why /route-001
```

Expected generated artifacts:

```txt
.lumina/routes.json
.lumina/render-manifest.json
.lumina/map.json
```

The route manifest must contain 100 routes ordered from `/route-001` through `/route-100`.
The render manifest and Lumina Map are generated from the same fixed route source so this
fixture can be used for manifest-size readiness and deterministic artifact checks.

## Known Limitations

- Generated route source is not checked in.
- No measured benchmark result exists.
- Dev, build, start, and adapter behavior remain planned.
