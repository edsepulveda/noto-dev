"use client";

import { Spinner } from "@/app/components/spinner";
import useUser from "@/app/hooks/useUser";
import { redirect } from "next/navigation";
import Sidebar from "./_components/navigation";
import SearchCommand from "./_components/search/search-command";

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="size-20" />
      </div>
    );
  }

  if (!data?.data.user) {
    return redirect("/");
  }

  return (
    <div className="h-full flex">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto dark:bg-[#121212]">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
}
