"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BellPlus,
  Home,
  LogOut,
  Settings,
  Twitter,
  UserCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const navigationItems = [
  {
    icon: <Home className="w-5 h-5" />,
    label: "Home",
    href: "/",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Setting",
    href: "/soon",
  },
  {
    icon: <UserCircle className="w-5 h-5" />,
    label: "Profile",
    href: "/user/profile",
  },
];

const loggedOutItems = [
  {
    icon: <Home className="w-5 h-5" />,
    label: "Home",
    href: "/",
  },
  {
    icon: <BellPlus className="w-5 h-5" />,
    label: "What's New",
    href: "/soon",
  },
];

export function ChatSideBar() {
  const { data } = useSession();
  async function handleLogout() {
    try {
      await signOut();
    } catch (error) {
      console.error(`Something went wrong. Please try again.${error}`);
    }
  }

  if (!data?.user) {
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <Link href="/">
              <SidebarGroupLabel className="flex gap-2">
                <div>
                  <Twitter size={"24"} />
                </div>
                <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                  Twitter
                </span>
              </SidebarGroupLabel>
            </Link>
            <SidebarGroupContent className="py-10">
              <SidebarMenu>
                {loggedOutItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Link href="/user/login">
            <Button className="w-full" type="button">
              Login
            </Button>
          </Link>
          <Link href="/user/signup">
            <Button className="w-full" type="button" variant={"secondary"}>
              Sign Up
            </Button>
          </Link>
        </SidebarFooter>
      </Sidebar>
    );
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout} type="button" variant={"destructive"}>
          <LogOut />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
