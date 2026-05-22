import Link from "next/link";
import { Activity, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { JobListItem } from "@/src/components/job-list-item";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const JOBS = [
  { id: "job_9f2c3a" },
  { id: "job_1c77b8" },
  { id: "job_7d4a20" },
  { id: "job_4e91ff" },
  { id: "job_2bb3de" },
  { id: "job_5aa0c1" },
];

const STATS = [
  {
    label: "Procesados hoy",
    value: "12,480",
    trend: "+12%",
    icon: Activity,
    tone: "text-emerald-300",
    ring: "ring-emerald-400/20",
  },
  {
    label: "Promedio score",
    value: "0.78",
    trend: "+0.04",
    icon: Sparkles,
    tone: "text-amber-300",
    ring: "ring-amber-400/20",
  },
  {
    label: "En cola",
    value: "6",
    trend: "-2",
    icon: Clock,
    tone: "text-cyan-300",
    ring: "ring-cyan-400/20",
  },
];

function DashboardPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(56,189,248,0.16),transparent_55%),radial-gradient(900px_circle_at_90%_20%,rgba(251,191,36,0.14),transparent_60%),radial-gradient(800px_circle_at_40%_90%,rgba(16,185,129,0.14),transparent_60%),linear-gradient(180deg,rgba(2,6,23,0.9),rgba(2,6,23,0.95))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-cyan-500/15 text-cyan-200">Panel activo</Badge>
            <Badge variant="outline" className="border-white/15 text-white/70">
              Ultima sync 2 min
            </Badge>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Radar de sentimiento
              </h1>
              <p className="max-w-xl text-sm text-white/70 md:text-base">
                Controla ritmo, impacto y calidad de cada analisis. Entra a un
                proceso con un click y precarga datos al pasar el mouse.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="bg-white text-slate-900 hover:bg-white/90"
              >
                <Link href={`/jobs/${JOBS[0].id}`}>
                  Abrir ultimo
                  <ArrowUpRight className="ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 text-white"
              >
                <Link href={`/jobs/${JOBS[1].id}`}>Ver comparativa</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {STATS.map(({ label, value, trend, icon: Icon, tone, ring }) => (
                <Card
                  key={label}
                  className={`bg-white/5 backdrop-blur ${ring}`}
                >
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm text-white/70">
                      {label}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${tone}`} />
                  </CardHeader>
                  <CardContent className="flex items-end justify-between">
                    <div className="text-2xl font-semibold text-white">
                      {value}
                    </div>
                    <Badge className="bg-white/10 text-white/70">{trend}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/5 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Mapa de pulso</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Zonas activas
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Call center + soporte
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    Mayor volumen en franjas 09:00 - 12:00 y 17:00 - 19:00.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Alertas
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    2 picos negativos
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    Revisa lotes con score menor a 0.4 antes de enviar reporte.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Ultimos procesos</CardTitle>
                <Badge
                  variant="outline"
                  className="border-white/15 text-white/70"
                >
                  Prefetch on hover
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                {JOBS.map((job) => (
                  <JobListItem key={job.id} job={job} />
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Cola activa</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <span className="text-white/70">Lotes pendientes</span>
                  <span className="font-semibold text-white">6</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <span className="text-white/70">Tiempo medio</span>
                  <span className="font-semibold text-white">3m 24s</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <span className="text-white/70">SLA objetivo</span>
                  <span className="font-semibold text-white">&lt; 5m</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
