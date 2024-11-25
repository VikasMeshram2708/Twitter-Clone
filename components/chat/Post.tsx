/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useQuery } from "@tanstack/react-query";
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

export default function Post() {
  const { data: currUser } = useSession();
  const { data, isLoading } = useQuery<Post>({
    queryKey: ["Chat"],
    queryFn: async () => {
      const res = await fetch("/api/ch/readall");
      const result = await res.json();
      return result;
    },
  });

  if (isLoading) {
    return <p className="loader"></p>;
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"}>
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Choose Action</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Visit Profile</DropdownMenuItem>
                  <DropdownMenuItem>Report Post</DropdownMenuItem>
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
