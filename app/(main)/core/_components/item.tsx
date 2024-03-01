"use client";
import useUser from "@/app/hooks/useUser";
import {
  useCreateArchive,
  useCreateChildrenNote,
} from "@/utils/mutations/default-note";
import { Icon } from "@iconify/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
  cn,
  Button,
} from "@nextui-org/react";
import { Kbd, Skeleton } from "@nextui-org/react";
import { toast } from "sonner";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  onClick?: () => void;
  label: string;
  icon: React.ReactNode;
}

export const Item = ({
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
  icon,
  label,
  onClick,
}: Props) => {
  const { data } = useUser();

  const handleExpandClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const mutate = useCreateArchive({
    id: id ?? "",
    userId: data?.data.user?.id ?? "",
  });

  const createNoteMutation = useCreateChildrenNote({
    userId: data?.data.user?.id ?? "",
    documentId: id!,
  });

  const handleClick = () => {
    const mutateAsync = mutate.mutateAsync();

    toast.promise(mutateAsync, {
      loading: "Moving to archive...",
      success: "Note moved to archived folder",
      error: "Failed to retrieve a note",
    });
  };

  const handleCreateChildren = () => {
    const childrenNote = createNoteMutation.mutateAsync();

    toast.promise(childrenNote, {
      loading: "Creating children...",
      success: "Note created",
      error: "Note cannot be created, try again",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
      className={cn(
        "group min-h-6 text-sm py-1.5 pr-2 w-full hover:bg-warning-500/50 mt-3 [&>span]:font-bold font-medium flex items-center rounded-lg",
        active && "bg-warning-500/50 text-warning-700"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1.5"
          onClick={handleExpandClick}
        >
          {expanded ? (
            <Icon icon="mdi:chevron-down" className="size-4 shrink-0" />
          ) : (
            <Icon icon="mdi:chevron-up" className="size-4 shrink-0" />
          )}
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-3 text-balance text-lg">{documentIcon}</div>
      ) : (
        <div>{icon}</div>
      )}
      <span className="text-balance">{label}</span>
      {isSearch && (
        <Kbd className="ml-auto select-none" keys={["command"]}>
          J
        </Kbd>
      )}

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <Popover placement="right">
            <PopoverTrigger onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Icon icon="tabler:dots" className="size-4" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-2.5">
              <Button
                size="sm"
                className="w-full"
                onClick={handleClick}
                startContent={<Icon icon="mdi:trash" className="size-4" />}
                variant="flat"
                color="danger"
                isLoading={mutate.isPending}
              >
                Archive
              </Button>
            </PopoverContent>
          </Popover>
          <div
            role="button"
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            onClick={(e) => {
              e.stopPropagation();
              handleCreateChildren();
            }}
          >
            <Icon icon="mdi:add" className="size-4" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function SkeletonItemComponent({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
      className={cn("flex gap-x-2 py-1")}
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};