"use client";
import { Icon } from "@iconify/react";

export function Logo() {
  return (
    <div className="flex items-center gap-x-2">
      <Icon icon="solar:notes-outline" className="size-10 hidden md:block" />
      <p className="font-semibold">Noto</p>
    </div>
  );
}
