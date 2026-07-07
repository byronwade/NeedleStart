import { DocsArticlePage } from "../../../../components/DocsArticle";
import { getDocsArticle } from "../../../../lib/docs-content";

export default function DocsRoutingReferencePage() {
  return <DocsArticlePage article={getDocsArticle("reference/routing")} />;
}
