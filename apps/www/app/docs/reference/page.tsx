import { DocsArticlePage } from "../../../components/DocsArticle";
import { getDocsArticle } from "../../../lib/docs-content";

export default function DocsReferencePage() {
  return <DocsArticlePage article={getDocsArticle("reference")} />;
}
