"use client";
import React from "react";

export function TopNavbar() {
  return (
    <header className="w-full h-14 flex items-center justify-between px-4 bg-white border-b">
      <div className="text-lg font-bold">Vertex CRM</div>
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
