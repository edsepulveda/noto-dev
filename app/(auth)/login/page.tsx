import { cookies } from "next/headers";
import { LoginForm } from "./_components/login-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getSession();

  if (data.session?.user) {
    return redirect("/");
  }

  return (
    <div className="relative bg-gradient-to-bl from-blue-600 via-transparent dark:from-blue-950 dark:via-transparent">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
