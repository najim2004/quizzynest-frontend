"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const formSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Please confirm your password.",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and privacy policy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
      <div
        className={cn(
          "w-full max-w-sm p-6",
          "text-gray-900 dark:text-gray-100"
        )}
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white">
            <Brain className="h-6 w-6" />
          </div>
          <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h1>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Start your quiz adventure today
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        {...field}
                        className="mt-1 rounded-none h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      className="mt-1 rounded-none h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Create a password"
                      type="password"
                      {...field}
                      className="mt-1 rounded-none h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
                      type="password"
                      {...field}
                      className="mt-1 rounded-none h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-xs font-normal text-gray-700 dark:text-gray-300 flex flex-wrap">
                      I agree to the{" "}
                      <Link
                        href="#"
                        className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="#"
                        className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                      >
                        Privacy Policy
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500  rounded-none h-10"
            >
              Create Account
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 rounded-none h-10"
            >
              <FcGoogle className="h-5 w-5" /> Google
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 rounded-none h-10"
            >
              <FaFacebook className="h-5 w-5 text-blue-600" /> Facebook
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
