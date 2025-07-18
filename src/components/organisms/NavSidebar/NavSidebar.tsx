/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/Sidebar/Sidebar";
import { CircleDot } from "lucide-react";
import React from "react";
import { NavSidebarFooter } from "./NavSidebarFooter/NavSidebarFooter";
import { NavSecondary } from "./NavSecondary/NavSecondary";
import { IconHelp, IconSearch, IconSettings } from "@tabler/icons-react";
import NavSidebarCollections from "./NavSidebarCollections/NavSidebarCollections";

export interface ICollection {
  id: string;
  name: string;
  parent_id?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface IDocumentItem {
  id: string;
  collection_id: string;
  title: string;
  content?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

interface NavSidebarProps extends React.ComponentProps<typeof Sidebar> {
  collections: ICollection[] | null;
  documents: IDocumentItem[] | null;
  user?: any | null;
  handleSignOut: any;
  collapsible?: "icon" | "offcanvas" | "none";
}

const navSecondary = [
  {
    title: "Settings",
    url: "#",
    icon: IconSettings,
  },
  {
    title: "Get Help",
    url: "#",
    icon: IconHelp,
  },
  {
    title: "Search",
    url: "#",
    icon: IconSearch,
  },
];

export default function NavSidebar({
  collections = [],
  documents = [],
  user = [],
  collapsible = "offcanvas",
  ...props
}: NavSidebarProps) {
  return (
    <Sidebar collapsible={collapsible} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <CircleDot className="!size-5" />
                <span className="text-base font-semibold">Scratchpad</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {collections?.length === 0 && documents?.length === 0 ? (
          <div className="text-sm text-muted-foreground p-2">
            No collections found
          </div>
        ) : (
          <NavSidebarCollections />
        )}

        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <NavSidebarFooter user={user} />
    </Sidebar>
  );
}
