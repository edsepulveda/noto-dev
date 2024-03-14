"use client";

import EmptySVG from "@/utils/svgs/svg";
import useUser from "@/app/hooks/useUser";

export default function DocumentsPage() {
  const { data, isLoading } = useUser();

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <EmptySVG />
      <div className='pt-11'>
        {!isLoading && (
          <h2 className="text-lg md:text-xl font-bold text-primary">
            Welcome to{" "}
            <span className="text-warning-500">
              {data?.data.user?.user_metadata.name ?? ""}&apos;s
            </span>{" "}
            Notes
          </h2>
        )}
        <p className="text-center text-xs text-muted-foreground">
          Click in a note to see more information
        </p>
      </div>
    </div>
  );
}
