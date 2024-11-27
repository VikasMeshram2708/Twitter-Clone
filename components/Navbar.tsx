"use client"

import Link from "next/link";
import React, { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { 
  Menu, 
  Home, 
  Search, 
  UserCircle, 
  LogOut,
  Twitter as TwitterIcon 
} from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <TwitterIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold sm:inline-block">
              Twitter
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
            
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-accent"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <TwitterIcon className="h-5 w-5" />
                      <span>Twitter</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-8 flex flex-col space-y-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                          pathname === item.href 
                            ? "bg-accent text-accent-foreground" 
                            : "text-muted-foreground"
                        )}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 border-t">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}