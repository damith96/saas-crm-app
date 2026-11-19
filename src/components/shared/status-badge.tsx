import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

type StatusVariant = "success" | "warning" | "danger" | "info" | "secondary";

interface StatusBadgeProps {
  children: ReactNode;
  variant?: StatusVariant;
}

const variantStyles: Record<StatusVariant, string> = {
  success:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",

  warning:
    "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-300",

  danger:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",

  info: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",

  secondary: "border-border bg-muted text-muted-foreground",
};

export function StatusBadge({
  children,
  variant = "secondary",
}: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={variantStyles[variant]}>
      {children}
    </Badge>
  );
}
