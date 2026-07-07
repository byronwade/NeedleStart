# large-1000-routes

Status: Implemented.

Purpose: stable generated fixture for route discovery, graph query, and future agent context scaling work.

Current behavior: `scripts/generate-routes.ts` generates 1000 deterministic routes into a target directory. `bun run lumina -- bench graph-query --json --run` uses this generator in a temporary directory, creates one Lumina Map in memory, and measures deterministic affected-route and related-file queries.

The raw command output is local lab metadata. It is not reviewed public benchmark evidence or a framework comparison.
