"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "sonner";

import AuthGuard from "@/components/custom/AuthGuard";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UserRole = "user" | "college_admin";

type NavItem = {
  href: string;
  label: string;
};

type RoleDashboardLayoutProps = {
  requiredRole: UserRole;
  title: string;
  subtitle: string;
  navItems: NavItem[];
  children: ReactNode;
};

export default function RoleDashboardLayout({
  requiredRole,
  title,
  subtitle,
  navItems,
  children,
}: RoleDashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    toast("Logged out successfully.");
    router.push("/login");
  };

  return (
    <AuthGuard requiredRole={requiredRole}>
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:p-5">
            <div className="mb-5 border-b border-slate-100 pb-4">
              <p className="font-display text-xl font-semibold text-slate-900">
                {title}
              </p>
              <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium transition",
                      isActive
                        ? "bg-primary text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4">
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full",
                )}
              >
                Home
              </Link>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </aside>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            {children}
          </section>
        </div>
      </main>
    </AuthGuard>
  );
}
