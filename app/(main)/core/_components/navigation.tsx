"use client";

import { Icon } from "@iconify/react";
import {
  Tooltip,
  cn,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import UserActions from "./user-actions";
import DocumentList from "./documents/document-list";
import { Item } from "./item";
import { useDefaultNote } from "@/utils/mutations/default-note";
import useUser from "@/app/hooks/useUser";
import { toast } from "sonner";
import { ArchiveBox } from "./archiveBox";
import { useSearchStore } from "@/utils/store/useSearch";

interface SidebarProps {
  isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const { data } = useUser();
  const mutation = useDefaultNote({ id: data?.data.user?.id ?? "" });
  const search = useSearchStore();

  const createDefaultNote = () => {
    const muta = mutation.mutateAsync();
    toast.promise(muta, {
      loading: "Creating a note...",
      success: "Note has been created",
      error: "Note cannot be created",
    });
  };

  return (
    <div>
      <aside
        data-collapsed={isCollapsed}
        className={cn(
          "group/sidebar h-screen flex flex-col overflow-y-auto relative p-4 z-[99999] bg-[#f9f9f9] dark:bg-[#171717]"
        )}
      >
        <Tooltip content="Close Sidebar">
          <div
            role="button"
            className="size-6 rounded-sm hover:bg-default-300 p-px absolute top-4 right-2 transition opacity-0 group-hover/sidebar:opacity-100"
          >
            <span className="sr-only">close sidebar</span>
            <Icon icon="bi:chevron-bar-left" className="size-6" />
          </div>
        </Tooltip>

        <div>
          <UserActions />
          <Item
            onClick={search.onOpen}
            label="Search"
            icon={
              <Icon
                icon="material-symbols:search"
                className="shrink-0 mr-2 size-4 lg:size-6"
              />
            }
            isSearch
          />
          <Item
            onClick={createDefaultNote}
            label={mutation.isPending ? "Creating Note..." : "Create Note"}
            icon={
              <Icon
                icon="icon-park-solid:doc-add"
                className="shrink-0 mr-2 size-4 lg:size-6"
              />
            }
          />
        </div>
        <div className="mt-4">
          <DocumentList />
          <div className="mt-5">
            <Popover className="z-[99999999]" placement="right">
              <PopoverTrigger>
                <div role="button">
                  <Item
                    label="Archived Notes"
                    icon={
                      <Icon
                        icon="material-symbols:archive"
                        className="shrink-0 mr-2 size-4 lg:size-6"
                      />
                    }
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <ArchiveBox />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </aside>
    </div>
  );
}
