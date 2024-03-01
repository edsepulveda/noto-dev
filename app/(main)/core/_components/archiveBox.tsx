"use client";

import { useParams } from "next/navigation";
import { Command, CommandGroup } from "cmdk";
import { createClient } from "@/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "@/app/hooks/useUser";
import { getArchivedNotes } from "@/utils/queries/getDocuments";
import { Icon } from "@iconify/react";
import { ArchiveActions } from "./archiveActions";

export const ArchiveBox = () => {
  const user = useUser();
  const params = useParams();
  const supabase = createClient();
  const queryClient = useQueryClient();

  const {
    data: documents,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["archived-documents"],
    queryFn: async () =>
      await getArchivedNotes(supabase, user.data?.data.user?.id ?? ""),
  });

  return (
    <div>
      <Command className="relative outline-none shadow rounded-md min-w-[350px] w-full flex flex-col gap-2 mb-3 py-0 px-2">
        <div className="flex items-center justify-center">
          <Icon icon="material-symbols:search" className="size-6 mr-2" />
          <Command.Input
            placeholder="Search Documents..."
            autoFocus
            className="h-7 px-2 w-full focus-visible:ring-transparent outline-none caret-warning-500"
          />
        </div>

        <Command.List className="mt-2 px-1 pb-1">
          {isLoading && (
            <Command.Loading className="border-0 w-full relative left-0 h-px overflow-visible block mt-[12px] mb-[12px]">
              Retrieving...
            </Command.Loading>
          )}
          <Command.Empty className="text-center text-xs pb-2 font-mono">
            No Results found
          </Command.Empty>
          <CommandGroup
            heading="Archived Documents"
            className="text-start text-xs text-warning-700"
          >
            {documents?.data?.map((document) => (
              <Command.Item
                className="first:mt-2.5 p-2 text-sm rounded-sm w-full hover:bg-warning-500/5 flex items-center justify-between text-warning-500"
                key={document.id}
              >
                <span className="truncate pl-2">{document.title}</span>
                {/* Make this a component */}
                <div className="flex">
                  <ArchiveActions
                    client={supabase}
                    id={document.id}
                    queryClient={queryClient}
                    refetch={refetch}
                  />
                </div>
              </Command.Item>
            ))}
          </CommandGroup>
        </Command.List>
      </Command>
    </div>
  );
};
