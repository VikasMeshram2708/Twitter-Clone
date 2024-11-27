import AddPost from "@/components/chat/AddPost";
import Post from "@/components/chat/Post";

export default function Home() {
  return (
    <div className="grid gap-3">
      <AddPost />
      <Post />
    </div>
  );
}
