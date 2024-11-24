"use client";
import AddPost from "@/components/chat/AddPost";
import SideBar from "@/components/chat/SideBar";

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto">
      <div className="flex">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        <AddPost />
      </div>
    </div>
  );
}
