"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useJobReport } from "../hooks/use-jobs";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function JobReport({ jobId }: { jobId: string }) {
  const { data, isLoading } = useJobReport(jobId);

  if (isLoading) return <Skeleton />;

  const stats = [
    {
      label: "Positivo",
      value: data?.positive_count,
      icon: TrendingUp,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Neutral",
      value: data?.neutral_count,
      icon: Minus,
      color: "text-gray-600 bg-gray-50",
    },
    {
      label: "Negativo",
      value: data?.negative_count,
      icon: TrendingDown,
      color: "text-red-600 bg-red-50",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reporte del proceso</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className={`p-4 rounded-lg ${color}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{label}</span>
              </div>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Puntuación promedio de sentimiento
          </p>
          <p className="text-3xl font-bold mt-1">
            {data?.average_score?.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Basado en {data?.total_texts} textos analizados
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
