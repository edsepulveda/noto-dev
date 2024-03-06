import { TypedSupabaseClient } from "../types";

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
