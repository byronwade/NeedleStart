import { DocsArticlePage } from "../../../../components/DocsArticle";
import { getDocsArticle } from "../../../../lib/docs-content";

export default function DocsCreateAppPage() {
  return <DocsArticlePage article={getDocsArticle("guides/create-app")} />;
}
