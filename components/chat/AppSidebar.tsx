import React from "react";
import { ChatSideBar } from "@/components/chat/ChatSideBar";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AppSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <ChatSideBar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Navbar />
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
