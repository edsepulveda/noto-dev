"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseBrowser } from "../supabase/client";
import { TypedSupabaseClient } from "../types";

interface CreateProps {
  id: string;
}

interface CreateChildrenProps {
  userId: string;
  documentId: string;
}

export const useDefaultNote = ({ id }: CreateProps) => {
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
      queryClient.invalidateQueries({ queryKey: ["archived-documents"] });
      queryClient.invalidateQueries({ queryKey: ["search-notes"] });
    },
  });
};

export const useCreateChildrenNote = ({
  userId,
  documentId,
}: CreateChildrenProps) => {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await supabase.from("Documents").insert({
        id: crypto.randomUUID(),
        title: "Untitled",
        userId,
        isArchived: false,
        isPublished: false,
        parentDocumentId: documentId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["archived-documents"] });
      queryClient.invalidateQueries({ queryKey: ["search-notes"] });
    },
  });
};

interface UpdateProps {
  id: string;
  userId: string;
}

export const useCreateArchive = ({ id, userId }: UpdateProps) => {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await supabase
        .from("Documents")
        .update({ isArchived: true })
        .eq("id", id)
        .eq("userId", userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["archived-documents"] });
      queryClient.invalidateQueries({ queryKey: ["search-notes"] });
    },
  });
};
