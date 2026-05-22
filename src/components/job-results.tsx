"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useJobResults } from "../hooks/use-jobs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function JobResults({ jobId }: { jobId: string }) {
  const [page, setPage] = useState(1);
  const perPage = 20;

  const { data, isPlaceholderData } = useJobResults(jobId, page, perPage);

  const sentimentConfig = {
    POSITIVE: "bg-green-100 text-green-800",
    NEGATIVE: "bg-red-100 text-red-800",
    NEUTRAL: "bg-gray-100 text-gray-800",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados {data && `(${data.total} texts)`}</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%]">Texto</TableHead>
              <TableHead>Sentimiento</TableHead>
              <TableHead className="text-right">Puntuación</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.results.map((result, idx) => (
              <TableRow
                key={idx}
                className={isPlaceholderData ? "opacity-50" : ""}
              >
                <TableCell className="max-w-md">
                  <p className="truncate">{result.text}</p>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={sentimentConfig[result.sentiment]}
                  >
                    {result.sentiment}
                  </Badge>
                </TableCell>

                <TableCell className="text-right font-mono">
                  {result.score.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isPlaceholderData}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
          </Button>

          <span className="text-sm text-muted-foreground">
            Pagina {page} de {data?.total_pages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === data?.total_pages || isPlaceholderData}
          >
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
