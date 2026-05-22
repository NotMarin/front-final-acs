"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { jobsApi } from "../lib/api/jobs";

type JobListItemProps = {
  job: {
    id: string;
  };
};

export function JobListItem({ job }: JobListItemProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const perPage = 20;

  const handlePrefetch = () => {
    void Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["job", job.id, "status"],
        queryFn: () => jobsApi.getStatus(job.id),
      }),
      queryClient.prefetchQuery({
        queryKey: ["job", job.id, "report"],
        queryFn: () => jobsApi.getReport(job.id),
      }),
      queryClient.prefetchQuery({
        queryKey: ["job", job.id, "results", 1, perPage],
        queryFn: () => jobsApi.getResults(job.id, 1, perPage),
      }),
    ]);
  };

  return (
    <button
      type="button"
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      onTouchStart={handlePrefetch}
      onClick={() => router.push(`/jobs/${job.id}`)}
      className="w-full text-left cursor-pointer hover:bg-accent p-4 rounded"
    >
      {job.id}
    </button>
  );
}
