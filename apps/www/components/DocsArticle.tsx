import { ArrowRight, FileText } from "lucide-react";
import type { DocsArticle } from "../lib/docs-content";
import { getMarkdownHeadings, MarkdownBody } from "./MarkdownBody";
import { DocsSidebar } from "./DocsSidebar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function statusVariant(status: DocsArticle["status"]) {
  if (status === "Current" || status === "Implemented") return "success";
  if (status === "Scaffolded") return "secondary";
  return "warning";
}

export function DocsArticlePage({ article }: { article: DocsArticle }) {
  const Icon = article.icon;
  const headings = article.markdown ? getMarkdownHeadings(article.markdown).filter((heading) => heading.depth === 2 || heading.depth === 3) : [];

  return (
    <main className="docs-page docs-article-page" id="main-content">
      <DocsSidebar activeHref={article.href} headings={headings} showBackLink />

      <article className="docs-article">
        <header className="docs-article-header">
          <div className="docs-article-icon">
            <Icon aria-hidden="true" size={22} />
          </div>
          <div className="docs-article-heading">
            <div className="docs-article-kicker">
              <Badge variant={statusVariant(article.status)}>{article.status}</Badge>
              <span>{article.lane}</span>
            </div>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
          </div>
        </header>

        <section className="docs-source-panel" aria-label="Source document">
          <FileText aria-hidden="true" size={18} />
          <div>
            <span>Canonical source</span>
            <code>{article.source}</code>
          </div>
        </section>

        {article.markdown ? (
          <MarkdownBody markdown={article.markdown} source={article.source} />
        ) : (
          <div className="docs-article-sections">
            {article.sections.map((section) => (
              <section className="docs-prose-section" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        )}

        <Card className="docs-next-card">
          <CardHeader>
            <CardTitle>Keep reading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="docs-next-links">
              {article.links.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                  <ArrowRight aria-hidden="true" size={14} />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </article>
    </main>
  );
}
