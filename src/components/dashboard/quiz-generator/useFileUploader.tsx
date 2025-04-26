import { useCallback, useState } from "react";
import { toast } from "sonner";

const MAX_FILES = 3;
const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB

export function useFileUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // File count validation
      if (files.length + acceptedFiles.length > MAX_FILES) {
        toast.error(`You can only upload up to ${MAX_FILES} files`);
        return;
      }

      // File size validation
      const existingSize = files.reduce((total, file) => total + file.size, 0);
      const newTotalSize = acceptedFiles.reduce(
        (total, file) => total + file.size,
        existingSize
      );

      if (newTotalSize > MAX_TOTAL_SIZE) {
        toast.error("Total file size cannot exceed 10MB");
        return;
      }

      // File type validation
      const validFiles = acceptedFiles.filter((file) => {
        const isValid =
          file.type.startsWith("image/") || file.type === "application/pdf";

        if (!isValid) {
          toast.error(
            `Invalid file type: ${file.name}. Only images and PDFs are allowed.`
          );
        }

        return isValid;
      });

      if (validFiles.length === 0) return;

      // Update state
      setFiles((prev) => [...prev, ...validFiles]);
    },
    [files]
  );

  const removeFile = useCallback((fileToRemove: File) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return {
    files,
    onDrop,
    removeFile,
    clearFiles,
    MAX_FILES,
    MAX_TOTAL_SIZE,
  };
}
