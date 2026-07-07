import { Activity, BarChart3, FileJson, Gauge, ShieldAlert, TimerReset } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const lanes = [
  {
    title: "Route discovery",
    status: "Measured locally",
    description: "The route-discovery benchmark runs against the tiny fixture and returns raw local metadata.",
    icon: Activity,
  },
  {
    title: "Manifest size",
    status: "Measured locally",
    description: "The manifest-size benchmark runs against the deterministic 100-route fixture and returns raw local metadata.",
    icon: Gauge,
  },
  {
    title: "Graph query",
    status: "Measured locally",
    description: "The graph-query benchmark runs deterministic affected-route queries against the generated 1000-route fixture.",
    icon: BarChart3,
  },
  {
    title: "Adapter dispatch",
    status: "Measured locally",
    description: "The adapter-dispatch benchmark builds the tiny fixture, starts @lumina/adapter-bun, and records raw request-path metadata.",
    icon: TimerReset,
  },
];

const evidenceRules = [
  "Raw results before public comparisons",
  "Fixture name and command recorded",
  "Environment and run count included",
  "Variance called out instead of hidden",
];

const benchmarkArtifacts = [
  {
    title: "Benchmark catalog",
    path: "bun run lumina -- bench --list --json",
    status: "Implemented",
    icon: FileJson,
  },
  {
    title: "Benchmark status",
    path: "bun run lumina -- bench route-discovery --json",
    status: "Implemented",
    icon: Activity,
  },
  {
    title: "Route discovery run",
    path: "bun run lumina -- bench route-discovery --json --run",
    status: "Implemented",
    icon: TimerReset,
  },
  {
    title: "Manifest size run",
    path: "bun run lumina -- bench manifest-size --json --run",
    status: "Implemented",
    icon: Gauge,
  },
  {
    title: "Graph query run",
    path: "bun run lumina -- bench graph-query --json --run",
    status: "Implemented",
    icon: BarChart3,
  },
  {
    title: "Adapter dispatch run",
    path: "bun run lumina -- bench adapter-dispatch --json --run",
    status: "Implemented",
    icon: TimerReset,
  },
  {
    title: "Methodology contract",
    path: "docs/benchmark-methodology.md",
    status: "Planned",
    icon: ShieldAlert,
  },
  {
    title: "Performance report",
    path: ".lumina/perf.report.json",
    status: "Scaffolded",
    icon: BarChart3,
  },
];

export default function BenchmarksPage() {
  return (
    <main className="page-shell" id="main-content">
      <PageHeader
        eyebrow="Evidence only"
        title="Benchmarks"
        description="Lumina has benchmark skeletons for route discovery, manifest size, graph queries, and adapter dispatch. All four first-wave benchmark commands can run locally today and return raw metadata without making public comparison claims."
        facts={[
          { label: "Route", value: "/benchmarks" },
          { label: "Source", value: "app/benchmarks/page.tsx" },
          { label: "Status", value: "Measured surfaces" },
        ]}
      />

      <section className="benchmark-grid">
        {lanes.map((lane) => {
          const Icon = lane.icon;
          return (
            <Card className="benchmark-card" key={lane.title}>
              <CardHeader>
                <div className="feature-icon">
                  <Icon aria-hidden="true" size={18} />
                </div>
                <CardTitle>{lane.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{lane.description}</p>
                <Badge variant={lane.status === "Planned" ? "secondary" : "warning"}>{lane.status}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="benchmark-evidence-panel">
        <div className="section-heading">
          <Badge variant="outline">Evidence requirements</Badge>
          <h2>Benchmark pages should be useful before they are flattering.</h2>
          <p>
            The site can show benchmark surfaces today, but it cannot claim speed wins until the repository contains
            repeatable commands, raw result files, and methodology notes reviewers can inspect. The route-discovery,
            manifest-size, graph-query, and adapter-dispatch run commands return raw local metadata, while status commands
            remain useful for incomplete surfaces.
          </p>
        </div>
        <div className="evidence-checklist" aria-label="Benchmark evidence requirements">
          {evidenceRules.map((rule) => (
            <div key={rule}>
              <span aria-hidden="true" />
              <p>{rule}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="artifact-card-grid" aria-label="Benchmark artifacts">
        {benchmarkArtifacts.map((artifact) => {
          const Icon = artifact.icon;
          return (
            <Card className="artifact-card" key={artifact.title}>
              <CardHeader>
                <div className="feature-icon">
                  <Icon aria-hidden="true" size={18} />
                </div>
                <CardTitle>{artifact.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <code>{artifact.path}</code>
                <Badge
                  variant={
                    artifact.status === "Implemented"
                      ? "success"
                      : artifact.status === "Planned"
                        ? "warning"
                        : "secondary"
                  }
                >
                  {artifact.status}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="callout-band compact-callout">
        <div>
          <Badge variant="outline">No comparisons</Badge>
          <h2>Status surface, not a speed claim.</h2>
        </div>
        <p>
          This page intentionally avoids framework comparisons until benchmark fixtures, raw results, methodology,
          and repeatable commands exist in the repository.
        </p>
      </section>
    </main>
  );
}
