import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection,
  cn,
} from "@nextui-org/react";
import { type User as Users } from "@supabase/supabase-js";
import { Icon } from "@iconify/react";

interface UserProps {
  onClick: () => void;
  user: Users | null;
}

export default function UserProfile({ user, onClick }: UserProps) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown
        placement="bottom-end"
        classNames={{
          base: "before:bg-default-200",
          content:
            "py-1 px-1 border border-default-200 bg-gradient-to-bl from-white to-default-200 dark:from-default-50 dark:to-black",
        }}
      >
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            showFallback={!user?.user_metadata.avatar_url}
            src={user?.user_metadata.avatar_url}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="profile" variant="faded">
          <DropdownItem key="profile info" className="h-14 gap-2">
            <p className="font-semibold">
              Signed as {user?.user_metadata.full_name}
            </p>
            <p className="font-semibold">Email: {user?.email}</p>
          </DropdownItem>
          <DropdownSection title="User Actions">
            <DropdownItem
              key="sign-out"
              aria-label="sign out user"
              color="danger"
              className="text-danger"
              description="Close the current session"
              onClick={onClick}
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
    </div>
  );
}
