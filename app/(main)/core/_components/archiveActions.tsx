"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const onConfirmDelete = async (documentId: Documents["id"]) => {
    const { error } = await client
      .from("Documents")
      .delete()
      .eq("id", documentId);

    if (error) {
      toast.error("No se ha podido borrar el documento");
    }

    toast.success("Se ha eliminado la nota seleccionada");
    queryClient.invalidateQueries({ queryKey: ["documents"] });
    refetch();
  };

  return (
    <>
      <Dropdown className="z-1">
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
              onClick={(e) => onRestoreClick(e as any, id)}
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
              onPress={onOpen}
              startContent={
                <Icon icon="tabler:trash-filled" className="size-6" />
              }
            >
              Delete Note
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <ModalComponent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={() => {
          onConfirmDelete(id);
        }}
      />
    </>
  );
};

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
}

const ModalComponent = (props: Props) => {
  const { isOpen, onOpenChange, onConfirm } = props;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      className="hidden md:block ml-20"
      size="sm"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              ¿Are you sure?
            </ModalHeader>
            <ModalBody>
              <p>This action cannot be undone.</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="warning" variant="bordered" onPress={onConfirm}>
                Delete Forever
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
