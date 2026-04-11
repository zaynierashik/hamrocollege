"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

type AuthRole = "user" | "college";
type AuthMode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<AuthRole>("user");
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignup = mode === "signup";

  const activeName = useMemo(() => {
    if (!isSignup) {
      return "";
    }
    return role === "college" ? adminName : fullName;
  }, [adminName, fullName, isSignup, role]);

  const title = isSignup
    ? `Create ${role === "user" ? "User" : "College"} Account`
    : `${role === "user" ? "User" : "College"} Login`;

  const subtitle = isSignup
    ? "Fill in your details to create your account."
    : "Sign in to continue to your dashboard.";

  const resetForm = () => {
    setFullName("");
    setCollegeName("");
    setAdminName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    toast.dismiss();
  }, [mode, role]);

  const splitName = (name: string) => {
    const parts = name.trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ");
    return { firstName, lastName };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      if (isSignup) {
        const { firstName, lastName } = splitName(activeName);
        const payload: Record<string, string> = {
          email,
          first_name: firstName,
          last_name: lastName,
          password,
        };

        const endpoint =
          role === "college"
            ? "users/register/college-admin/"
            : "users/register/";

        if (role === "college") {
          payload.college = collegeName;
        }

        await api.post(endpoint, payload);
        toast("Account created. You can now log in.");
        setMode("login");
        resetForm();
      } else {
        const endpoint =
          role === "college" ? "users/login/college-admin/" : "users/login/";

        const response = await api.post(endpoint, {
          email,
          password,
        });

        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        toast("Login successful.");
        setPassword("");

        if (response.data.user?.role === "college_admin") {
          router.push("/dashboard/college-admin");
        } else {
          router.push("/dashboard/user");
        }
      }
    } catch (error: unknown) {
      const axiosError = error as {
        response?: {
          data?: Record<string, string[] | string> | string;
        };
      };
      const apiData = axiosError.response?.data;

      if (apiData) {
        if (typeof apiData === "string") {
          toast.error(apiData);
          return;
        }

        const firstEntry = Object.values(apiData)[0];
        if (Array.isArray(firstEntry)) {
          toast.error(firstEntry[0]);
        } else if (typeof firstEntry === "string") {
          toast.error(firstEntry);
        } else {
          toast.error("Authentication failed. Please check your details.");
        }
      } else {
        toast.error("Unable to connect to server. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary",
            )}
          >
            Back
          </Link>
        </div>

        <section className="grid gap-8 md:grid-cols-[1.05fr_1fr]">
          <div className="rounded-2xl bg-primary px-6 py-7 text-white md:px-8 md:py-9">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-100">
              HamroCollege
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              One Portal for
              <br /> Students and Colleges
            </h1>
            <p className="mt-4 max-w-md text-sm text-amber-50 sm:text-base">
              Choose your role, then login or create an account from the same
              secure page.
            </p>
          </div>

          <Card className="p-6 sm:p-7">
            <div className="mb-6 flex flex-wrap gap-2 rounded-xl bg-gray-100 p-1">
              <Button
                variant={role === "user" ? "outline" : "ghost"}
                size="sm"
                onClick={() => setRole("user")}
                className={cn(
                  "flex-1 rounded-lg text-sm font-semibold",
                  role === "user" &&
                    "border-white bg-white text-primary shadow",
                )}
              >
                User
              </Button>
              <Button
                variant={role === "college" ? "outline" : "ghost"}
                size="sm"
                onClick={() => setRole("college")}
                className={cn(
                  "flex-1 rounded-lg text-sm font-semibold",
                  role === "college" &&
                    "border-white bg-white text-primary shadow",
                )}
              >
                College
              </Button>
            </div>

            <div className="mb-6 flex items-center gap-3 text-sm">
              <Button
                variant={mode === "login" ? "default" : "secondary"}
                size="sm"
                onClick={() => setMode("login")}
                className="rounded-full"
              >
                Login
              </Button>
              <Button
                variant={mode === "signup" ? "default" : "secondary"}
                size="sm"
                onClick={() => setMode("signup")}
                className="rounded-full"
              >
                Create Account
              </Button>
            </div>

            <CardHeader className="p-0">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{subtitle}</CardDescription>
            </CardHeader>

            <CardContent className="mt-6 p-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && role === "user" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                )}

                {role === "college" && isSignup && (
                  <div className="space-y-1.5">
                    <Label htmlFor="college-name">College Name</Label>
                    <Input
                      id="college-name"
                      type="text"
                      required
                      value={collegeName}
                      onChange={(event) => setCollegeName(event.target.value)}
                      placeholder="Everest College"
                    />
                  </div>
                )}

                {role === "college" && isSignup && (
                  <div className="space-y-1.5">
                    <Label htmlFor="admin-name">Admin Name</Label>
                    <Input
                      id="admin-name"
                      type="text"
                      required
                      value={adminName}
                      onChange={(event) => setAdminName(event.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Minimum 8 characters"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 h-11 w-full rounded-xl"
                >
                  {isLoading
                    ? "Please wait..."
                    : isSignup
                      ? `Create ${role === "college" ? "College" : "User"} Account`
                      : `Login as ${role === "college" ? "College" : "User"}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
