import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && <label htmlFor={id} className="text-sm font-medium text-[#111111]">{label}</label>}
        <select
          id={id}
          ref={ref}
          className={`h-12 px-4 rounded-xl border border-gray-300 bg-white text-base focus:border-[#EB0A1E] focus:outline-none transition-colors w-full ${error ? "border-red-500 focus:border-red-500" : ""} ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);
Select.displayName = "Select";
