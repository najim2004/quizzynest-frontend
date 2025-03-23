"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useRef } from "react";
import CustomModal from "../custom-modal/custom-modal";
import CreateCategoryForm from "./category-create-form";
import { IoClose } from "react-icons/io5";

const CategoryCreateButton = () => {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
  return (
    <>
      <Button
        onClick={() => modalRef.current?.open()}
        variant="outline"
        size="icon"
      >
        <Plus className="h-4 w-4" />
        <span className="text-gray-500 sr-only">Add Category</span>
      </Button>
      <CustomModal ref={modalRef} className="w-full">
        <div className="relative h-full w-full">
          <Button
          onClick={() => modalRef.current?.close()}
            size="icon"
            variant="outline"
            className="absolute top-0.5 right-0.5"
          >
            <IoClose />
          </Button>
          <CreateCategoryForm />
        </div>
      </CustomModal>
    </>
  );
};

export default CategoryCreateButton;
