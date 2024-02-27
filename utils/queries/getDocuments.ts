import { TypedSupabaseClient } from "../types";

export function getDocuments(client: TypedSupabaseClient) {
  return client.from("Documents").select();
}

export function getSidebarInfo(
  client: TypedSupabaseClient,
  userId: string,
  parentDocumentId: string
) {
  return client
    .from("Documents")
    .select()
    .eq("userId", userId)
    .eq("parentDocumentId", parentDocumentId)
    .eq("isArchived", false);
}
