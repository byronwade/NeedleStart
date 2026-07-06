# Benchmark Methodology

Status: Planned.

Audience: maintainers, performance reviewers, open source program reviewers.

This page defines the standard for benchmark evidence.

## Required Metadata

- Date.
- Commit SHA.
- Operating system.
- CPU and memory.
- Runtime versions.
- Dependency versions.
- Fixture name.
- Command run.
- Warmup details.
- Number of runs.
- Raw results.

## Comparison Rules

- Compare equivalent behavior.
- Include source for fixture apps.
- Separate Bun performance from Node compatibility.
- Do not compare hot API routes against generic routes without explaining the implementation difference.
- Report variance, not only best runs.

## Raw Results Location

Once benchmarks exist, raw results should live under a stable folder such as:

```txt
benchmarks/results/<date>-<commit>/
```

Do not add synthetic benchmark results.
