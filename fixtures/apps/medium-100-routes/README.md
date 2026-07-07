# medium-100-routes

Status: Implemented.

Purpose: stable future fixture for manifest-size and route-discovery regression baselines.

Current behavior: deterministic generated source fixture for `lumina bench manifest-size --json --run`.

The generator uses fixed route names from `route-001` through `route-100` and writes source into a
target directory supplied by the caller. The benchmark uses a temporary directory so raw local
measurements do not mutate this fixture path.

```bash
bun fixtures/apps/medium-100-routes/scripts/generate-routes.ts .tmp-medium-100
bun run lumina -- routes .tmp-medium-100 --json
bun run lumina -- bench manifest-size --json --run
```

The benchmark returns raw local metadata in the JSON response and does not persist files under
`benchmarks/results/`. It is not public comparison evidence.
