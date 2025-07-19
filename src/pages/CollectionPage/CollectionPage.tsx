import { useGetDocumentsByCollections } from "@/api/document";
import DocumentGrid from "./components/organisms/DocumentGrid/DocumentGrid";
import { useParams } from "react-router";

export default function CollectionPage() {
  const { id } = useParams<{ id: string }>();
  const { data: documents } = useGetDocumentsByCollections(id ? [id] : []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl mx-8 pt-4">
        <DocumentGrid documents={documents || []} />
      </div>
    </div>
  );
}
