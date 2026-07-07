import { ArrowRight } from "lucide-react";
import { GraphRelationshipTree } from "./GraphRelationshipTree";
import { Badge } from "./ui/badge";

export function Hero() {
  return (
    <section className="section-shell hero-section" aria-label="Lumina home hero">
      <div className="hero-copy">
        <Badge variant="success">App-graph-native React framework</Badge>
        <p className="eyebrow">Build like Next.js. Type like TanStack Start.</p>
        <h1>Your app ships with a map.</h1>
        <p>
          Lumina is being built to make routes, render modes, generated artifacts, and
          agent-safe inspection explicit from the first local workflow.
        </p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="ui-button ui-button-default ui-button-size-lg" href="/docs">
            Read the docs
            <ArrowRight aria-hidden="true" size={18} />
          </a>
          <a className="ui-button ui-button-outline ui-button-size-lg" href="/examples">
            View examples
          </a>
        </div>
        <div className="hero-proof" aria-label="Current proof points">
          <Badge variant="outline">Route discovery</Badge>
          <Badge variant="outline">Static build</Badge>
          <Badge variant="outline">Hydration proof</Badge>
        </div>
      </div>

      <div className="hero-visual">
        <GraphRelationshipTree />
      </div>
    </section>
  );
}
