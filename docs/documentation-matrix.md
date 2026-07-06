# Documentation Improvement Matrix

Status: Draft.

Audience: maintainers, documentation contributors, AI agents.

This matrix evaluates the current documentation system file by file. It uses the format required by the documentation audit objective.

| File | Audience | Current quality | Main problem | Recommended fix | Priority | Effort | Website-ready? | Agent-ready? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `README.md` | All | Strong | Broad and still planning-heavy | Keep concise; route detail to docs hub | High | Low | Partial | Partial |
| `VISION.md` | Maintainers, contributors | Strong | Aspirational language could be mistaken for current product if copied public | Add status framing when surfaced on website | Medium | Low | Partial | Yes |
| `ARCHITECTURE.md` | Contributors | Strong | Dense and mostly internal | Add diagrams and link beginner docs | Medium | Medium | No | Yes |
| `AGENTS.md` | AI agents | Strong | Must track commands and package changes closely | Keep required-docs list current | High | Low | No | Yes |
| `CONTRIBUTING.md` | Contributors | Good | Needs enforcement through PR template | Link and use checklist | High | Low | Partial | Partial |
| `CODE_OF_CONDUCT.md` | Community | Good initial | No private contact yet | Add contact before public launch | High | Low | Partial | Partial |
| `GOVERNANCE.md` | Maintainers | Good planned | Area ownership is not real yet | Convert planned roles to real roles as contributors emerge | High | Medium | Partial | Partial |
| `SECURITY.md` | Security reviewers | Good planned | No vulnerability intake contact yet | Add private contact before release | High | Low | Partial | Partial |
| `docs/README.md` | All | Strong | Large navigation may grow unwieldy | Group by docs lanes as site evolves | High | Medium | Yes | Yes |
| `docs/status.md` | All | Strong | Must be updated with every phase change | Make status update part of PR template | High | Low | Yes | Yes |
| `docs/product-strategy.md` | Maintainers, website visitors | Basic | Thin strategic framing | Add market wedge and non-goals after implementation starts | Medium | Medium | Partial | Partial |
| `docs/engineering-standards.md` | Maintainers, contributors, agents | Strong planned | Needs continued enforcement through review | Keep PR template and governance aligned | High | Low | Partial | Yes |
| `docs/operating-cadence.md` | Maintainers, contributors, agents | Good planned | Needs use once implementation starts | Apply at phase boundaries and releases | Medium | Low | Partial | Yes |
| `docs/open-source-community.md` | Contributors, reviewers | Basic | Thin community operations | Add issue triage and discussion policy | Medium | Medium | Partial | Partial |
| `docs/roadmap.md` | Maintainers, contributors | Strong | Long phase list | Add status table or split later | Medium | Medium | Partial | Yes |
| `docs/task-backlog.md` | Contributors | Strong | Large linear backlog | Move active work to issues later | Medium | Medium | No | Yes |
| `docs/package-map.md` | Contributors, agents | Strong | Package names are planned | Update after scaffold exists | High | Low | No | Yes |
| `docs/phase-1-build-plan.md` | Contributors | Strong | Only covers first scaffold phase | Keep scoped; create Phase 2 plan later | High | Low | No | Yes |
| `docs/getting-started.md` | New users | Good planned | Commands do not work yet | Replace with verified tutorial after scaffold | High | Medium | Partial | Yes |
| `docs/guides.md` | App developers | Good index | No real guide bodies yet | Fill as features land | High | High | Partial | Partial |
| `docs/api-reference.md` | Developers, agents | Good index | Needs exact API contracts later | Split into generated references as APIs stabilize | High | High | Partial | Yes |
| `docs/file-conventions.md` | Developers, agents | Good planned | Needs diagnostics and examples from implementation | Add verified route examples | High | Medium | Partial | Yes |
| `docs/cli.md` | Developers, agents | Good planned | No command implementation | Add syntax, exit codes, JSON after CLI exists | High | Medium | Partial | Yes |
| `docs/config.md` | Developers, agents | Good planned | Defaults are not implemented | Add field table after config exists | High | Medium | Partial | Yes |
| `docs/routing.md` | Developers, agents | Good planned | Needs route discovery evidence | Add fixture outputs after implementation | High | Medium | Partial | Yes |
| `docs/compiler-ir.md` | Contributors, agents | Strong | Needs schema version examples | Link and expand manifest contracts | High | Medium | No | Yes |
| `docs/manifest-contracts.md` | Contributors, agents | Good planned | Needs concrete schemas | Add schema-versioned JSON when generated | High | High | Partial | Yes |
| `docs/runtime-contract.md` | Runtime contributors | Good | Needs test mapping | Link adapter HTTP tests once available | Medium | Medium | No | Yes |
| `docs/adapters.md` | Deployers, contributors | Good | Deployment docs are planned | Add capability tables from implementation | Medium | Medium | Partial | Partial |
| `docs/deployment.md` | Deployers | Good planned | No runnable deployment flow | Add verified Bun/Node/static guides later | High | High | Partial | Partial |
| `docs/testing.md` | Contributors, maintainers | Good planned | Commands not available | Add actual scripts after scaffold | High | Low | No | Yes |
| `docs/security.md` | Security reviewers, agents | Good planned | Needs feature-specific threat models | Add threat models as high-risk features land | High | Medium | Partial | Yes |
| `docs/needle-map.md` | Contributors, agents | Strong | Needs diagrams and fixtures | Add graph fixture examples | High | Medium | Partial | Yes |
| `docs/app-graph-visual.md` | All | Good planned | Visuals not produced yet | Add diagrams with text equivalents | Medium | Medium | Partial | Partial |
| `docs/agent-kernel.md` | Agents, contributors | Strong | Needs generated schema examples | Link machine-readable docs and schemas | High | Medium | No | Yes |
| `docs/mcp-server.md` | Agents | Good planned | Needs exact tool schemas | Add tool schemas as MCP lands | High | Medium | No | Yes |
| `docs/safe-edit-transactions.md` | Agents, security reviewers | Strong | Needs negative test plan | Add rejected-edit fixtures later | High | Medium | No | Yes |
| `docs/seo-engine.md` | App developers | Good planned | Needs page examples | Add verified SEO guide later | Medium | Medium | Partial | Partial |
| `docs/api-routes.md` | App developers | Good planned | Handler API not implemented | Add exact handler types later | High | Medium | Partial | Partial |
| `docs/schema.md` | Developers | Good planned | Schema DSL not implemented | Add exact DSL docs later | High | Medium | Partial | Partial |
| `docs/cache.md` | Developers, agents | Good planned | Cache system not implemented | Add manifest examples and invalidation rules later | High | Medium | Partial | Yes |
| `docs/performance.md` | Maintainers | Good | Needs raw benchmark policy link | Keep benchmark links current | Medium | Low | Partial | Partial |
| `docs/speed-strategy.md` | Contributors, maintainers, agents | Strong planned | Needs benchmark evidence as implementation lands | Keep speed gates tied to tasks and benchmarks | High | Medium | Partial | Yes |
| `docs/benchmarks.md` | Maintainers | Good planned | No raw results | Add results folder after benchmarks exist | High | Medium | Partial | Partial |
| `docs/benchmark-methodology.md` | Maintainers | Strong planned | Needs fixtures and raw data format later | Add example result file later | High | Medium | Partial | Partial |
| `docs/accessibility.md` | Docs maintainers | Basic | Framework accessibility guidance is thin | Expand with examples later | Medium | Medium | Partial | Partial |
| `docs/public-docs.md` | Website editors | Good planned | No docs-site system yet | Add frontmatter once parser exists | Medium | Medium | Partial | Partial |
| `docs/public/*` | Future website visitors, app developers, agents | Good planned | Public content is source-ready but not site-rendered | Keep concise, status-aware, and linked to source docs | High | Medium | Partial | Partial |
| `docs/website-content-map.md` | Website editors | Good planned | Needs detailed nav groups later | Expand during site build | Medium | Medium | Partial | Partial |
| `docs/comparisons.md` | Website visitors | Good planned | No comparison pages yet | Add source-cited comparisons after implementation | Medium | High | Partial | Partial |
| `docs/examples.md` | App developers | Good planned | No examples exist | Add example READMEs when scaffold exists | High | High | Partial | Partial |
| `docs/compatibility.md` | Deployers | Good planned | No compatibility evidence yet | Add evidence table as tests land | High | Medium | Partial | Partial |
| `docs/release.md` | Maintainers | Good planned | No release tooling yet | Add changelog and release workflow later | High | Medium | Partial | Partial |
| `docs/glossary.md` | All | Basic | Sparse | Expand with API terms as they land | Low | Low | Yes | Yes |
| `docs/documentation-standard.md` | Docs contributors, agents | Strong | Needs enforcement | Enforce through PR template | High | Low | No | Yes |
| `docs/docs-freshness-policy.md` | Maintainers, contributors, agents | Strong planned | Needs continued use in PRs | Keep update triggers current as project changes | High | Low | No | Yes |
| `docs/docs-maintenance-checklist.md` | Maintainers, agents | Strong | Needs PR integration | Added PR template; keep current | High | Low | No | Yes |
| `docs/documentation-audit.md` | Maintainers | Strong | Large and strategic | Keep as periodic audit artifact | Medium | Medium | No | Yes |
| `docs/documentation-research.md` | Docs contributors | Strong | Needs periodic refresh | Revisit before public launch | Medium | Medium | No | Partial |
| `docs/documentation-matrix.md` | Maintainers, agents | New | Must stay updated as docs change | Update during docs audits | Medium | Medium | No | Yes |
| `docs/machine-readable-docs.md` | Agents, contributors | Strong planned | Generated outputs do not exist | Implement after package scaffold | High | Medium | No | Yes |
| `docs/maintainer-guide.md` | Maintainers | Good planned | Roles are not active yet | Convert planned roles into real maintainership later | High | Medium | Partial | Partial |
| `docs/decisions/*` | Maintainers | Good | Limited ADR set | Add ADRs for new architecture decisions | Medium | Low | No | Yes |
| `docs/templates/*` | Contributors | Good | Needs usage through PR template | Link from contributing and PR template | Medium | Low | No | Yes |
| `docs/prompts/*` | AI agents | Good planned | Prompt set is small | Add prompts for security/release/map reviews later | Medium | Medium | No | Yes |
| `skills/*` | AI agents | Good | Duplicated with docs copies | Decide canonical generation strategy | Medium | Medium | No | Yes |
| `subagents/*` | AI agents | Good | Duplicated with docs copies | Decide canonical generation strategy | Medium | Medium | No | Yes |
