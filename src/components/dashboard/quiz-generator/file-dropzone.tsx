"use client";

import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface Props {
  onDrop: (acceptedFiles: File[]) => void;
  disabled: boolean;
}

export function FileDropzone({ onDrop, disabled }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`w-[calc(100%-8rem)] border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-primary bg-primary/5"
          : disabled
          ? "border-gray-300 bg-gray-100 cursor-not-allowed"
          : "border-slate-300 dark:border-slate-700 hover:border-primary/50"
      }`}
    >
      <input {...getInputProps()} disabled={disabled} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-primary/10 rounded-full">
          <Upload className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-lg font-medium">
          {isDragActive
            ? "Drop files here"
            : disabled
            ? "Maximum files reached"
            : "Drag & drop files here"}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Upload up to 3 files (total size: 10MB max)
        </p>
      </div>
    </div>
  );
}
