import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/atoms/Sidebar/Sidebar";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { ICollection, IDocumentItem } from "../NavSidebar";
import { useCreateCollection, useGetCollectionsByUser } from "@/api/collection";
import NavSidebarCollectionTree from "./NavSidebarCollectionTree/NavSidebarCollectionTree";
import { useGetUser } from "@/api/user";
import { useGetDocumentsByCollections } from "@/api/document";
import { useParams } from "react-router";

export default function NavSidebarCollections() {
  const { id } = useParams<{ id: string }>();
  const { data: user } = useGetUser();
  const { data: collections } = useGetCollectionsByUser(user?.id || "");
  const { data: documents } = useGetDocumentsByCollections(
    collections?.map((c) => c.id) || []
  );
  const { createCollection, isMutating } = useCreateCollection();

  const [openSections, setOpenSections] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedOpenSections = localStorage.getItem("collection-open-sections");
    if (savedOpenSections) {
      try {
        const parsedSections = JSON.parse(savedOpenSections);
        setOpenSections(parsedSections);
      } catch (error) {
        console.error("Error parsing saved open sections:", error);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save openSections to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        "collection-open-sections",
        JSON.stringify(openSections)
      );
    }
  }, [openSections, isHydrated]);

  const toggleSection = (collectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  const buildTree = (
    parentId: string | null = null
  ): (ICollection | IDocumentItem)[] => {
    const items: (ICollection | IDocumentItem)[] = [];

    // Add child collections
    const childCollections = collections?.filter(
      (c) => c.parent_id === parentId
    );

    if (childCollections) {
      items.push(...childCollections);
    }

    // Add documents for this collection
    if (parentId) {
      const collectionDocuments = documents?.filter(
        (d) => d.collection_id === parentId
      );
      if (collectionDocuments) {
        items.push(...collectionDocuments);
      }
    }

    return items;
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Collections</SidebarGroupLabel>
      <SidebarGroupAction
        onClick={async () => {
          if (!user?.id) {
            console.error("User not authenticated");
            return;
          }

          const collectionName = prompt("Enter collection name:");
          if (collectionName !== null) {
            // Check if user didn't cancel
            try {
              await createCollection({
                collectionName: collectionName || "New Collection",
                parentId: null,
                userId: user.id,
              });
            } catch (error) {
              console.error("Failed to create collection:", error);
            }
          }
        }}
      >
        <Plus className="size-4" />
        <span className="sr-only">Add Collection</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          <NavSidebarCollectionTree
            buildTree={buildTree}
            parentId={null}
            openSections={openSections}
            collections={collections}
            documents={documents}
            toggleSection={toggleSection}
            isLoading={isMutating}
            handleDocumentAction={() => {}}
            documentId={id ?? ""}
          />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
