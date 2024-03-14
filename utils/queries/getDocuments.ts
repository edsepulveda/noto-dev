import { TypedSupabaseClient } from "../types";
import { useQuery } from "@tanstack/react-query";

export function getDocuments(client: TypedSupabaseClient) {
  return client.from("Documents").select();
}

export function getDocumentsByUserId(
  client: TypedSupabaseClient,
  userId: string
) {
  return client.from("Documents").select("*").eq("userId", userId).single();
}

export function getSidebarInfo(
  client: TypedSupabaseClient,
  userId: string,
  parentDocument?: string
) {
  let query = client
    .from("Documents")
    .select("*")
    .eq("userId", userId)
    .eq("isArchived", false)
    .order("createdAt", { ascending: false });

  if (parentDocument) {
    query = query.eq("parentDocumentId", parentDocument);
  }

  return query;
}

export function getArchivedNotes(client: TypedSupabaseClient, userId: string) {
  return client
    .from("Documents")
    .select()
    .eq("userId", userId)
    .eq("isArchived", true)
    .order("createdAt", { ascending: false });
}

export function getNotes(client: TypedSupabaseClient, userId: string) {
  return client
    .from("Documents")
    .select()
    .eq("userId", userId)
    .eq("isArchived", false)
    .order("createdAt", { ascending: false });
}

const getDocumentById = async (
  client: TypedSupabaseClient,
  documentId: string
) => {
  const user = await client.auth.getUser();

  const document = await client
    .from("Documents")
    .select()
    .eq("id", documentId)
    .single();

  if (!document) {
    throw new Error("Not found a document with the given id");
  }

  if (document.data?.isPublished && !document.data.isArchived) {
    return document;
  }

  if (!user.data.user) {
    throw new Error("Not authenticated");
  }

  const userId = user.data.user.id;

  if (document.data?.userId !== userId) {
    throw new Error("Unauthorized: This is not your document");
  }

  return document;
};

export const useGetDocumentById = (
  client: TypedSupabaseClient,
  documentId: string
) => {
  return useQuery({
    queryKey: ["document-user"],
    queryFn: async () => await getDocumentById(client, documentId),
  });
};
