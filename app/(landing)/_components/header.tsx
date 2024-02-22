"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import useUser from "@/app/hooks/useUser";

export function Header() {
  const { user, isLoading } = useUser();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="scroll-m-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-relaxed">
        Your ideas can be true with{" "}
        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Noto
        </span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl text-foreground-500 text-balance">
        Noto is a singular workspace only for you
      </h3>
      <div className="flex flex-col-reverse gap-3 md:flex-row">
        {!user && isLoading && (
          <span className="text-center mx-auto">
            <Icon icon="gg:spinner" className="size-9 animate-spin" />
          </span>
        )}
        {user && !isLoading && (
          <Button
            as={Link}
            className="hero-button-effect-dark group mx-auto relative w-fit overflow-hidden rounded-xl p-px font-bold transition-all duration-300 dark:block dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8] md:mr-0 lg:mr-auto"
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
        {!user && !isLoading && (
          <Button
            as={Link}
            className="hero-button-effect-dark group mx-auto relative w-fit overflow-hidden rounded-xl p-px font-bold transition-all duration-300 dark:block dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8] md:mr-0 lg:mr-auto"
            href={"/login"}
            variant="faded"
          >
            <span className="inline-flex h-full w-fit items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 dark:bg-neutral-900 dark:text-white dark:group-hover:bg-black">
              Join Noto
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
