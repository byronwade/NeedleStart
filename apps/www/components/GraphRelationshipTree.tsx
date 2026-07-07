import {
  ArrowRight,
  Braces,
  FileCode2,
  FileJson,
  Folder,
  GitBranch,
  LayoutTemplate,
  Route,
} from "lucide-react";
import { Badge } from "./ui/badge";

const sourceTree = [
  {
    label: "app",
    icon: Folder,
    rows: [
      { label: "layout.tsx", detail: "wraps route", icon: LayoutTemplate },
      { label: "page.tsx", detail: "defines /", icon: Route, active: true },
    ],
  },
  {
    label: "components",
    icon: Folder,
    rows: [
      { label: "Hero.tsx", detail: "imports visual", icon: FileCode2 },
      { label: "GraphTree.tsx", detail: "relationship preview", icon: GitBranch, active: true },
    ],
  },
];

const outputs = [
  { label: ".lumina/routes.json", detail: "route id, path, params", icon: FileJson },
  { label: ".lumina/render-manifest.json", detail: "static mode evidence", icon: Braces },
  { label: ".lumina/map.json", detail: "source and layout edges", icon: GitBranch },
];

const relationships = [
  { from: "app/page.tsx", relation: "declares", to: "Route /" },
  { from: "app/layout.tsx", relation: "wraps", to: "Shared route layout" },
  { from: "Hero.tsx", relation: "imports", to: "Graph relationship preview" },
];

export function GraphRelationshipTree() {
  return (
    <div className="map-console" aria-label="Lumina graph relationship preview">
      <div className="console-topbar">
        <div className="console-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="console-label">lumina inspect apps/www why /</span>
      </div>

      <div className="relationship-board">
        <div className="tree-panel source-panel">
          <div className="panel-title">
            <span>Source tree</span>
            <Badge variant="success">current</Badge>
          </div>
          <div className="file-tree">
            {sourceTree.map((group) => {
              const GroupIcon = group.icon;
              return (
                <div className="tree-group" key={group.label}>
                  <div className="tree-row tree-folder">
                    <GroupIcon aria-hidden="true" size={16} />
                    <span>{group.label}</span>
                  </div>
                  {group.rows.map((row) => {
                    const RowIcon = row.icon;
                    return (
                      <div className={row.active ? "tree-row tree-file tree-row-active" : "tree-row tree-file"} key={row.label}>
                        <span className="tree-indent" aria-hidden="true" />
                        <RowIcon aria-hidden="true" size={15} />
                        <span>
                          <strong>{row.label}</strong>
                          <small>{row.detail}</small>
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="tree-panel inspector-panel">
          <div className="panel-title">
            <span>Relationship inspector</span>
            <Badge variant="outline">why /</Badge>
          </div>
          <div className="inspector-body">
            <div className="route-summary-card">
              <div className="route-summary-icon">
                <Route aria-hidden="true" size={18} />
              </div>
              <div>
                <span>Selected route</span>
                <strong>{"app/page.tsx -> /"}</strong>
                <small>Static page, wrapped by app/layout.tsx, hydrated by a generated client entry.</small>
              </div>
            </div>

            <div className="relationship-list">
              {relationships.map((edge) => (
                <div className="relationship-edge" key={`${edge.from}-${edge.relation}-${edge.to}`}>
                  <span>{edge.from}</span>
                  <strong>
                    {edge.relation}
                    <ArrowRight aria-hidden="true" size={14} />
                  </strong>
                  <span>{edge.to}</span>
                </div>
              ))}
            </div>

            <div className="artifact-chips" aria-label="Generated evidence">
              {outputs.map((output) => {
                const OutputIcon = output.icon;
                return (
                  <span className="artifact-chip" key={output.label} title={output.detail}>
                    <OutputIcon aria-hidden="true" size={14} />
                    {output.label.replace(".lumina/", "")}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="relationship-footer">
        <span>Route /</span>
        <span>static render</span>
        <span>3 generated artifacts</span>
      </div>
    </div>
  );
}
