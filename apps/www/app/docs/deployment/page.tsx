import { DocsArticlePage } from "../../../components/DocsArticle";
import { getDocsArticle } from "../../../lib/docs-content";

export default function DocsDeploymentPage() {
  return <DocsArticlePage article={getDocsArticle("deployment")} />;
}
