import React from "react";

export const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center w-full min-h-[200px]">
      <span className="inline-block animate-spin border-4 border-[#EB0A1E] border-t-transparent rounded-full w-10 h-10 mb-4" />
      <p className="text-sm text-gray-500 font-medium">Loading data...</p>
    </div>
  );
};
