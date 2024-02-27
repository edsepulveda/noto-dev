"use client";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";
import { Kbd } from "@nextui-org/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  onClick: () => void;
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
  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        "group min-h-6 text-sm py-1.5 pr-2 w-full hover:bg-warning-500/50 mt-3 [&>span]:font-bold font-medium flex items-center rounded-lg",
        level ? `pl-[${level * 12 + 12}px]` : "pl-[12px]",
        active && "bg-warning-500/50 text-warning-700"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1.5"
          onClick={() => {}}
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
    </div>
  );
};
