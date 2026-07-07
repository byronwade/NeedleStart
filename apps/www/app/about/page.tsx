import { Braces, FileSearch, GitBranch, ShieldCheck } from "lucide-react";
import { DocsCta, PageHeader } from "../../components/PageHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const principles = [
  {
    title: "App graph first",
    description: "Routes, layouts, render modes, generated files, and source relationships are emitted as inspectable framework evidence.",
    icon: GitBranch,
  },
  {
    title: "SEO-safe by default",
    description: "The public direction favors static output first, then explicit SSR only where the route contract needs it.",
    icon: FileSearch,
  },
  {
    title: "Agent-auditable",
    description: "Agents should read contracts and generated artifacts instead of guessing how a React app is wired together.",
    icon: ShieldCheck,
  },
  {
    title: "Typed contracts",
    description: "Shared route, render, diagnostic, cache, and adapter models live in core packages instead of local copies.",
    icon: Braces,
  },
];

export default function AboutPage() {
  return (
    <main className="page-shell" id="main-content">
      <PageHeader
        eyebrow="Project thesis"
        title="Why Lumina Exists"
        description="Lumina is being built for React applications that need route structure, render behavior, generated artifacts, and agent context to stay visible as the codebase grows."
      >
        <DocsCta />
      </PageHeader>

      <section className="page-grid">
        {principles.map((principle) => {
          const Icon = principle.icon;
          return (
            <Card className="principle-card" key={principle.title}>
              <CardHeader>
                <div className="feature-icon">
                  <Icon aria-hidden="true" size={18} />
                </div>
                <CardTitle>{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{principle.description}</p>
                <Badge variant="success">MVP aligned</Badge>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="callout-band">
        <div>
          <Badge variant="warning">Current focus</Badge>
          <h2>First prove the framework evidence loop.</h2>
        </div>
        <p>
          The current MVP work is focused on deterministic app discovery, compact manifests, static build output,
          and inspection commands before broader runtime behavior expands.
        </p>
      </section>
    </main>
  );
}
