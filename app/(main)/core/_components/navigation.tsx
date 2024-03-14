"use client";

import { Icon } from "@iconify/react";
import {
  Tooltip,
  cn,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import UserActions from "./user-actions";
import DocumentList from "./documents/document-list";
import { Item } from "./item";
import { useDefaultNote } from "@/utils/mutations/mutations";
import useUser from "@/app/hooks/useUser";
import { toast } from "sonner";
import { ArchiveBox } from "./archiveBox";
import { useSearchStore } from "@/utils/store/useSearch";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useParams, usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function Sidebar() {
  const { data } = useUser();
  const mutation = useDefaultNote({ id: data?.data.user?.id ?? "" });
  const pathname = usePathname();
  const params = useParams();
  const search = useSearchStore();
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      const resetWidth = 240;

      setIsCollapsed(false);
      setReset(true);
      sidebarRef.current.style.width = isMobile ? "100%" : `${resetWidth}px`;
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : `calc(100% - ${resetWidth}px)`
      );
      navbarRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : `${resetWidth}px`
      );
      setTimeout(() => {
        setReset(false);
      }, 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setReset(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => {
        setReset(false);
      }, 300);
    }
  };

  const createDefaultNote = () => {
    const muta = mutation.mutateAsync();
    toast.promise(muta, {
      loading: "Creating a note...",
      success: "Note has been created",
      error: "Note cannot be created",
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        data-collapsed={isCollapsed}
        className={cn(
          "group/sidebar h-screen flex flex-col overflow-y-auto relative w-60 z-[99999] bg-[#f9f9f9] dark:bg-[#171717]",
          reset && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          className={cn(
            "size-6 text-muted-foreground rounded-sm opacity-0 hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
          onClick={collapse}
        >
          <span className="sr-only">close sidebar</span>
          <Icon icon="f7:chevron-left-2" className="size-6" />
        </div>

        <div>
          <UserActions />
          <Item
            onClick={search.onOpen}
            label="Search"
            icon={
              <Icon
                icon="material-symbols:search"
                className="shrink-0 mr-2 size-5"
              />
            }
            isSearch
          />
          <Item
            onClick={createDefaultNote}
            label={mutation.isPending ? "Creating Note..." : "Create Note"}
            icon={
              <Icon
                icon="icon-park-solid:doc-add"
                className="shrink-0 mr-2 size-5"
              />
            }
          />
        </div>
        <div className="mt-4">
          <DocumentList />
          <div className="mt-5">
            <Popover className="z-[99999999]" placement="right">
              <PopoverTrigger>
                <div role="button">
                  <Item
                    label="Archived Notes"
                    icon={
                      <Icon
                        icon="material-symbols:archive"
                        className="shrink-0 mr-2 size-5"
                      />
                    }
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <ArchiveBox />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div
          onClick={resetWidth}
          onMouseDown={handleDown}
          className="absolute opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[999999] left-60 w-[calc(100%-240px)]",
          reset && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onReset={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <Icon
                icon="f7:chevron-right-2"
                onClick={resetWidth}
                role="button"
                className="size-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
