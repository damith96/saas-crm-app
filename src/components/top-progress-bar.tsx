"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

let timer: NodeJS.Timeout;
let state: "loading" | "stop";
let activeRequests = 0;
const delay = 250; // Delay before showing progress bar

function load() {
  if (state === "loading") return;
  state = "loading";

  timer = setTimeout(() => {
    NProgress.start();
  }, delay);
}

function stop() {
  if (activeRequests > 0) return;
  state = "stop";

  clearTimeout(timer);
  NProgress.done();
}

export default function TopProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    load();
    const timeout = setTimeout(() => stop(), 500);

    return () => {
      clearTimeout(timeout);
      stop();
    };
  }, [pathname]);

  // Intercept Fetch Requests
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      if (activeRequests === 0) load();
      activeRequests++;

      try {
        const response = await originalFetch(...args);
        return response;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        activeRequests--;
        if (activeRequests === 0) stop();
      }
    };

    return () => {
      window.fetch = originalFetch; // Cleanup on unmount
    };
  }, []);

  return null;
}
