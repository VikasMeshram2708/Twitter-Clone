import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <header className="w-full border-b shadow p-2">
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Twitter</Link>
        </h1>

        <ModeToggle />
      </nav>
    </header>
  );
}
