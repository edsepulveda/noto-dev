"use client";

import useUser from "@/app/hooks/useUser";
import { createClient } from "@/utils/supabase/client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  cn,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function UserActions() {
  const { user, handleLogout } = useUser();

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: `${
              user?.user_metadata.avatar_url
            }`,
            showFallback: true,
          }}
          className="transition-transform"
          description={user?.email}
          name={user?.user_metadata.full_name}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownSection title="Danger Zone">
          <DropdownItem
            key="sign-out"
            aria-label="sign out user"
            color="danger"
            className="text-danger"
            description="Close the current session"
            onClick={handleLogout}
            startContent={
              <Icon
                icon="line-md:arrow-align-right"
                className={cn(
                  "text-default-500 size-6 text-xl pointer-events-none flex-shrink-0"
                )}
              />
            }
          >
            Sign Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
