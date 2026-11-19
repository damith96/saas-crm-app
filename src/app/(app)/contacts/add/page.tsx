"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const createContactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),

  email: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Please enter a valid email address",
    ),

  phoneNumber: z.string().trim(),
  jobTitle: z.string().trim(),
  description: z.string().trim(),
});

type CreateContactFormValues = z.infer<typeof createContactSchema>;

const defaultValues: CreateContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  jobTitle: "",
  description: "",
};

export default function CreateContactPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateContactFormValues>({
    resolver: zodResolver(createContactSchema),
    defaultValues,
  });

  const onSubmit = async (values: CreateContactFormValues) => {
    // API integration will be added in the next step.
    console.log("Contact form values:", values);

    toast.info("Form validation successful", {
      description:
        "The contact API has not been connected yet. No contact has been saved.",
    });
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-5 md:p-7 lg:p-8">
      {/* Breadcrumb / Back navigation */}
      <button
        type="button"
        onClick={() => router.push("/contacts")}
        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Contacts
      </button>

      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create Contact
        </h1>

        <p className="text-sm text-muted-foreground">
          Add a new contact to your company's contact list.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information */}
        <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b px-6 py-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UserRound className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Contact Information</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Enter the basic information about this contact.
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>

              <Input
                id="firstName"
                placeholder="Enter first name"
                {...register("firstName")}
                aria-invalid={!!errors.firstName}
              />

              {errors.firstName && (
                <p className="text-xs text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </Label>

              <Input
                id="lastName"
                placeholder="Enter last name"
                {...register("lastName")}
                aria-invalid={!!errors.lastName}
              />

              {errors.lastName && (
                <p className="text-xs text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-9"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
              </div>

              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1 234 567 890"
                  className="pl-9"
                  {...register("phoneNumber")}
                />
              </div>
            </div>

            {/* Job Title */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="jobTitle">Job Title</Label>

              <div className="relative">
                <BriefcaseBusiness className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="jobTitle"
                  placeholder="e.g. Marketing Manager"
                  className="pl-9"
                  {...register("jobTitle")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b px-6 py-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Additional Information</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Add any additional notes about this contact.
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                placeholder="Write something about this contact..."
                rows={5}
                className="resize-none"
                {...register("description")}
              />

              <p className="text-xs text-muted-foreground">
                Optional information to help your team understand this contact.
              </p>
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/contacts")}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            Create Contact
          </Button>
        </div>
      </form>
    </div>
  );
}
