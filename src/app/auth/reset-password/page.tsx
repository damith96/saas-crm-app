"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // API integration will be added later.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 lg:px-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">
            Password updated
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your password has been successfully updated. You can now sign in
            with your new password.
          </p>

          <Button
            asChild
            className="mt-8 h-11 w-full bg-slate-950 text-white hover:bg-slate-800"
          >
            <Link href="/login">
              Continue to sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 lg:px-16">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Create a new password
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Choose a strong password that you haven't used before.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* New password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-900"
            >
              New password
            </label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a new password"
                className="h-11 px-10"
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Use at least 8 characters with a mix of letters and numbers.
            </p>
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-slate-900"
            >
              Confirm password
            </label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                className="h-11 px-10"
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-11 w-full bg-slate-950 text-white hover:bg-slate-800"
          >
            Reset password
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        {/* Back to login */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
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
