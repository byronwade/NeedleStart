# Compiler And Runtime Split

Status: Planned.

Audience: app developers, framework contributors, AI agents.

NeedleStart keeps framework intelligence in the compiler and keeps production runtime adapters small.

## Compiler Owns

- Route discovery.
- Render mode classification.
- Metadata extraction.
- Schema extraction.
- API code generation.
- Manifest generation.
- Needle Map output.
- Agent context output.

## Runtime Owns

- Static asset serving.
- Prerendered HTML serving.
- SSR request routing.
- API and hot API routing.
- Cache headers.
- 404 and 500 behavior.
- Health endpoint when enabled.

## Why This Matters

Runtime should not rediscover source files or rebuild the app graph on requests. Generated manifests should carry the work that can be done safely at build time.

## Reference

- [Compiler IR](../../compiler-ir.md)
- [Runtime Contract](../../runtime-contract.md)
- [Deployment Overview](../deployment/overview.md)

