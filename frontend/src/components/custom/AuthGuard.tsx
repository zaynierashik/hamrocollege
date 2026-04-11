"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

type UserRole = "user" | "college_admin";

type StoredUser = {
  role?: UserRole;
};

type AuthGuardProps = {
  requiredRole: UserRole;
  children: ReactNode;
};

export default function AuthGuard({ requiredRole, children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const userRaw = localStorage.getItem("user");

    if (!accessToken || !userRaw) {
      toast.error("Please log in to continue.");
      router.replace("/login");
      return;
    }

    let parsedUser: StoredUser | null = null;
    try {
      parsedUser = JSON.parse(userRaw) as StoredUser;
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      toast.error("Session is invalid. Please log in again.");
      router.replace("/login");
      return;
    }

    if (parsedUser?.role !== requiredRole) {
      toast.error("You are not allowed to view this dashboard.");
      if (parsedUser?.role === "college_admin") {
        router.replace("/dashboard/college-admin");
      } else if (parsedUser?.role === "user") {
        router.replace("/dashboard/user");
      } else {
        router.replace("/login");
      }
      return;
    }

    setIsAuthorized(true);
  }, [requiredRole, router]);

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
          Checking access...
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
