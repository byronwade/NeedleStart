import { DocsArticlePage } from "../../../components/DocsArticle";
import { getDocsArticle } from "../../../lib/docs-content";

export default function DocsGuidesPage() {
  return <DocsArticlePage article={getDocsArticle("guides")} />;
}
