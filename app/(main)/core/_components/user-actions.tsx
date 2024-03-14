"use client";

import useUser from "@/app/hooks/useUser";
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
  const { data, handleLogout } = useUser();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger className="mt-5" aria-label="trigger">
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: `${data?.data.user?.user_metadata.avatar_url}`,
            showFallback: true,
          }}
          className="transition-transform truncate"
          name={data?.data.user?.user_metadata.full_name}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Menu">
        <DropdownSection title="Redirects">
          <DropdownItem
            href="/"
            startContent={
              <Icon
                icon="material-symbols:home"
                className={cn(
                  "text-default-500 size-6 text-xl pointer-events-none flex-shrink-0"
                )}
              />
            }
          >
            Go to home
          </DropdownItem>
        </DropdownSection>
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
