import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard de Tienda",
  description: "Panel de administración",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
