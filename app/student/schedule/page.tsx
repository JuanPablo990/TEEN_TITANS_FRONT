import { DashboardLayout } from "@/components/dashboard-layout"
import { WeeklySchedule } from "@/components/weekly-schedule"
import { Button } from "@/components/ui/button"
import { Download, Calendar } from "lucide-react"

export default function StudentSchedulePage() {
  const scheduleBlocks = [
    {
      id: "1",
      day: 0, // Lunes
      startHour: 8,
      endHour: 10,
      subject: "Cálculo I",
      group: "A",
      room: "A-101",
    },
    {
      id: "2",
      day: 0, // Lunes
      startHour: 10,
      endHour: 12,
      subject: "Física I",
      group: "B",
      room: "B-205",
    },
    {
      id: "3",
      day: 1, // Martes
      startHour: 8,
      endHour: 10,
      subject: "Estructuras de Datos",
      group: "C",
      room: "LAB-301",
    },
    {
      id: "4",
      day: 1, // Martes
      startHour: 14,
      endHour: 16,
      subject: "Filosofía",
      group: "D",
      room: "A-203",
    },
    {
      id: "5",
      day: 2, // Miércoles
      startHour: 8,
      endHour: 10,
      subject: "Cálculo I",
      group: "A",
      room: "A-101",
    },
    {
      id: "6",
      day: 3, // Jueves
      startHour: 10,
      endHour: 12,
      subject: "Física I",
      group: "B",
      room: "B-205",
    },
    {
      id: "7",
      day: 4, // Viernes
      startHour: 8,
      endHour: 10,
      subject: "Estructuras de Datos",
      group: "C",
      room: "LAB-301",
    },
  ]

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mi Horario</h1>
            <p className="text-muted-foreground mt-1">Visualiza tu horario de clases semanal</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Ver Calendario
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Materias Inscritas</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Créditos Totales</p>
                <p className="text-2xl font-bold text-foreground">14</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Horas Semanales</p>
                <p className="text-2xl font-bold text-foreground">14</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
        </div>

        <WeeklySchedule scheduleBlocks={scheduleBlocks} title="Mi Horario Semanal" />
      </div>
    </DashboardLayout>
  )
}
