# Agent Kernel

The Agent Kernel is the part of NeedleStart that makes applications understandable, auditable, and safely editable by AI agents.

Agents do not primarily need more prose. They need a compact, reliable app graph, stable contracts, safe edit rails, and evidence-backed checks.

## Goals

- Let agents inspect the app without reading the whole repository.
- Generate compact route-specific context from the app graph.
- Provide deterministic task skeletons.
- Explain render, cache, SEO, route, and graph behavior through stable JSON.
- Support safe edit transactions.
- Record mutation logs.
- Keep production builds free of agent metadata.

## Generated Files

Planned generated files:

```txt
AGENTS.md
llms.txt
llms-full.txt
.needle/graph.json
.needle/routes.json
.needle/map.json
.needle/context/public.ctx.json
.needle/context/api.ctx.json
.needle/context/agent-index.json
```

## Commands

Planned commands:

```bash
needle agent init
needle agent context
needle agent task
needle agent plan
needle agent apply
needle agent log
needle inspect why route /pricing
```

## Context Capsule

Example:

```json
{
  "route": "/pricing",
  "source": "app/pricing/page.tsx",
  "mode": "static",
  "why": [
    "Route declares staticPage().",
    "No request-time APIs were detected.",
    "Metadata is statically analyzable."
  ],
  "seo": {
    "status": "pass",
    "title": "Pricing | Acme",
    "canonical": "/pricing"
  },
  "cache": {
    "mode": "static",
    "tags": []
  },
  "components": ["Hero", "PricingTable", "FAQ"],
  "data": ["billing.plans.public"],
  "safeEdits": ["meta.*", "copy.*", "blocks.*.props"],
  "dangerZones": ["billing", "checkout"],
  "checks": ["seo", "typecheck", "render", "map"]
}
```

A context capsule should answer what the agent needs to know, not dump the entire repo into a smaller box.

## Agent Task Contract

`needle agent task "task" --json` should eventually return a deterministic task contract.

Draft shape:

```json
{
  "goal": "Update pricing hero copy",
  "relevantFiles": ["app/pricing/page.tsx", "components/PricingHero.tsx"],
  "likelyAffectedRoutes": ["/pricing"],
  "safeEditFields": ["copy.*", "meta.description"],
  "dangerZones": ["billing", "checkout"],
  "requiredChecks": ["typecheck", "seo", "map"],
  "risk": "low",
  "outOfScope": ["pricing logic", "billing API", "checkout copy"]
}
```

The command should not call an external LLM. It should use graph data, manifests, templates, and safe edit policies.

## Safe Edit Transaction

Planned transaction flow:

1. Validate target exists.
2. Validate field is editable.
3. Check risk tier.
4. Produce a dry-run diff preview.
5. Apply patch in memory using AST.
6. Regenerate affected graph slices.
7. Run affected checks.
8. Apply file writes only after dry-run passes or override is explicit.
9. Append to `.needle/mutations.json`.
10. Trigger incremental rebuild.
11. Re-run affected checks.
12. Return structured result for CLI and MCP.
13. Support rollback through `needle edit undo`.

String replacement is not allowed for safe edits.

## Risk Tiers

Low risk:

- Metadata.
- Copy.
- Simple structured block props.

Medium risk:

- Adding components.
- Updating component contracts.
- Updating route contracts.

High risk:

- Auth.
- Billing.
- Cache invalidation.
- Server functions.
- Schemas.
- Deployment adapters.
- File-system write tools.

High-risk edits require explicit override through `--force`, human confirmation, or an equivalent safe-edit policy.

In production workflows, high-risk edits require explicit human sign-off.

The full transaction contract is documented in `docs/safe-edit-transactions.md`.

## Mutation Log

Example:

```json
{
  "id": "mut_01K00000000000000000000000",
  "task": "Update pricing title",
  "filesChanged": ["app/pricing/page.tsx"],
  "affectedRoutes": ["/pricing"],
  "checks": {
    "typecheck": "pass",
    "seo": "pass",
    "map": "pass"
  },
  "risk": "low"
}
```

## Agent Safety Rules

- Safe edit APIs must validate target existence.
- Safe edit APIs must reject unknown fields.
- Safe edit APIs must produce a dry-run diff before applying.
- Safe edit APIs must use AST edits.
- High-risk areas require explicit override.
- High-risk production edits require explicit human sign-off.
- Mutation logs must be append-only.
- Safe edit rollback must be available for applied transactions.
- Generated files must not be manually edited.
- Agent context must not be included in production bundles.
- Agent-facing output must include evidence, checks, skipped checks with reasons, and known risks.

## High-Risk Areas

- Auth.
- Billing.
- Cache invalidation.
- Deployment adapters.
- File-system write tools.
- MCP write tools.
- Secrets and environment variables.
- Runtime request routing.
- Schema validators and serializers.

## Deterministic Agent Plans

`needle agent plan "task"` should return a structured task skeleton based on graph data and templates. It should not call an external LLM.

The plan should include:

- Goal.
- Relevant files.
- Likely affected routes.
- Required checks.
- Risk level.
- Safe edit fields.
- Danger zones.
- Out of scope.

## Product Rule

The Agent Kernel should make agents better because the framework exposes structure, not because the agent guesses harder.

If an agent workflow requires reading the whole repo to answer a route-level question, NeedleStart has not yet fulfilled the app-graph-native promise.
