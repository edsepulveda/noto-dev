"use client";

import { Button, Input } from "@nextui-org/react";
import { type Documents } from "@prisma/client";
import React, { useRef, useState } from "react";

interface Props {
  initialData: Documents;
}

export const Title = (props: Props) => {
  const { initialData } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<Documents["title"]>(
    initialData?.title || "Untitled"
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const enableEdit = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableEdit = () => {
    setIsEditing(false);
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "enter") {
      disableEdit();
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData?.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableEdit}
          onBlur={disableEdit}
          value={title}
          onChange={onChange}
          onKeyDown={onKeyDown}
          size="sm"
          variant="faded"
        />
      ) : (
        <Button
          onClick={enableEdit}
          variant="light"
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">
            {initialData?.title ?? "Loading title..."}
          </span>
        </Button>
      )}
    </div>
  );
};
