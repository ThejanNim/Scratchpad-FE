/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChevronRight,
  Copy,
  Edit,
  Folder,
  MoreVertical,
  Plus,
  Trash2,
  File,
  MoreHorizontal,
} from "lucide-react";
import type { ICollection, IDocumentItem } from "../../NavSidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/atoms/Collapsible/Collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/atoms/Sidebar/Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/DropdownMenu/DropdownMenu";
import { Button } from "@/components/atoms/Button/Button";
import { useGetUser } from "@/api/user";
import { useCreateCollection } from "@/api/collection";
import { useCreateDocument } from "@/api/document";
import { NavLink } from "react-router";
import clsx from "clsx";

export interface DocumentItemProps {
  document: IDocumentItem;
  level?: number;
  isLoading: boolean;
  handleDocumentAction: (
    documentId: string,
    action: "rename" | "duplicate" | "delete"
  ) => void;
}

interface NavSidebarCollectionTreeProps
  extends Pick<
    DocumentItemProps,
    "level" | "isLoading" | "handleDocumentAction"
  > {
  buildTree: (parentId: string | null) => (ICollection | IDocumentItem)[];
  parentId: string | null;
  openSections: string[];
  collections: any[] | undefined;
  documents: any[] | undefined;
  toggleSection: (sectionId: string) => void;
  documentId: string | null;
}

export default function NavSidebarCollectionTree({
  buildTree,
  parentId,
  openSections,
  collections,
  documents,
  level = 0,
  isLoading,
  handleDocumentAction,
  toggleSection,
  documentId,
}: NavSidebarCollectionTreeProps) {
  const { data: user } = useGetUser();
  const { createCollection } = useCreateCollection();
  const { createDocument } = useCreateDocument();

  const items = buildTree(parentId);

  return items.map((item) => {
    const isCollection = "parent_id" in item && !("collection_id" in item);
    const isOpen = openSections.includes(item.id);

    if (isCollection) {
      const collection = item as ICollection;
      const hasChildren =
        collections?.some((c) => c.parent_id === collection.id) ||
        (documents?.some((d) => d.collection_id === collection.id) ?? false);

      return (
        <Collapsible
          key={collection.id}
          open={isOpen}
          onOpenChange={() => toggleSection(collection.id)}
          className="group/collapsible pl-2"
        >
          <SidebarMenuItem>
            <div className="flex items-center group/collection-item">
              <SidebarMenuButton
                className="flex-1"
                style={{ paddingLeft: `${level * 1}rem` }}
              >
                <CollapsibleTrigger
                  asChild
                  className="hover:bg-gray-200 hover:rounded"
                >
                  {hasChildren && (
                    <ChevronRight
                      className={clsx(
                        "transition-transform size-4",
                        isOpen && "rotate-90"
                      )}
                    />
                  )}
                </CollapsibleTrigger>

                <NavLink to={`/collection/${collection.id}`}>
                  <div className="flex items-center gap-2 whitespace-nowrap overflow-ellipsis overflow-hidden min-w-0">
                    <Folder width={16} height={16} className="shrink-0" />
                    <span className="truncate">{collection.name}</span>
                  </div>
                </NavLink>
              </SidebarMenuButton>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover/collection-item:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isLoading}
                  >
                    <MoreVertical className="h-3 w-3" />
                    <span className="sr-only">Collection options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="right">
                  <DropdownMenuItem onClick={() => {}} disabled={isLoading}>
                    <Edit className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}} disabled={isLoading}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {}}
                    className="text-red-600 focus:text-red-600"
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover/collection-item:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                    disabled={isLoading}
                  >
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Collection options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="right">
                  <DropdownMenuItem
                    onClick={() => {
                      createDocument({
                        collection_id: collection.id,
                        title: "New Document",
                        content: [],
                      });
                    }}
                    disabled={isLoading}
                  >
                    <File className="h-4 w-4 mr-2" />
                    Add a doc
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const collectionName = prompt("Enter collection name:");
                      createCollection({
                        collectionName: collectionName || "New Collection",
                        parentId: collection.id,
                        userId: user?.id || "",
                      });
                    }}
                    disabled={isLoading}
                  >
                    <Folder className="h-4 w-4 mr-2" />
                    Add a collection
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <CollapsibleContent>
              <SidebarMenuSub>
                <NavSidebarCollectionTree
                  parentId={collection.id}
                  level={level + 1}
                  {...{
                    buildTree,
                    openSections,
                    collections,
                    documents,
                    isLoading,
                    handleDocumentAction,
                    toggleSection,
                    documentId,
                  }}
                />
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    } else {
      const document = item as IDocumentItem;

      return (
        <SidebarMenuSubItem key={document.id}>
          <div className="flex items-center group/item w-full">
            <SidebarMenuSubButton
              asChild
              className={`flex-1 ${
                documentId === document.id ? "bg-gray-200" : ""
              }`}
              style={{ paddingLeft: `${level * 1}rem` }}
            >
              <NavLink
                to={`/documents/${document.id}`}
                onClick={() => {
                  //   setDocumentId(document.id);
                }}
              >
                <File className="size-3" />
                <span>{document.title}</span>
              </NavLink>
            </SidebarMenuSubButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 opacity-0 group-hover/item:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                  disabled={isLoading}
                >
                  <MoreHorizontal className="h-3 w-3" />
                  <span className="sr-only">Document options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="right">
                <DropdownMenuItem
                  onClick={() => handleDocumentAction(document.id, "rename")}
                  disabled={isLoading}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDocumentAction(document.id, "duplicate")}
                  disabled={isLoading}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDocumentAction(document.id, "delete")}
                  className="text-red-600 focus:text-red-600"
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarMenuSubItem>
      );
    }
  });
}
