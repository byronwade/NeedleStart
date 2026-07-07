import { Activity, Gauge, TimerReset } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const lanes = [
  {
    title: "Route discovery",
    status: "Skeleton",
    description: "Benchmark fixtures exist as status surfaces; measured results are not claimed yet.",
    icon: Activity,
  },
  {
    title: "Manifest size",
    status: "Skeleton",
    description: "Generated artifact sizes are planned benchmark inputs after fixture coverage expands.",
    icon: Gauge,
  },
  {
    title: "Adapter dispatch",
    status: "Planned",
    description: "Static output is verified today; production SSR/API dispatch benchmarks remain future scope.",
    icon: TimerReset,
  },
];

export default function BenchmarksPage() {
  return (
    <main className="page-shell" id="main-content">
      <PageHeader
        eyebrow="Evidence only"
        title="Benchmarks"
        description="Lumina has benchmark skeletons for route discovery, manifest size, graph queries, and adapter dispatch. They currently report not implemented until measured fixtures exist."
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
