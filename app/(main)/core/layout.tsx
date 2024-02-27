"use client";

import { Spinner } from "@/app/components/spinner";
import useUser from "@/app/hooks/useUser";
import { redirect } from "next/navigation";
import Sidebar from "./_components/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/components/ui/resize";
import { useState } from "react";
import { cn } from "@nextui-org/react";

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultLayout = [100, 440];
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full max-h-[800px] items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={4}
        collapsible={true}
        minSize={15}
        maxSize={30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            isCollapsed
          )}`;
        }}
        className={cn(
          isCollapsed && "min-w-[50px] transition-all duration-500 ease-in-out"
        )}
      >
        <Sidebar isCollapsed={isCollapsed} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <main className="flex-1 h-screen overflow-y-auto dark:bg-[#121212]">
          {children}
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
