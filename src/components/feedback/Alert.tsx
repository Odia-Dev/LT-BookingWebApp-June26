import React from "react";

interface AlertProps {
  title?: string;
  message: string;
  variant?: "success" | "warning" | "error" | "info";
}

export const Alert: React.FC<AlertProps> = ({ title, message, variant = "info" }) => {
  const styles = {
    success: "bg-green-50 border border-green-200 text-green-800",
    warning: "bg-amber-50 border border-amber-200 text-amber-800",
    error: "bg-red-50 border border-red-200 text-red-800",
    info: "bg-blue-50 border border-blue-200 text-blue-800",
  };

  return (
    <div className={`p-4 rounded-xl ${styles[variant]} flex flex-col gap-1 w-full`} role="alert">
      {title && <h4 className="font-semibold text-sm">{title}</h4>}
      <p className="text-sm">{message}</p>
    </div>
  );
};
