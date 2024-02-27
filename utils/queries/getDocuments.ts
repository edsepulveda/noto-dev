import { TypedSupabaseClient } from "../types";

export function getDocuments(client: TypedSupabaseClient) {
  return client.from("Documents").select();
}
