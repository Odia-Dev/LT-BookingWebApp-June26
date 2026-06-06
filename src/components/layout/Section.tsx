import React from "react";

export const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <section className={`py-12 md:py-18 lg:py-24 w-full ${className}`}>
      {children}
    </section>
  );
};
