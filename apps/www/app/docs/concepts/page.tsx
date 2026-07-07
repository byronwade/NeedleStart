import { DocsArticlePage } from "../../../components/DocsArticle";
import { getDocsArticle } from "../../../lib/docs-content";

export default function DocsConceptsPage() {
  return <DocsArticlePage article={getDocsArticle("concepts")} />;
}
