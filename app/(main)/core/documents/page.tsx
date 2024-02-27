"use client";

import Image from "next/image";
import Empty from "@/public/empty.svg";
import { Button, cn } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import useUser from "@/app/hooks/useUser";
import { toast } from "sonner";
import { useDefaultNote } from "@/utils/mutations/default-note";

export default function DocumentsPage() {
  const { data, isLoading } = useUser();

  const mutation = useDefaultNote({ id: data?.data.user?.id ?? "" });

  const createNote = () => {
    const muta = mutation.mutateAsync();

    toast.promise(muta, {
      loading: "Creating a note...",
      success: "Note has been created",
      error: "Note cannot be created",
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Image src={Empty} alt="Empty home page" className="size-[300px]" />
      {!isLoading && (
        <h2 className="text-lg md:text-xl font-bold">
          Welcome to {data?.data.user?.user_metadata.name ?? ""}&apos;s Notes
        </h2>
      )}
      <Button
        color="warning"
        variant="flat"
        isLoading={mutation.isPending}
        onClick={createNote}
        startContent={
          <Icon
            icon="material-symbols:add"
            className={cn("size-5", mutation.isPending && "hidden")}
          />
        }
      >
        {mutation.isPending ? (
          <span>Creating a note...</span>
        ) : (
          <span>Create a Untitled Note</span>
        )}
      </Button>
    </div>
  );
}
