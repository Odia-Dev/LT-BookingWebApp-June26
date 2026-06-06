import React from "react";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className={`inline-flex items-center gap-3 cursor-pointer text-base text-[#111111] ${className}`}>
          <input
            id={id}
            type="radio"
            ref={ref}
            className="w-5 h-5 rounded-full border-gray-300 text-[#EB0A1E] focus:ring-[#EB0A1E]"
            {...props}
          />
          <span>{label}</span>
        </label>
        {error && <span className="text-xs text-red-500 font-medium mt-1">{error}</span>}
      </div>
    );
  }
);
Radio.displayName = "Radio";
