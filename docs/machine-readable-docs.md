# Machine-Readable Documentation

Status: Planned.

Audience: AI agents, maintainers, framework contributors.

NeedleStart should make documentation consumable by humans and AI agents. Machine-readable docs are planned outputs, not implemented behavior.

## Planned Outputs

| Output | Purpose | Production bundle? |
| --- | --- | --- |
| `llms.txt` | Compact public summary for AI tools. | Public docs artifact only |
| `llms-full.txt` | Full AI-readable project or app context. | Public docs artifact only |
| `docs-index.json` | Index of docs pages, status, audience, tags, and source paths. | Public docs artifact only |
| `.needle/context/*.ctx.json` | Route or surface context capsules for apps. | No production runtime bundles |
| `.needle/context/agent-index.json` | Index of generated agent context. | No production runtime bundles |

## `docs-index.json` Draft

```json
{
  "schemaVersion": "needle.docs-index.v0",
  "generatedAt": "2026-07-06T00:00:00.000Z",
  "pages": [
    {
      "path": "docs/routing.md",
      "title": "Routing",
      "status": "planned",
      "audience": ["app developers", "AI agents"],
      "tags": ["routing", "file-conventions"],
      "source": "manual"
    }
  ]
}
```

## Rules

- Include schema versions.
- Keep output deterministic.
- Use normalized POSIX-style paths.
- Do not include secrets, private tokens, or local machine paths.
- Keep AI-facing JSON compact.
- Link each generated item back to its source doc when practical.
- Distinguish docs for the framework repository from generated docs for user applications.

## Maintenance

Machine-readable docs should be generated once package scaffolding exists. Until then, this page is the contract draft.

## Out Of Scope

- Embedding full source code in public AI docs by default.
- Shipping agent metadata in production runtime bundles.
- Letting AI docs override `AGENTS.md` or security policy.

