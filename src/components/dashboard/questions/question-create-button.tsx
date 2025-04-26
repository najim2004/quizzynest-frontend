"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useRef } from "react";
import CustomModal from "../custom-modal/custom-modal";
import { IoClose } from "react-icons/io5";
import { AddQuestionForm } from "./add-question-form";

const QuestionCreateButton = () => {
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
      <CustomModal ref={modalRef} className="w-full bg-white h-[calc(100vh-32px] overflow-hidden p-4">
        <div className="relative h-full w-full">
          <Button
            onClick={() => modalRef.current?.close()}
            size="icon"
            variant="outline"
            className="absolute top-0.5 right-0.5 bg-white"
          >
            <IoClose />
          </Button>
          <div className="w-full overflow-y-auto max-h-full py-5">
            <AddQuestionForm />
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default QuestionCreateButton;
