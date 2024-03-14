import Image from "next/image";
import HeroLogo from "@/public/notes-landing.svg";
import Link from "next/link";
import Supabase from "@/public/logos/supabase-logo-icon.svg";
import Prisma from "@/public/logos/prisma-3.svg";
import PrismaLight from "@/public/logos/icons8-prisma-orm.svg";
import Tailwind from "@/public/logos/icons8-tailwind-css.svg";

export function Hero() {
  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="mx-auto text-center mb-6">
        <h2 className="text-xl font-semibold md:text-3xl md:leading-tight text-primary">
          This application is build with
        </h2>
      </div>
      <div className="my-6 md:my-16 grid grid-cols-3 sm:flex sm:justify-center gap-6 sm:gap-x-12 lg:gap-x-20">
        <Link
          className="shrink-0 transition hover:translate-y-1"
          href="https://supabase.com"
          target="_blank"
        >
          <Image
            src={Supabase}
            className="size-6 md:size-16 mx-auto sm:mx-0"
            alt="supabase svg icon"
          />
        </Link>
        <Link
          className="shrink-0 transition hover:translate-y-1"
          href="https://www.prisma.io/"
          target="_blank"
        >
          <Image
            src={Prisma}
            className="size-6 md:size-16 mx-auto sm:mx-0 dark:hidden"
            alt="Prisma svg icon"
          />
          <Image
            src={PrismaLight}
            className="hidden size-6 md:size-16 mx-auto sm:mx-0 dark:block"
            alt="Prisma svg icon"
          />
        </Link>
        <Link
          className="shrink-0 transition hover:translate-y-1"
          href="https://tailwindcss.com/"
          target="_blank"
        >
          <Image
            src={Tailwind}
            className="size-6 md:size-16 mx-auto sm:mx-0"
            alt="tailwind svg icon"
          />
        </Link>
      </div>
    </div>
  );
}
