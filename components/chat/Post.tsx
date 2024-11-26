/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import {
  Bookmark,
  EllipsisVertical,
  Heart,
  MessageSquareMore,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeletePostMutation,
  useFetchAllPostsQuery,
} from "@/app/store/chats/chatSlice";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Post() {
  const { data: currUser } = useSession();
  const { data, isLoading } = useFetchAllPostsQuery();
  const [isOwner, setIsOwner] = useState(false);

  const [deletePost, { error }] = useDeletePostMutation();

  function handleDropDown(userPostId: number) {
    const postUserId = userPostId;
    // @ts-ignore
    const currentUserId = currUser?.user?.id;

    if (postUserId == currentUserId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }

  async function handleDelete(postId: number) {
    console.log("did", postId);
    const res = await deletePost({ chatId: postId });
    console.log("res", res);
    console.log("err", error);

    if (!res || res.error) {
      return toast.error(
        String(res?.data) || "An Error Occurred. Failed to Delete Post"
      );
    }

    return toast.success(res?.data || "Post Deleted");
  }

  if (isLoading) {
    return (
      <div className="container max-w-2xl mx-auto">
        <p className="loader"></p>;
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto">
      {data?.posts?.map((post) => (
        <Card key={post.id} className="mb-4">
          <CardHeader className="grid gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {/* @ts-ignore */}
                    {currUser?.user?.username?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm font-bold">
                  {/* @ts-ignore */}
                  <span>@{currUser?.user?.username || "Anonymous"}</span>
                </CardTitle>
              </div>
              <DropdownMenu onOpenChange={() => handleDropDown(post?.User?.id)}>
                <DropdownMenuTrigger asChild>
                  <Button type="submit">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Choose Action</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Visit Profile</DropdownMenuItem>
                  <DropdownMenuItem>Report Post</DropdownMenuItem>
                  {isOwner && (
                    <DropdownMenuItem onClick={() => handleDelete(post?.id)}>
                      Delete Post
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>{post.content}</CardDescription>
          </CardHeader>
          <CardContent>
            {post.img_url && (
              <Image
                src={post.img_url}
                alt={post.content}
                width={500}
                height={500}
                className="rounded object-contain"
              />
            )}
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="cursor-pointer hover:text-red-500"
                aria-label="Like post"
              >
                <Heart />
              </button>
              <button
                type="button"
                className="cursor-pointer hover:text-gray-500"
                aria-label="Comment on post"
              >
                <MessageSquareMore />
              </button>
              <button
                type="button"
                className="cursor-pointer hover:text-blue-500"
                aria-label="Bookmark post"
              >
                <Bookmark />
              </button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
