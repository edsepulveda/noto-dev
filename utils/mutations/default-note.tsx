"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseBrowser } from "../supabase/client";

interface Props {
  id: string
}

export const useDefaultNote = ({ id }: Props) => {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await supabase.from("Documents").insert({
        id: crypto.randomUUID(),
        title: "Untitled",
        userId: id,
        isArchived: false,
        isPublished: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};
