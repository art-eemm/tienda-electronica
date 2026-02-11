import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const isBrowser = typeof window !== "undefined";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key) => {
        if (!isBrowser) return null;

        const cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${key}=`));
        return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
      },
      setItem: (key, value) => {
        if (typeof window !== "undefined") {
          document.cookie = `${key}=${encodeURIComponent(value)}; path=/; SameSite=Lax; max-age=31536000`;
        }
      },
      removeItem: (key) => {
        if (typeof window !== "undefined") {
          document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        }
      },
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
