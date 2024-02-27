"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";

//Only for client - components
//for server components just use await supabase.auth.getUser()
export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data) {
        setUser(null);
        setIsLoading(false);
      }
      setUser(data.user);
      setIsLoading(false);
    };
    getUser();
  }, [supabase.auth]);

  return { user, isLoading };
}
