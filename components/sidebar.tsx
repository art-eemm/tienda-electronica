"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function Sidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    window.location.href = "/";
  };

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight">Tienda</h2>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <Link
          href={"/products"}
          className={`px-4 py-3 rounded-md transition-colors flex items-center gap-3 ${pathname === "/products" ? "bg-blue-600" : "hover:bg-gray-800"}`}
        >
          Productos
        </Link>

        <Link
          href={"/sales"}
          className={`px-4 py-3 rounded-md transition-colors flex items-center gap-3 ${pathname === "/ventas" ? "bg-blue-600" : "hover:bg-gray-800"}`}
        >
          Ventas
        </Link>
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-800">
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-3 text-left rounded-md hover:bg-red-600 transition-colors flex items-center gap-3"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
