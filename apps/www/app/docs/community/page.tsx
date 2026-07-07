import { DocsArticlePage } from "../../../components/DocsArticle";
import { getDocsArticle } from "../../../lib/docs-content";

export default function DocsCommunityPage() {
  return <DocsArticlePage article={getDocsArticle("community")} />;
}
