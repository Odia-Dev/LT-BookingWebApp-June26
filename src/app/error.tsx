"use client";
import React, { useEffect } from "react";

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log to Sentry
    console.error("ErrorBoundary caught error: ", error);
  }, [error]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Something went wrong.</h2>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
}
