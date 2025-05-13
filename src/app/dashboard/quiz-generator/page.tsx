"use client";

import { FileDropzone } from "@/components/dashboard/quiz-generator/file-dropzone";
import { FilePreview } from "@/components/dashboard/quiz-generator/file-preview";
import { useFileUploader } from "@/components/dashboard/quiz-generator/useFileUploader";
import { Button } from "@/components/ui/button";
import useQuizGeneratorStore from "@/stores/quizGeneratorStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const QuizGenerator = () => {
  const { files, onDrop, removeFile, MAX_FILES } = useFileUploader();
  const [filters, setFilters] = useState({
    search: "",
    categoryId: undefined as number | undefined,
    difficulty: undefined as "EASY" | "MEDIUM" | "HARD" | undefined,
    page: 1,
    limit: 10,
  });
  const {
    initiateQuizGeneration,
    getPendingQuizzes,
    checkJobStatus,
    pendingQuizzes,
    jobId,
    jobStatus,
    jobProgress,
    error,
    resetStore,
    message,
  } = useQuizGeneratorStore();
  useEffect(() => {
    const fetchPendingQuizzes = async () => {
      await getPendingQuizzes(filters);
    };
    fetchPendingQuizzes();
  }, [getPendingQuizzes, filters]);

  const onUploadFiles = async () => {
    try {
      if (files.length <= 0) {
        throw new Error("No files uploaded");
      }
      await initiateQuizGeneration(files);
      if (jobId) {
        toast.success(message || "Quiz generation stated please wait!");
      } else {
        throw new Error(error || "Failed to upload files");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload files"
      );
    }
  };

  useEffect(() => {
    if (
      !jobId ||
      jobStatus === "completed" ||
      jobProgress == 100 ||
      pendingQuizzes?.length > 0
    )
      return;
    const intervalId = setInterval(async () => {
      await checkJobStatus(jobId);
    }, 1000 * 20);
    return () => {
      clearInterval(intervalId);
    };
  }, [jobId, checkJobStatus, jobStatus, jobProgress, pendingQuizzes]);

  return (
    <>
      {pendingQuizzes?.length <= 0 && (
        <div className="p-4 h-full flex flex-col items-center justify-center w-full">
          <FileDropzone onDrop={onDrop} disabled={files.length >= MAX_FILES} />
          {files.length > 0 && (
            <>
              <FilePreview files={files} removeFile={removeFile} />
              <Button
                disabled={files.length <= 0 || pendingQuizzes?.length > 0}
                onClick={onUploadFiles}
                className="w-full md:w-[calc(100%-8rem)] mt-3"
              >
                Generate Quiz
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default QuizGenerator;
