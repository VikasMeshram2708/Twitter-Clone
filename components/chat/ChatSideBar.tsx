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
import { Home, LogOut, Settings, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const navigationItems = [
  {
    icon: <Home className="w-5 h-5" />,
    label: "Home",
    href: "/",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Setting",
    href: "/settings",
  },
  {
    icon: <UserCircle className="w-5 h-5" />,
    label: "Profile",
    href: "/profile",
  },
];

export function ChatSideBar() {
  async function handleLogout() {
    try {
      await signOut();
    } catch (error) {
      console.error(`Something went wrong. Please try again.${error}`);
    }
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
                    <p>
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </p>
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
