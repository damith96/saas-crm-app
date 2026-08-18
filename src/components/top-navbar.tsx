"use client";

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { CustomeSidebarTrigger } from "./custom-bar";

export function TopNavbar() {
  return (
    <header className="w-full h-14 flex items-center gap-2 px-4 bg-white border-b">
      <SidebarTrigger className="-ml-1" />
      <div>
        <input
          type="search"
          placeholder="Search"
          className="border rounded px-2 py-1 text-sm"
        />
      </div>
    </header>
  );
}

export default TopNavbar;
