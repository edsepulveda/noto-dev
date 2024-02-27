"use client";

import { useSupabaseBrowser } from "@/utils/supabase/client";
import { Skeleton } from "@nextui-org/react";
import Documents from "./document";
import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "@/utils/queries/getDocuments";

export default function DocumentList() {
  const supabase = useSupabaseBrowser();

  const { data: documents, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => await getDocuments(supabase),
  });

  console.log(documents?.data?.length)

  if (isLoading) return <Skeleton className="h-3 w-4/5 rounded-lg" />;

  return (
    <div>
      {documents?.data?.map((document) => (
        <Documents document={document} key={document.id} />
      ))}
    </div>
  );
}
