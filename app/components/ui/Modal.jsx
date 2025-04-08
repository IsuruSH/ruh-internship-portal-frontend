"use client";
import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

const Modal = ({
  isOpen,
  onClose,
  children,
  title = "",
  size = "md", // sm, md, lg, xl
  closeOnOverlayClick = true,
}) => {
  const modalRef = useRef(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
    >
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
      ></div>

      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-0">
        {/* Modal content */}
        <div
          ref={modalRef}
          className={`relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full ${sizeClasses[size]} mx-auto`}
          onClick={(e) => e.stopPropagation()}
          tabIndex="-1"
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-label="Close modal"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Close button (floating) when no title */}
          {!title && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Close modal"
            >
              <FiX className="h-6 w-6" />
            </button>
          )}

          {/* Body */}
          <div className="p-4 sm:p-6">{children}</div>

          {/* Footer (optional) */}
          {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              onClick={onClose}
            >
              Close
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
