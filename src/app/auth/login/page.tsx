"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldTitle,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

const loginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z.string().min(1, "Password is required"),

  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: LoginFormValues) {
    console.log("Login:", values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 lg:px-16">
      <div className="w-full max-w-md">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Sign in to your Vertex CRM account.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldTitle>Email</FieldTitle>
                <FieldContent>
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
                </FieldContent>
                <FieldDescription />
                <FieldError />
              </Field>
            )}
          ></Controller>
          {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
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
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            /> */}

          {/* Password */}
          {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                const showPassword =
                  form.watch("password") &&
                  document.activeElement?.id === "password";

                return (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>

                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <FormControl>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="h-11 pl-10"
                          autoComplete="current-password"
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}

          {/* Remember me */}
          {/* <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormLabel className="font-normal text-muted-foreground">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            /> */}

          {/* Submit */}
          <Button
            type="submit"
            className="h-11 w-full bg-slate-950 text-white hover:bg-slate-800"
          >
            Sign in
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Create account
          </Link>
        </p>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vertex CRM. All rights reserved.
        </p>
      </div>
    </div>
  );
}
