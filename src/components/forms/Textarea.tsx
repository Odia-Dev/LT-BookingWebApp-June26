import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && <label htmlFor={id} className="text-sm font-medium text-[#111111]">{label}</label>}
        <textarea
          id={id}
          ref={ref}
          className={`p-4 rounded-xl border border-gray-300 bg-white text-base focus:border-[#EB0A1E] focus:outline-none transition-colors w-full min-h-[120px] ${error ? "border-red-500 focus:border-red-500" : ""} ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
