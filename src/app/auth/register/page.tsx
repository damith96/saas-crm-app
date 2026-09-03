"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.literal(true, {
      error: "You must accept the terms to continue",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: undefined,
    },
  });

  function onSubmit(values: RegisterFormValues) {
    console.log("Register:", values);
    // TODO: wire up registration logic here
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 lg:px-16">
      <div className="w-full max-w-md">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Get started with Vertex CRM and manage your customer relationships
            in one place.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <FieldGroup>
            {/* First name & Last name */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>First name</FieldLabel>

                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <Input
                        {...field}
                        type="text"
                        placeholder="John"
                        className="h-11 pl-10"
                        autoComplete="given-name"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Last name</FieldLabel>

                    <Input
                      {...field}
                      type="text"
                      placeholder="Doe"
                      className="h-11"
                      autoComplete="family-name"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Work email</FieldLabel>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      {...field}
                      type="email"
                      placeholder="you@company.com"
                      className="h-11 pl-10"
                      autoComplete="email"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="h-11 px-10"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Use at least 8 characters with a mix of letters and numbers.
                    </p>
                  )}
                </Field>
              )}
            />

            {/* Confirm password */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Confirm password</FieldLabel>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="h-11 px-10"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Terms */}
            <Controller
              name="terms"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={field.onChange}
                  />

                  <div className="space-y-1">
                    <FieldLabel className="font-normal text-muted-foreground">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </FieldLabel>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>

          {/* Submit */}
          <Button
            type="submit"
            className="h-11 w-full bg-slate-950 text-white hover:bg-slate-800"
          >
            Create account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vertex CRM. All rights reserved.
        </p>
      </div>
    </div>
  );
}
