"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(_values: ForgotPasswordFormValues) {
    // API integration will be added later.
    setSubmitted(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 lg:px-16">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Forgot your password?
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            <FieldGroup>
              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>

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
            </FieldGroup>

            <Button
              type="submit"
              className="h-11 w-full bg-slate-950 text-white hover:bg-slate-800"
            >
              Send reset link
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        ) : (
          /* Success state */
          <div className="mt-8 rounded-xl border bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-600">
              If an account exists for that email address, we've sent a password
              reset link. Please check your inbox.
            </p>
          </div>
        )}

        {/* Back to login */}
        <div className="mt-8 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vertex CRM. All rights reserved.
        </p>
      </div>
    </div>
  );
}
