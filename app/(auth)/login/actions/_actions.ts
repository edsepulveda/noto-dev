"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { loginSchema, LoginSchema } from "../../_login.schema";

export default async function signinAction({ email, password }: LoginSchema) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const parseLogin = loginSchema.safeParse({ email, password });

  if (!parseLogin.success) {
    return { errors: parseLogin.error.flatten().fieldErrors };
  }

  const response = await supabase.auth.signInWithPassword({ email, password });
  return response.data;
}
