import { CheckCircle2, CircleDashed, FileJson, Rocket } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Badge } from "../../components/ui/badge";

const roadmap = [
  {
    title: "Route, render, map, and inspect artifacts",
    status: "Implemented",
    icon: CheckCircle2,
  },
  {
    title: "First marketing app and example fixtures",
    status: "Implemented",
    icon: CheckCircle2,
  },
  {
    title: "Vite dev integration",
    status: "Implemented",
    icon: FileJson,
  },
  {
    title: "Static build and Bun adapter start path",
    status: "Implemented",
    icon: Rocket,
  },
  {
    title: "Expanded docs routing and searchable public docs",
    status: "Planned",
    icon: CircleDashed,
  },
];

export default function RoadmapPage() {
  return (
    <main className="page-shell" id="main-content">
      <PageHeader
        eyebrow="Alpha path"
        title="Roadmap"
        description="The public roadmap separates implemented proof from planned framework expansion so the site stays useful without overclaiming the current scaffold."
      />

      <section className="roadmap-panel">
        <div className="roadmap-rail" aria-hidden="true" />
        {roadmap.map((item) => {
          const Icon = item.icon;
          return (
            <article className="roadmap-item" key={item.title}>
              <div className="roadmap-icon">
                <Icon aria-hidden="true" size={18} />
              </div>
              <div>
                <h2>{item.title}</h2>
                <Badge variant={item.status === "Implemented" ? "success" : "secondary"}>{item.status}</Badge>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
