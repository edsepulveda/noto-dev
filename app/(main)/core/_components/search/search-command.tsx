"use client";

import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/utils/queries/getDocuments";
import { useSupabaseBrowser } from "@/utils/supabase/client";
import useUser from "@/app/hooks/useUser";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/utils/store/useSearch";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import { File } from "lucide-react";
import { CommandLoading } from "cmdk";
import { Documents } from "@prisma/client";

export default function SearchCommand() {
  const supabase = useSupabaseBrowser();
  const router = useRouter();
  const { data } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const { toggle, isOpen, onClose } = useSearchStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, [toggle]);

  const onRedirect = (documentId: Documents["id"]) => {
    router.push(`/core/${documentId}`);
    onClose();
  };

  const {
    data: documents,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["search-notes"],
    queryFn: async () => await getNotes(supabase, data?.data.user?.id ?? ""),
  });

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder={`Search ${data?.data.user?.user_metadata.full_name} Notes`}
      />
      <CommandList>
        {isLoading && <CommandLoading>Retriving data...</CommandLoading>}
        <CommandEmpty>No note found with that keyword</CommandEmpty>
        <CommandGroup heading="Active Notes">
          {documents?.data?.map((document) => (
            <CommandItem
              key={document.id}
              value={`${document.id}-${document.title}`}
              title={document.title}
              className="cursor-pointer"
              onSelect={() => onRedirect(document.id)}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              {document.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
