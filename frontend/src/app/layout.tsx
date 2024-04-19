import type { Metadata } from "next";
import "../styles/global.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Unimed",
  description: "Unimed LIU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
