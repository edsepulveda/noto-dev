"use client";

import { Icon } from "@iconify/react";
import { Tooltip, cn } from "@nextui-org/react";
import UserActions from "./user-actions";

interface SidebarProps {
  isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  return (
    <div>
      <aside
        data-collapsed={isCollapsed}
        className={cn(
          "hidden group/sidebar h-screen lg:flex flex-col overflow-y-auto relative p-4 z-[99999] bg-[#f9f9f9] dark:bg-[#171717]"
        )}
      >
        <Tooltip content="Close Sidebar">
          <div
            role="button"
            className="size-6 rounded-sm hover:bg-default-300 p-px absolute top-4 right-2 transition opacity-0 group-hover/sidebar:opacity-100"
          >
            <span className="sr-only">close sidebar</span>
            <Icon icon="bi:chevron-bar-left" className="size-6" />
          </div>
        </Tooltip>

        <div>
          <UserActions />
        </div>
        <div className="mt-4">
          <p>Documentes</p>
        </div>
      </aside>
    </div>
  );
}
