"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/query";
import Header from "@/components/sistema/header";

export default function SystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="mx-auto max-w-7xl p-6 lg:px-8">{children}</div>
    </QueryClientProvider>
  );
}
