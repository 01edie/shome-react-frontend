import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

// TODO change
function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ padding: "1rem", textAlign: "center" }}>
        <h1>Error</h1>
        <p>Status: {error.status}</p>
        <p>{error.statusText || "An unknown error occurred"}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h1>Something went wrong</h1>
      <p>{(error as Error)?.message || "An unknown error occurred"}</p>
    </div>
  );
}

export default ErrorBoundary;
