# MCP Reference

Status: Planned.

Audience: AI agents, framework contributors.

NeedleStart plans to expose framework data and selected safe actions through MCP.
MCP server behavior is not implemented yet.

## Initial Planned Read Tools

- `list_routes`
- `get_route`
- `get_route_context`
- `get_related_files`
- `get_impact_map`
- `get_component_contract`
- `get_schema`
- `get_seo_report`
- `get_perf_report`
- `get_cache_report`

Write tools are planned only after safe edit transactions exist.

## Planned Write Tools

- `create_page`
- `create_api_route`
- `edit_route_meta`
- `edit_component_contract`
- `add_component_to_route`
- `run_affected_checks`
- `apply_safe_patch`
- `read_agent_log`
- `get_mutation`
- `undo_mutation`

## Source

- [MCP Server](../../mcp-server.md)
- [Safe Edit Transactions](../../safe-edit-transactions.md)

