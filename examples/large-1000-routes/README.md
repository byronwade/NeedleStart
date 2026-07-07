# Large 1000 Routes Example

Status: Implemented.
Example status: Runnable.

This example provides a deterministic generated source fixture for large route-discovery and
future graph-scaling work. The generator uses fixed route names from `route-001` through
`route-1000`, padded to four digits so manifest ordering stays lexicographic and deterministic.

## Current Verification

Generate source into a target directory, then run route discovery and inspection:

```bash
bun examples/large-1000-routes/scripts/generate-routes.ts .tmp-large-1000
bun run lumina -- routes .tmp-large-1000 --json
bun run lumina -- inspect .tmp-large-1000 --json
bun run lumina -- inspect .tmp-large-1000 why /route-0001
```

Expected generated artifacts:

```txt
.lumina/routes.json
.lumina/render-manifest.json
.lumina/map.json
```

The route manifest must contain 1000 routes ordered from `/route-0001` through `/route-1000`.
The render manifest and Lumina Map are generated from the same fixed route source so this
fixture can be used for manifest-size readiness and deterministic artifact checks.

## Known Limitations

- Generated route source is not checked in.
- No measured benchmark result exists.
- Dev, build, start, and adapter behavior remain planned.
