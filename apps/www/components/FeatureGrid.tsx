import { Boxes, FileJson, GitBranch, ShieldCheck } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function FeatureGrid() {
  const features = [
    {
      icon: RouteDiscoveryIcon,
      title: "Deterministic route discovery",
      body: "The compiler reads the app tree into stable route IDs, paths, params, layouts, and render evidence.",
      status: "Implemented",
    },
    {
      icon: FileJson,
      title: "Compact generated manifests",
      body: "Routes, render modes, map edges, build trace, and early performance reports are emitted as reproducible JSON.",
      status: "Implemented",
    },
    {
      icon: GitBranch,
      title: "Route-centered inspection",
      body: "The CLI can inspect the app and explain why the root route exists from source and generated artifacts.",
      status: "Implemented",
    },
    {
      icon: ShieldCheck,
      title: "Evidence-aware speed work",
      body: "Benchmark pages stay honest until measured fixtures exist, so the public site does not overclaim.",
      status: "Guarded",
    },
  ];

  return (
    <section className="section-shell" aria-labelledby="mvp-proof-title">
      <div className="section-heading">
        <Badge variant="secondary">MVP proof points</Badge>
        <h2 id="mvp-proof-title">The first slice is built around inspectable framework evidence.</h2>
        <p>
          The marketing fixture now shows what the current scaffold can actually prove while
          keeping broader framework behavior marked as planned.
        </p>
      </div>
      <div className="feature-grid">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card className="feature-card" key={feature.title}>
              <CardHeader>
                <span className="feature-icon">
                  <Icon aria-hidden="true" size={20} />
                </span>
                <CardTitle>{feature.title}</CardTitle>
                <Badge variant={feature.status === "Guarded" ? "warning" : "success"}>{feature.status}</Badge>
              </CardHeader>
              <CardContent>{feature.body}</CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function RouteDiscoveryIcon(props: { size?: number; "aria-hidden"?: boolean }) {
  return <Boxes {...props} />;
}
