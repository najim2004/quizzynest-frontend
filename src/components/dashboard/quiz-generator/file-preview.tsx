"use client";

import { X, FileIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  files: File[];
  removeFile: (file: File) => void;
}

export function FilePreview({ files, removeFile }: Props) {
  return (
    <div className="mt-8 w-[calc(100%-8rem)]">
      <h4 className="text-lg font-medium mb-4">Selected Files:</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {files.map((file) => (
          <div key={file.name} className="relative">
            {file.type.startsWith("image/") ? (
              <div className="h-32 w-32 relative rounded-lg overflow-hidden">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-32 w-32 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                <FileIcon className="h-8 w-8 text-primary mb-2" />
                <p className="text-xs text-center px-2 break-words max-w-full">
                  {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                </p>
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile(file);
              }}
              className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
