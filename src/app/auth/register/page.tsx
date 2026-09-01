"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) return;
    console.log("Register submitted:", { name, email, password });
    // TODO: wire up registration logic here
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 lg:px-16">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Get started with Vertex CRM and manage your customer relationships
            in one place.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5">
          {/* Name */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* First name */}
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-slate-900"
              >
                First name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className="h-11 pl-10"
                  autoComplete="given-name"
                />
              </div>
            </div>

            {/* Last name */}
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-slate-900"
              >
                Last name
              </label>

              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                className="h-11"
                autoComplete="family-name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-900"
            >
              Work email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="h-11 pl-10"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-900"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="h-11 px-10"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
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
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="h-11 px-10"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <Checkbox id="terms" className="mt-0.5" />

            <label
              htmlFor="terms"
              className="text-sm leading-5 text-muted-foreground"
            >
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
            </label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-11 w-full bg-slate-950 text-white hover:bg-slate-800"
          >
            Create account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        {/* Login link */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>

        {/* Footer */}
        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vertex CRM. All rights reserved.
        </p>
      </div>
    </div>
  );
}
