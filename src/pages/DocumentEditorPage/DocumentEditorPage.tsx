import { useGetDocumentById, useUpdateDocument } from "@/api/document";
import Editor from "./components/organisms/DocumentEditor/Editor";
import NavSidebar from "@/components/organisms/NavSidebar/NavSidebar";
import { useGetUser } from "@/api/user";
import { useGetCollectionsByUser } from "@/api/collection";
import { SidebarProvider } from "@/components/atoms/Sidebar/Sidebar";
import { useParams } from "react-router";
import Header from "@/components/organisms/Header/Header";

export default function DocumentEditorPage() {
  const { id } = useParams<{ id: string }>();
  const { data: document } = useGetDocumentById(id ?? "");

  const { data: user } = useGetUser();
  const { data: collections } = useGetCollectionsByUser(user?.id || "");
  const { updateDocument } = useUpdateDocument();

  return (
    <div>
      <SidebarProvider defaultOpen={true} open={true} onOpenChange={() => {}}>
        <NavSidebar
          collections={collections ?? null}
          documents={document ?? null}
          user={user}
          handleSignOut={() => {}}
          collapsible="offcanvas"
        />
        <div className="h-full flex flex-col w-full">
          <Header onFocusToggle={() => {}} />
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
      </SidebarProvider>
    </div>
  );
}
