"use client";
import AddPost from "@/components/chat/AddPost";
import Post from "@/components/chat/Post";
import SideBar from "@/components/chat/SideBar";

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto w-full">
      <div className="flex gap-56">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        <div className="border p-2 flex flex-col gap-3">
          <AddPost />
          <Post />
        </div>
      </div>
    </div>
  );
}
