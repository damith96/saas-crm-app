"use client";

import { AppLayout } from "@/components/app-layout";
import { AuthGuard } from "@/guards/auth.guard";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <AppLayout>{children}</AppLayout>
    </AuthGuard>
  );
}
