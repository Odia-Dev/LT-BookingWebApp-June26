import React from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  const borderColors = {
    success: "border-l-4 border-green-500",
    error: "border-l-4 border-red-500",
    info: "border-l-4 border-blue-500",
  };

  return (
    <div className={`flex items-center justify-between p-4 bg-white shadow-xl rounded-xl ${borderColors[type]} max-w-sm w-full`}>
      <span className="text-sm font-medium text-gray-800">{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none">
          &times;
        </button>
      )}
    </div>
  );
};
