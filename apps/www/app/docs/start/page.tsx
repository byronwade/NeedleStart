import { DocsArticlePage } from "../../../components/DocsArticle";
import { getDocsArticle } from "../../../lib/docs-content";

export default function DocsStartPage() {
  return <DocsArticlePage article={getDocsArticle("start")} />;
}
