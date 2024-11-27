import React from "react";
import AddPost from "@/components/chat/AddPost";
import { ChatSideBar } from "@/components/chat/ChatSideBar";
import Post from "@/components/chat/Post";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
 
  return (
    <SidebarProvider>
      <ChatSideBar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Navbar />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <AddPost />
          <Post />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
