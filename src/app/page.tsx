"use client";

import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      router.replace("/auth/login");
      //router.replace("/auth/dashboard");
    } else {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  return null;
}
