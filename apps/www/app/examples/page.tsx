import { ExampleCard } from "../../components/ExampleCard";
import { PageHeader } from "../../components/PageHeader";
import { Badge } from "../../components/ui/badge";

export default function ExamplesPage() {
  return (
    <main className="page-shell" id="main-content">
      <PageHeader
        eyebrow="Examples"
        title="Examples"
        description="Starter and fixture apps show what the current compiler can prove. Labels stay conservative until each example has build and inspection evidence."
      />

      <section className="examples-layout">
        <div className="examples-intro">
          <Badge variant="success">Current inventory</Badge>
          <h2>Example apps should double as verification fixtures.</h2>
          <p>
            The public examples surface mirrors the repository catalog without claiming unimplemented framework behavior.
          </p>
        </div>
        <div className="examples-grid">
          <ExampleCard name="Basic" status="Verified" path="examples/basic" />
          <ExampleCard name="Blog SEO" status="Scaffolded" path="examples/blog-seo" />
        </div>
      </section>
    </main>
  );
}
