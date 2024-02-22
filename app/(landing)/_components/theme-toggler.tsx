"use client";

import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

export function ThemeToggler() {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <Icon
            icon="ph:sun"
            className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Icon
            icon="ph:moon"
            className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="bordered"
        selectionMode="single"
        aria-label="static-actions"
      >
        <DropdownItem key="light" onClick={() => setTheme("light")}>
          Light
        </DropdownItem>
        <DropdownItem key="dark" onClick={() => setTheme("dark")}>
          Dark
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
