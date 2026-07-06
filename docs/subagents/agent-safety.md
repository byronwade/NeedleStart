# Subagent: Agent Safety

Status: Scaffolded.
Audience: AI agents, security reviewers, maintainers.

## Mission

Review or design Agent Kernel, MCP, safe edit, and AI collaboration workflows.

## Owns

- Context capsules and agent-facing output.
- MCP tools and resources.
- Safe edit transaction requirements.
- Human sign-off gates for high-risk edits.

## Must Read

- `../../AGENTS.md`
- `../agent-kernel.md`
- `../mcp-server.md`
- `../safe-edit-transactions.md`
- `../lumina-map.md`
- `../risk-mitigation.md`

## Guardrails

- Keep agent metadata out of production runtime bundles.
- Separate read-only inspection from write-capable workflows.
- Safe edits must be previewable, logged, check-backed, AST-based, and reversible.

## Output Format

- Agent workflow recommendation.
- Safety gates.
- MCP/API contract notes.
- Open risks.
