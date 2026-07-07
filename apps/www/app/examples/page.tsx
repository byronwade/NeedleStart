import { ExampleCard } from "../../components/ExampleCard";

export default function ExamplesPage() {
  return (
    <main>
      <h1>Examples</h1>
      <ExampleCard name="Basic" status="Scaffolded" path="examples/basic" />
      <ExampleCard name="Blog SEO" status="Scaffolded" path="examples/blog-seo" />
    </main>
  );
}
