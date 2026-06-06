import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-xl h-12 px-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[#EB0A1E] text-white hover:bg-[#d0091a] focus:ring-[#EB0A1E]",
    secondary: "bg-[#111111] text-white hover:bg-black focus:ring-[#111111]",
    outline: "bg-transparent border border-[#EB0A1E] text-[#EB0A1E] hover:bg-red-50 focus:ring-[#EB0A1E]",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block animate-spin mr-2 border-2 border-current border-t-transparent rounded-full w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
};
