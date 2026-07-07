import { BookOpen, FileCode2, Search, ShieldCheck } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { docsArticles, docsNavGroups, publicDocsPages } from "../../lib/docs-content";

const featuredDocs = docsArticles.filter((article) =>
  ["start", "concepts/app-graph", "reference/cli", "reference/routing"].includes(article.slug),
);

const referenceLanes = publicDocsPages.filter((article) => article.lane === "Reference");

export default function DocsPage() {
  return (
    <main className="docs-page" id="main-content">
      <PageHeader
        eyebrow="Public documentation"
        title="Documentation"
        description="A Next.js-style docs surface for the whole Lumina project: quick start, concepts, guides, contracts, operations, and implementation status in one readable system."
      />

      <section className="docs-browser">
        <aside className="docs-sidebar" aria-label="Documentation sections">
          <div className="docs-search">
            <Search aria-hidden="true" size={16} />
            <span>Search docs</span>
            <kbd>Planned</kbd>
          </div>
          {docsNavGroups.map((group) => (
            <nav className="docs-nav-group" key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              {group.links.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.title}
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <div className="docs-content" id="docs-content">
          <div className="docs-intro">
            <Badge variant="success">Canonical source: docs/</Badge>
            <h2>Read from overview to contract without losing the project map.</h2>
            <p>
              The source Markdown files remain canonical today. This public layer now has static docs routes for the
              main lanes, while full Markdown rendering, generated sidebars, search indexing, and frontmatter parsing
              remain planned.
            </p>
          </div>

          <div className="docs-feature-grid">
            {featuredDocs.map((doc) => {
              const Icon = doc.icon;
              return (
                <a className="doc-card-link" href={doc.href} key={doc.title}>
                  <Card className="doc-card">
                    <CardHeader>
                      <div className="feature-icon">
                        <Icon aria-hidden="true" size={18} />
                      </div>
                      <CardTitle>{doc.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{doc.description}</p>
                      <code>{doc.source}</code>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>

          <section className="reference-section">
            <div>
              <BookOpen aria-hidden="true" size={20} />
              <h2>Reference lanes</h2>
              <p>
                Contract pages define stable behavior before the public site renders every Markdown document as an
                individual generated route.
              </p>
            </div>
            <div className="reference-pills">
              {referenceLanes.map((lane) => (
                <a href={lane.href} key={lane.href}>
                  {lane.title}
                </a>
              ))}
            </div>
          </section>

          <section className="docs-lane-grid" aria-label="Documentation lanes">
            {docsNavGroups.map((group) => (
              <Card className="docs-lane-card" key={group.title}>
                <CardHeader>
                  <div className="feature-icon">
                    <FileCode2 aria-hidden="true" size={18} />
                  </div>
                  <CardTitle>{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {group.links.map((link) => (
                    <a href={link.href} key={link.href}>
                      <span>{link.title}</span>
                      <Badge
                        variant={
                          link.status === "Current" || link.status === "Implemented"
                            ? "success"
                            : link.status === "Planned"
                              ? "warning"
                              : "secondary"
                        }
                      >
                        {link.status}
                      </Badge>
                    </a>
                  ))}
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="docs-status-panel">
            <ShieldCheck aria-hidden="true" size={20} />
            <div>
              <h2>Docs status stays explicit.</h2>
              <p>
                Implemented, scaffolded, planned, and verified states stay visible so the public docs can look polished
                without blurring what the framework can prove today.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
