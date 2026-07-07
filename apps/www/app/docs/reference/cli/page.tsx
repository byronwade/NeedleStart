import { DocsArticlePage } from "../../../../components/DocsArticle";
import { getDocsArticle } from "../../../../lib/docs-content";

export default function DocsCliReferencePage() {
  return <DocsArticlePage article={getDocsArticle("reference/cli")} />;
}
