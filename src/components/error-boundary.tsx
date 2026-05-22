"use client";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-xl font-semibold mb-2">Oops! Algo salió mal.</h2>
      <p className="text-muted-foreground mb-4">
        {error instanceof Error
          ? error.message
          : "Ha ocurrido un error inesperado. Por favor intenta de nuevo."}
      </p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ReactErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}
