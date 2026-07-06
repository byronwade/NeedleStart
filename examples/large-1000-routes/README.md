# Large 1000 Routes Example

Status: Scaffolded.

This example provides a deterministic generated source fixture for large route-discovery and
future graph-scaling work. The generator uses fixed route names from `route-001` through
`route-1000`, padded to four digits so manifest ordering stays lexicographic and deterministic.

## Current Verification

Generate source into a target directory, then run route discovery:

```bash
bun examples/large-1000-routes/scripts/generate-routes.ts .tmp-large-1000
bun run lumina -- routes .tmp-large-1000 --json
```

## Known Limitations

- Generated route source is not checked in.
- No measured benchmark result exists.
- Dev, build, start, and adapter behavior remain planned.
