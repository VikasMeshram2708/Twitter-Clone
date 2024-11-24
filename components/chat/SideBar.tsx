"use client"
import { Home, LogOut, Search, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("Home");

  const navigationItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Home",
      href: "/",
    },
    {
      icon: <Search className="w-5 h-5" />,
      label: "Search",
      href: "/search",
    },
    {
      icon: <UserCircle className="w-5 h-5" />,
      label: "Profile",
      href: "/profile",
    },
  ];

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };
  return (
    <div className="min-h-screen w-64 bg-background border-r flex flex-col">
      {/* Logo Area */}
      {/* <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div> */}

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => setActiveItem(item.label)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  activeItem === item.label
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer with Logout */}
      <div className="p-4 border-t mt-auto">
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
