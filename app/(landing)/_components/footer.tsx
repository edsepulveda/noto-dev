"use client";

import { Logo } from "@/app/components/logo";
import { Button, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export function Footer() {
  return (
    <div className="flex items-center w-full p-6 z-50">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2">
        <Button as={Link} size="sm" variant="light" isBlock showAnchorIcon>
          Privacy Policy
        </Button>
        <Button as={Link} size="sm" variant="light" isBlock showAnchorIcon>
          Terms and Conditions
        </Button>
      </div>
    </div>
  );
}
