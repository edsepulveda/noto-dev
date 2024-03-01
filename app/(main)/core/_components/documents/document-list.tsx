"use client";

import { useSupabaseBrowser } from "@/utils/supabase/client";
import { cn } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getSidebarInfo } from "@/utils/queries/getDocuments";
import useUser from "@/app/hooks/useUser";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Documents } from "@prisma/client";
import { Item } from "../item";
import { Icon } from "@iconify/react";

interface Props {
  parentDocument?: string;
  level?: number;
  documentsData?: Documents[];
}

export default function DocumentList({ level = 0, parentDocument }: Props) {
  const supabase = useSupabaseBrowser();
  const { data } = useUser();
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }));
  };

  const { data: documents } = useQuery({
    queryKey: ["documents"],
    queryFn: async () =>
      await getSidebarInfo(supabase, data?.data.user?.id ?? "", parentDocument),
  });

  const onRedirectAction = (documentId: string) => {
    router.push(`/core/${documentId}`);
  };

  if (documents?.data === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>

      {documents.data?.map((document) => (
        <div key={document.id}>
          <Item
            id={document.id}
            onClick={() => onRedirectAction(document.id)}
            label={document.title}
            icon={<Icon icon="tabler:file-filled" className="size-5 mr-2" />}
            documentIcon={document.icon ?? ""}
            active={params.documentId === document.id}
            level={level}
            onExpand={() => onExpand(document.id)}
            expanded={expanded[document.id]}
          />
        </div>
      ))}
    </>
  );
}
