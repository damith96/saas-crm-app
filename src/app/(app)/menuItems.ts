import {
  LayoutDashboard,
  Building2,
  CheckSquare,
  Settings,
  type LucideIcon,
  Target,
  Users,
  BriefcaseBusiness,
  BarChart3,
} from "lucide-react";

export type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Companies", url: "/companies", icon: Building2 },
  { title: "Contacts", url: "/contacts", icon: Users },
  { title: "Leads", url: "/leads", icon: Target },
  { title: "Deals", url: "/deals", icon: BriefcaseBusiness },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];
