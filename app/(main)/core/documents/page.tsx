"use client";

import Image from "next/image";
import Empty from "@/public/empty.svg";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import useUser from "@/app/hooks/useUser";
import { createClient } from "@/utils/supabase/client";

export default function DocumentsPage() {
  const { user, isLoading } = useUser();
  const supabase = createClient();

  const createNote = async () => {
    const data = await supabase
      .from("documents")
      .insert({ title: "Untitled", userId: user?.id });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Image src={Empty} alt="Empty home page" className="size-[300px]" />
      {!isLoading && (
        <h2 className="text-lg md:text-xl font-bold">
          Welcome to {user?.user_metadata.name ?? ""}&apos;s Notes
        </h2>
      )}
      <Button
        color="warning"
        variant="flat"
        startContent={<Icon icon="material-symbols:add" className="size-5" />}
      >
        Create a Note
      </Button>
    </div>
  );
}
