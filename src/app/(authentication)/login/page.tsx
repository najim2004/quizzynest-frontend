"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Brain } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();
  const { login } = useAuthStore();
  const searchParams = useSearchParams();
  const returnUrl: string = searchParams.get("returnUrl") ?? "/dashboard";
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await login(values.email, values.password);
      if (result?.success) {
        toast.success(result?.message || "Login successful");
        router.push(`${returnUrl}`);
      } else {
        toast.error(result?.message || "Login failed");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error?.message : "Login failed");
      console.log("Login failed:", error);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div
        className={cn(
          "w-full max-w-sm p-6",
          "text-gray-900 dark:text-gray-100"
        )}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white">
            <Brain className="h-6 w-6" />
          </div>
          <div className="text-2xl font-bold">Welcome back!</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to continue your quiz journey
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      className="rounded-none h-10"
                      type="email"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your password"
                      className="rounded-none h-10"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-none h-10"
            >
              Sign In
            </Button>
          </form>
        </Form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t dark:border-gray-700"></span>
          </div>
          <div className="relative text-center text-sm">
            <span className="bg-white dark:bg-gray-900 px-2">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex gap-4">
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

        <div className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link
            href={`/signup?returnUrl=${returnUrl}`}
            className="text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
