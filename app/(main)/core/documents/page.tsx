"use client";

import Image from "next/image";
import Empty from "@/public/empty.svg";
import { Button, cn } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import useUser from "@/app/hooks/useUser";
import { useSupabaseBrowser } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DocumentsPage() {
  const { data, isLoading } = useUser();
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async () => {
      return await supabase.from("Documents").insert({
        id: crypto.randomUUID(),
        title: "Untitled",
        userId: data?.data.user?.id ?? "",
        isArchived: false,
        isPublished: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  const createNote = () => {
    const muta = mutate.mutateAsync();

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
        isLoading={mutate.isPending}
        onClick={createNote}
        startContent={
          <Icon
            icon="material-symbols:add"
            className={cn("size-5", mutate.isPending && "hidden")}
          />
        }
      >
        {mutate.isPending ? (
          <span>Creating a note...</span>
        ) : (
          <span>Create a Untitled Note</span>
        )}
      </Button>
    </div>
  );
}
