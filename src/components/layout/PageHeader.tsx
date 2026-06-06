import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2 pb-6 border-b border-gray-200 w-full mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight">{title}</h1>
      {description && <p className="text-base text-gray-500">{description}</p>}
    </div>
  );
};
