import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/database.types";
import { useMemo } from "react";
import { TypedSupabaseClient } from "../types";

let client: TypedSupabaseClient | undefined;

export function createClient() {
  if (client) {
    return client;
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return client;
}

export function useSupabaseBrowser() {
  return useMemo(createClient, []);
}
