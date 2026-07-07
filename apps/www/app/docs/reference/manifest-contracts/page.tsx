import { DocsArticlePage } from "../../../../components/DocsArticle";
import { getDocsArticle } from "../../../../lib/docs-content";

export default function DocsManifestContractsPage() {
  return <DocsArticlePage article={getDocsArticle("reference/manifest-contracts")} />;
}
