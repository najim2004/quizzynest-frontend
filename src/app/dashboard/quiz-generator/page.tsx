"use client";

import { FileDropzone } from "@/components/dashboard/quiz-generator/file-dropzone";
import { FilePreview } from "@/components/dashboard/quiz-generator/file-preview";
import { useFileUploader } from "@/components/dashboard/quiz-generator/useFileUploader";

const QuizGenerator = () => {
  const { files, onDrop, removeFile, MAX_FILES } = useFileUploader();

  return (
    <div className="p-4 h-full flex flex-col items-center justify-center w-full">
      <FileDropzone onDrop={onDrop} disabled={files.length >= MAX_FILES} />
      {files.length > 0 && (
        <FilePreview files={files} removeFile={removeFile} />
      )}
    </div>
  );
};

export default QuizGenerator;
