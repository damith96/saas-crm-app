"use client";
import React from "react";
import TopNavbar from "./top-navbar";
import AppSidebar from "./app-sidebar";

type Props = {
  children: React.ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
