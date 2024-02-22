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

  const handleLogout = async () => {
    await supabase.auth.signOut().then(() => {
      console.log("Signed out");
    });
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setTimeout(() => {
        if (!data) {
          setUser(null);
          setIsLoading(false);
        }
        setUser(data.user);
        setIsLoading(false);
      }, 1000);
    };
    getUser();
  }, [supabase.auth]);

  return { user, isLoading, handleLogout };
}
