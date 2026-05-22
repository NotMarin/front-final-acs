"use client";

import { JobReport } from "@/src/components/job-report";
import { JobResults } from "@/src/components/job-results";
import { JobStatus } from "@/src/components/job-status";

export default function JobPage({ params }: { params: { jobId: string } }) {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Job Analysis</h1>

      <JobStatus jobId={params.jobId} />
      <JobReport jobId={params.jobId} />
      <JobResults jobId={params.jobId} />
    </div>
  );
}
