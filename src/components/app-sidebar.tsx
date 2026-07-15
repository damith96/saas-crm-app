"use client";
import React from "react";

export function AppSidebar() {
  return (
    <aside className="w-64 h-full bg-gray-50 border-r p-4">
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-sm hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:underline">
              Leads
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:underline">
              Contacts
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:underline">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AppSidebar;
