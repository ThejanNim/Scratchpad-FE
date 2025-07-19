import { useGetCollectionsByUser } from "@/api/collection";
import { useGetUser } from "@/api/user";
import { SidebarProvider } from "@/components/atoms/Sidebar/Sidebar";
import Header from "@/components/organisms/Header/Header";
import NavSidebar from "@/components/organisms/NavSidebar/NavSidebar";
import { Outlet } from "react-router";

export default function EditorTemplate() {
  const { data: user } = useGetUser();
  const { data: collections } = useGetCollectionsByUser(user?.id || "");

  return (
    <>
      <SidebarProvider defaultOpen={true} open={true} onOpenChange={() => {}}>
        <NavSidebar
          collections={collections ?? null}
          user={user}
          handleSignOut={() => {}}
          collapsible="offcanvas"
        />
        <main className="w-full">
          <Header />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}
