import axiosInstance from "../axios";

export interface JobStatus {
  job_id: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  progress: number;
  processed: number;
  total: number;
  created_at: string;
}

export interface TextResult {
  text: string;
  sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  score: number;
}

export interface JobResultsResponse {
  job_id: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: TextResult[];
}

export interface JobReport {
  job_id: string;
  positive_count: number;
  negative_count: number;
  neutral_count: number;
  average_score: number;
  total_texts: number;
}

export const jobsApi = {
  getStatus: async (jobId: string): Promise<JobStatus> => {
    const { data } = await axiosInstance.get(`/jobs/${jobId}`);
    return data;
  },

  getResults: async (
    jobId: string,
    page: number = 1,
    perPage: number = 20,
  ): Promise<JobResultsResponse> => {
    const { data } = await axiosInstance.get(`/jobs/${jobId}/results`, {
      params: { page, per_page: perPage },
    });
    return data;
  },

  getReport: async (jobId: string): Promise<JobReport> => {
    const { data } = await axiosInstance.get(`/jobs/${jobId}/report`);
    return data;
  },
};
