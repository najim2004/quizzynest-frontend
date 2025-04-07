"use client";
import { useState, forwardRef, useImperativeHandle } from "react";

interface CustomModalProps {
  className?: string;
  children: React.ReactNode;
}

const CustomModal = forwardRef(
  ({ className, children }: CustomModalProps, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    if (!isOpen) return null;

    return (
      <div
        className={`absolute top-0 left-0 w-full h-full flex items-center justify-center ${className}`}
      >
        {children}
      </div>
    );
  }
);

CustomModal.displayName = "CustomModal";
export default CustomModal;
