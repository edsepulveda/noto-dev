"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import useUser from "@/app/hooks/useUser";
import Title from "../_components/title";

export function Header() {
  const { data, isLoading } = useUser();

  return (
    <div className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
      <Title
        pill="💨 Workspaces, folders, files"
        heading="Your ideas can be true with Noto"
        subContent="Noto is shared workspace based application"
      />
      <div className="w-full flex flex-col gap-3 md:flex-row mt-5 justify-start md:justify-center">
        {!data?.data.user && isLoading && (
          <span className="md:text-center">
            <Icon icon="gg:spinner" className="size-9 animate-spin" />
          </span>
        )}
        {data?.data.user && !isLoading && (
          <Button
            as={Link}
            className="hero-button-effect-dark group mx-auto relative w-fit overflow-hidden rounded-xl p-px font-bold transition-all duration-300 dark:block dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8]"
            href={"/core/documents"}
            variant="faded"
          >
            <span className="inline-flex h-full w-fit items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 dark:bg-neutral-900 dark:text-white dark:group-hover:bg-black">
              Enter Application
              <Icon
                icon="formkit:arrowright"
                className="size-5 group-hover:ml-2 transition-all duration-75"
              />
            </span>
          </Button>
        )}
        {!data?.data.user && !isLoading && (
          <Button
            as={Link}
            className="hero-button-effect-dark group relative w-fit overflow-hidden rounded-xl p-px font-bold transition-all duration-300 dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8]"
            href={"/login"}
            variant="faded"
          >
            <span className="inline-flex h-full w-fit items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 dark:bg-neutral-900 dark:text-white dark:group-hover:bg-black">
              Join Noto for free
              <Icon
                icon="formkit:arrowright"
                className="size-5 group-hover:ml-2 transition-all duration-75"
              />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
