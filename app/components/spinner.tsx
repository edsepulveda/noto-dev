import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";

export function Spinner({ className }: { className: string }) {
  return <Icon icon="gg:spinner" className={cn("animate-spin", className)} />;
}
