/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "lucide-react";

export default function Navbar() {
  const { data, status } = useSession();

  async function handleLogout() {
    try {
      await signOut();
    } catch (error) {
      console.error(`Something went wrong. Please try again. ${error}`);
    }
  }
  return (
    <header className="w-full border-b shadow p-2">
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Twitter</Link>
        </h1>
        <div className="flex items-center gap-2">
          {status === "loading" ? (
            <span className="text-sm font-bold">processing...</span>
          ) : status === "authenticated" ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button">
                    <UserCircle />
                    {/* @ts-ignore */}
                    <span className="capitalize">{data?.user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button>
              <Link href="/user/login">Login / Sign Up</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
