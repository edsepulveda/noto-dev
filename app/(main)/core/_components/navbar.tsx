"use client";

import { useGetDocumentById } from "@/utils/queries/getDocuments";
import { useParams } from "next/navigation";
import { type Documents } from "@prisma/client";
import { useSupabaseBrowser } from "@/utils/supabase/client";
import { Icon } from "@iconify/react";
import { Title } from "./title";

interface NavbarProps {
  isCollapsed: boolean;
  onReset: () => void;
}

export default function Navbar(props: NavbarProps) {
  const { isCollapsed, onReset } = props;
  const client = useSupabaseBrowser();
  const params = useParams();

  const { data, isLoading } = useGetDocumentById(
    client,
    params.documentId as Documents["id"]
  );

  return (
    <nav className="bg-background dark:bg-[#121212] px-3 py-2 w-full flex items-center gap-x-4">
      {isCollapsed && (
        <Icon
          role="button"
          onClick={onReset}
          icon="f7:chevron-right-2"
          className="size-6"
        />
      )}
      <div className="flex items-center justify-between w-full">
        <Title initialData={data?.data as any} />
      </div>
    </nav>
  );
}
