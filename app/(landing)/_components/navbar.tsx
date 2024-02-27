"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextLink,
  Button,
  cn,
} from "@nextui-org/react";
import { Logo } from "@/app/components/logo";
import Link from "next/link";
import { ThemeToggler } from "./theme-toggler";
import useUser from "@/app/hooks/useUser";
import { Icon } from "@iconify/react";
import UserProfile from "./user-profile";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function NavbarLanding() {
  const supabase = createClient();
  const router = useRouter();
  const { user, isLoading } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut({ scope: "local" }).then(() => {
      toast.warning("You've been signed out", { duration: 500 });
    });
    router.replace("/login", { scroll: true });
  };

  return (
    <Navbar className="bg-transparent">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent justify="end">
        {!user && isLoading && (
          <span className="flex items-end">
            <Icon icon="gg:spinner" className="size-6 animate-spin" />
          </span>
        )}
        {user && !isLoading ? (
          <div className="flex gap-5 items-center">
            <NavbarItem>
              <UserProfile user={user} onClick={handleLogout} />
            </NavbarItem>
          </div>
        ) : (
          <NavbarItem>
            <NextLink
              className={cn(isLoading ? "hidden" : "block")}
              as={Link}
              href="/login"
            >
              Sign in
            </NextLink>
          </NavbarItem>
        )}
        {!user && !isLoading && (
          <NavbarItem>
            <Button color="primary" variant="flat" size="sm">
              Join Notion
            </Button>
          </NavbarItem>
        )}
        <NavbarItem>
          <ThemeToggler />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
