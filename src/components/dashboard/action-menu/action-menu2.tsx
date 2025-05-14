"use client";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { ClassNameValue } from "tailwind-merge";
import { Edit2, Trash2, CheckCircle } from "lucide-react";

interface ActionMenuProps {
  className?: ClassNameValue;
  onDelete: () => void;
  onEdit: () => void;
  onPublish?: () => void;
  isLoading?: boolean;
}

const ActionMenu2: FC<ActionMenuProps> = ({
  onDelete,
  onEdit,
  onPublish,
  isLoading = false,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
      <Button
        className="flex items-center w-full px-4 py-2 text-sm hover:bg-primary/80"
        disabled={isLoading}
        onClick={() => {
          onEdit();
        }}
        aria-label="Edit"
      >
        <Edit2 className="mr-2 h-4 w-4" /> Edit
      </Button>
      <Button
        className="flex items-center w-full px-4 py-2 text-sm bg-red-600 hover:bg-red-500 "
        disabled={isLoading}
        onClick={() => {
          onDelete();
        }}
        aria-label="Delete"
      >
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
      <Button
        className="flex items-center w-full px-4 py-2 text-sm hover:bg-green-500 bg-green-600"
        disabled={isLoading}
        onClick={() => onPublish && onPublish()}
        aria-label={"Publish"}
      >
        <CheckCircle className="mr-2 h-4 w-4" />
        Publish
      </Button>
    </div>
  );
};

export default ActionMenu2;
