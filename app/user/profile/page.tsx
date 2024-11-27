/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useFetchMeQuery } from "@/app/store/user/userSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: userData } = useSession();
  const { data, isLoading } = useFetchMeQuery();

  // Show loader while data is loading
  if (!data || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loader"></div> {/* You can use a spinner here */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-3xl p-6 rounded-xl shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            {/* Avatar and Username */}
            <Avatar className="w-20 h-20 border-4">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User Avatar"
              />
              <AvatarFallback className="text-xl font-semibold">
                {/* @ts-ignore */}
                {userData?.user?.username[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-3xl font-semibold capitalize">
                {data?.data.username}
              </CardTitle>
              <CardDescription className="text-lg">
                {data?.data.email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 mt-4">
          <p className="text-lg">
            <span className="font-semibold">Joined At: </span>
            {new Date(data?.data?.createdAt).toLocaleDateString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Last Updated: </span>
            {new Date(data?.data?.updatedAt).toLocaleDateString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </CardContent>

        <CardFooter className="rounded-b-xl py-3">
          <p className="text-lg">
            <span className="font-semibold">Total Posts: </span>
            {data?.data?._count?.chat}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
