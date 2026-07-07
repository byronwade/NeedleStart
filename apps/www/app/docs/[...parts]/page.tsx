import { FileCode2 } from "lucide-react";
import { ssr } from "@lumina/react";
import { DocsArticlePage } from "../../../components/DocsArticle";
import { createPublicDocsArticle, findPublicDocsPage } from "../../../lib/docs-content";

export const render = ssr();

export default function PublicDocsCatchAllPage({ params }: { params: { parts: string[] } }) {
  const slug = params.parts.join("/");
  const page = findPublicDocsPage(slug);

  if (!page) {
    return (
      <DocsArticlePage
        article={{
          slug,
          href: `/docs/${slug}`,
          lane: "Docs",
          title: "Docs page not mapped",
          description: "This public docs route is not in the current website content map.",
          status: "Planned",
          source: "docs/website-content-map.md",
          icon: FileCode2,
          sections: [
            {
              title: "No public source page yet",
              body: "The catch-all docs viewer only renders pages listed in the website public-docs inventory. Add a source mapping before treating this route as public documentation.",
            },
          ],
          links: [
            { label: "Docs home", href: "/docs" },
            { label: "Website content map", href: "/docs/reference/project-structure" },
            { label: "Roadmap", href: "/roadmap" },
          ],
        }}
      />
    );
  }

  return <DocsArticlePage article={createPublicDocsArticle(page)} />;
}
