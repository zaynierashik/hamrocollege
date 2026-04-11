"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

import { cn } from "@/lib/utils";

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast:
            "group toast border border-slate-200 bg-white text-slate-950 shadow-lg rounded-xl",
          title: "text-sm font-semibold",
          description: "text-sm text-slate-600",
          actionButton:
            "bg-slate-900 text-white hover:bg-slate-700 rounded-md px-3 py-1.5",
          cancelButton:
            "bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md px-3 py-1.5",
          success: "border-emerald-200",
          error: "border-red-200",
          warning: "border-amber-200",
          info: "border-sky-200",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
