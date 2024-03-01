"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { TypedSupabaseClient } from "@/utils/types";
import { Documents } from "@prisma/client";
import { QueryClient, RefetchOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ArchiveProps {
  id: string;
  client: TypedSupabaseClient;
  queryClient: QueryClient;
  refetch: (options?: RefetchOptions) => void;
}

export const ArchiveActions = ({
  id,
  client,
  queryClient,
  refetch,
}: ArchiveProps) => {
  const router = useRouter();

  const onRestoreClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Documents["id"]
  ) => {
    e.stopPropagation();
    const { error } = await client
      .from("Documents")
      .update({ isArchived: false })
      .eq("id", documentId);

    if (error) {
      toast.error(
        `No se ha podido reestablecer el documento: ${error.message} - code: ${error.code}`
      );
    }
    toast.success("Documento reestablecido con éxito");
    queryClient.invalidateQueries({
      queryKey: ["documents"],
    });
    refetch();
  };

  const handleRedirectClick = (documentId: string) => {
    router.push(`/core/${documentId}`);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div role="button">
          <Icon icon="mage:dots" className="size-4 lg:size-6" />
        </div>
      </DropdownTrigger>

      <DropdownMenu aria-label="Static Actions" variant="flat">
        <DropdownSection title="Actions">
          <DropdownItem
            key="restore"
            startContent={
              <Icon icon="ic:baseline-restore" className="size-6" />
            }
            onClick={(e) => onRestoreClick(e, id)}
          >
            Restore Note
          </DropdownItem>
          <DropdownItem
            key="goto"
            onClick={() => handleRedirectClick(id)}
            startContent={
              <Icon icon="icon-park-outline:go-on" className="size-6" />
            }
          >
            See Note Info
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger Zone" className="text-danger-500">
          <DropdownItem
            key="delete"
            color="danger"
            startContent={
              <Icon icon="tabler:trash-filled" className="size-6" />
            }
          >
            Delete Note
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
