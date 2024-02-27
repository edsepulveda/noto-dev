"use client";

import { useSupabaseBrowser } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

//Only for client - components
//for server components just use await supabase.auth.getUser()
export default function useUser() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = useSupabaseBrowser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }, 1000);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await supabase.auth.getUser(),
  });

  return { data, isLoading, handleLogout };
}
