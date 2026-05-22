"use client";

import { Loader2 } from "lucide-react";
import { useJobStatus } from "../hooks/use-jobs";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function JobStatus({ jobId }: { jobId: string }) {
  const { data, isLoading } = useJobStatus(jobId);

  if (isLoading) return <Skeleton />;
  // if (error) return <ErrorCard error={error} />

  const statusColors = {
    PENDING: "bg-yellow-500",
    PROCESSING: "bg-blue-500",
    COMPLETED: "bg-green-500",
    FAILED: "bg-red-500",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Estado del proceso</CardTitle>
        <Badge className={statusColors[data?.status || "PENDING"]}>
          {data?.status === "PROCESSING" && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {data?.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {data?.status === "PROCESSING" && (
          <>
            <Progress value={data.progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {data.processed} / {data.total} textos procesados.
            </p>
          </>
        )}

        {data?.status === "COMPLETED" && (
          <p className="text-sm text-green-600">
            ✓ Se procesaron exitosamente {data.total} textos.
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          Creada:{" "}
          {data?.created_at ? new Date(data.created_at).toLocaleString() : "-"}
        </p>
      </CardContent>
    </Card>
  );
}
