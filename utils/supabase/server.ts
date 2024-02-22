import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient(cookiesStore: ReturnType<typeof cookies>) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookiesStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookiesStore.set({ name, value, ...options });
          } catch (error) {
            console.error(
              "Error en try catch set cookies server supabase",
              error
            );
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookiesStore.set({ name, value: "", ...options });
          } catch (error) {
            console.error("Error at remove cookies store supabase", error);
          }
        },
      },
    }
  );
}
