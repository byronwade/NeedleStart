import { DocsArticlePage } from "../../../../components/DocsArticle";
import { getDocsArticle } from "../../../../lib/docs-content";

export default function DocsAppGraphPage() {
  return <DocsArticlePage article={getDocsArticle("concepts/app-graph")} />;
}
