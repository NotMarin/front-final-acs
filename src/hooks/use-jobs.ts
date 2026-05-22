import { useQuery } from "@tanstack/react-query";
import { jobsApi } from "../lib/api/jobs";

export function useJobStatus(jobId: string) {
  return useQuery({
    queryKey: ["job", jobId, "status"],
    queryFn: () => jobsApi.getStatus(jobId),
    enabled: !!jobId,
    refetchInterval: (query) =>
      query.state.data?.status === "PROCESSING" ? 2000 : false,
    staleTime: (query) =>
      query.state.data?.status === "COMPLETED" ? Infinity : 5000,
  });
}

export function useJobResults(
  jobId: string,
  page: number = 1,
  perPage: number = 20,
) {
  return useQuery({
    queryKey: ["job", jobId, "results", page, perPage],
    queryFn: () => jobsApi.getResults(jobId, page, perPage),
    enabled: !!jobId,
    placeholderData: (previousData) => previousData,
  });
}

export function useJobReport(jobId: string) {
  return useQuery({
    queryKey: ["job", jobId, "report"],
    queryFn: () => jobsApi.getReport(jobId),
    enabled: !!jobId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
