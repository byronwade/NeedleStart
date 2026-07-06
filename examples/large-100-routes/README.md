# Large 100 Routes Example

Status: Scaffolded.

This example provides a deterministic generated source fixture for route-discovery ordering and
manifest-size work. The generator uses fixed route names from `route-001` through `route-100`.

## Current Verification

Generate source into a target directory, then run route discovery:

```bash
bun examples/large-100-routes/scripts/generate-routes.ts .tmp-large-100
bun run lumina -- routes .tmp-large-100 --json
```

## Known Limitations

- Generated route source is not checked in.
- No measured benchmark result exists.
- Dev, build, start, and adapter behavior remain planned.
