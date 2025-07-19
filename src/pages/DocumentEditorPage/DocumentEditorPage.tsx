import { useGetDocumentById, useUpdateDocument } from "@/api/document";
import Editor from "./components/organisms/DocumentEditor/Editor";
import { useParams } from "react-router";

export default function DocumentEditorPage() {
  const { id } = useParams<{ id: string }>();
  const { data: document } = useGetDocumentById(id ?? "");

  const { updateDocument } = useUpdateDocument();

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex-1 flex flex-col justify-between overflow-y-hidden overflow-x-hidden">
        {document ? (
          <Editor
            key={document.id}
            title={document?.title}
            value={document?.content}
            documentId={id ?? ""}
            onChange={updateDocument}
          />
        ) : (
          <p>Loading document...</p>
        )}
      </div>
    </div>
  );
}
