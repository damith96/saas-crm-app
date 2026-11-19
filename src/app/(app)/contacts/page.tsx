"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Users,
  UserCheck,
  UserX,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  X,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/status-badge";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
  status: "Active" | "Inactive";
}

const initialContacts: Contact[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john@abcsolutions.com",
    phoneNumber: "+1 234 567 890",
    company: "ABC Solutions",
    jobTitle: "Managing Director",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@techvision.com",
    phoneNumber: "+1 234 567 891",
    company: "TechVision",
    jobTitle: "Marketing Manager",
    status: "Active",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@globaltech.com",
    phoneNumber: "+1 234 567 892",
    company: "GlobalTech",
    jobTitle: "CEO",
    status: "Inactive",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Davis",
    email: "emily@innovate.com",
    phoneNumber: "+1 234 567 893",
    company: "Innovate Labs",
    jobTitle: "Product Manager",
    status: "Active",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Wilson",
    email: "david@nextwave.com",
    phoneNumber: "+1 234 567 894",
    company: "NextWave",
    jobTitle: "Sales Director",
    status: "Active",
  },
];

export default function ContactsPage() {
  const [contacts] = useState<Contact[]>(initialContacts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const router = useRouter();

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const searchValue = search.toLowerCase();

      const matchesSearch = [
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.company,
        contact.jobTitle,
      ].some((value) => value.toLowerCase().includes(searchValue));

      const matchesStatus =
        statusFilter === "All" || contact.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contacts, search, statusFilter]);

  const activeCount = contacts.filter(
    (contact) => contact.status === "Active",
  ).length;

  const inactiveCount = contacts.length - activeCount;

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 p-5 md:p-7 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Contacts
            </h1>
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {contacts.length}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            Manage your contacts and build stronger customer relationships.
          </p>
        </div>

        <Button
          className="h-10 gap-2 shadow-sm"
          onClick={() => router.push("/contacts/add")}
        >
          <Plus className="size-4" />
          Add Contact
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Contacts */}
        <div className="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total Contacts
            </p>

            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Users className="size-5" />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-3xl font-semibold tracking-tight">
              {contacts.length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              All company contacts
            </p>
          </div>
        </div>

        {/* Active Contacts */}
        <div className="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Active Contacts
            </p>

            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <UserCheck className="size-5" />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-3xl font-semibold tracking-tight">
              {activeCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Currently active
            </p>
          </div>
        </div>

        {/* Inactive Contacts */}
        <div className="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Inactive Contacts
            </p>

            <div className="flex size-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              <UserX className="size-5" />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-3xl font-semibold tracking-tight">
              {inactiveCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Currently inactive
            </p>
          </div>
        </div>
      </div>

      {/* Contacts Section */}
      <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              All Contacts
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              A list of all contacts associated with your company.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4" />
            <span>{filteredContacts.length} results</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-3 border-b bg-muted/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email or company..."
              className="h-10 bg-background pl-9 pr-9"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-muted-foreground" />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-10 min-w-[145px] rounded-md border bg-background px-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-6 py-3.5">Contact</th>
                <th className="px-6 py-3.5">Company</th>
                <th className="px-6 py-3.5">Phone Number</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  {/* Contact */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-semibold text-foreground">
                        {contact.firstName[0]}
                        {contact.lastName[0]}
                      </div>

                      <div className="min-w-0 space-y-1">
                        <p className="font-medium text-foreground">
                          {contact.firstName} {contact.lastName}
                        </p>

                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail className="size-3.5" />
                          {contact.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <Building2 className="size-4" />
                      </div>

                      <div className="space-y-1">
                        <p className="font-medium text-foreground">
                          {contact.company}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {contact.jobTitle}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="size-3.5" />
                      {contact.phoneNumber}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge
                      variant={
                        contact.status === "Active" ? "success" : "secondary"
                      }
                    >
                      {contact.status}
                    </StatusBadge>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-foreground"
                      aria-label={`Actions for ${contact.firstName} ${contact.lastName}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {filteredContacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                      <Users className="size-6 text-muted-foreground" />
                    </div>

                    <h3 className="mt-4 font-semibold">No contacts found</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      We couldn't find any contacts matching your search.
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t bg-muted/10 px-6 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredContacts.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {contacts.length}
            </span>{" "}
            contacts
          </p>

          <p className="text-xs text-muted-foreground">Updated just now</p>
        </div>
      </section>
    </div>
  );
}
