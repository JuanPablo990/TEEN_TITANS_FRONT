import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { WeeklySchedule } from "@/components/weekly-schedule"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, AlertTriangle, Calendar } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const scheduleBlocks = [
    {
      id: "1",
      day: 0,
      startHour: 8,
      endHour: 10,
      subject: "Cálculo I",
      group: "A",
      room: "Aula 201",
    },
    {
      id: "2",
      day: 1,
      startHour: 10,
      endHour: 12,
      subject: "Física II",
      group: "B",
      room: "Lab 103",
    },
    {
      id: "3",
      day: 2,
      startHour: 14,
      endHour: 16,
      subject: "Programación",
      group: "C",
      room: "Aula 305",
    },
    {
      id: "4",
      day: 3,
      startHour: 8,
      endHour: 10,
      subject: "Cálculo I",
      group: "A",
      room: "Aula 201",
    },
    {
      id: "5",
      day: 4,
      startHour: 10,
      endHour: 12,
      subject: "Álgebra Lineal",
      group: "D",
      room: "Aula 102",
    },
  ]

  const recentRequests = [
    {
      id: "REQ-045",
      from: "Física II - Grupo B",
      to: "Física II - Grupo A",
      status: "Aprobada",
      date: "2024-01-10",
    },
    {
      id: "REQ-052",
      from: "Programación - Grupo C",
      to: "Programación - Grupo D",
      status: "Pendiente",
      date: "2024-01-15",
    },
  ]

  const upcomingClasses = [
    { subject: "Cálculo I", time: "Hoy, 8:00 AM", room: "Aula 201" },
    { subject: "Física II", time: "Mañana, 10:00 AM", room: "Lab 103" },
  ]

  const notifications = [
    {
      id: "1",
      type: "success",
      message: "Tu solicitud REQ-045 ha sido aprobada",
      date: "Hace 2 horas",
    },
    {
      id: "2",
      type: "warning",
      message: "Tu solicitud REQ-052 está en revisión",
      date: "Hace 1 día",
    },
  ]

  return (
    <DashboardLayout role="student" userName="Estudiante">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mi Panel</h1>
          <p className="text-muted-foreground mt-1">Bienvenido a tu espacio académico</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Solicitudes Pendientes"
            value="1"
            icon={<Clock className="h-4 w-4" />}
            description="En revisión"
            variant="warning"
          />
          <StatCard
            title="Solicitudes Aprobadas"
            value="3"
            icon={<CheckCircle className="h-4 w-4" />}
            description="Este periodo"
            variant="success"
          />
          <StatCard
            title="Materias Inscritas"
            value="5"
            icon={<Calendar className="h-4 w-4" />}
            description="Semestre actual"
          />
          <StatCard
            title="Avance del Plan"
            value="68%"
            icon={<AlertTriangle className="h-4 w-4" />}
            description="Créditos completados"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        notification.type === "success"
                          ? "bg-green-50 border-green-200"
                          : "bg-yellow-50 border-yellow-200"
                      }`}
                    >
                      {notification.type === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <WeeklySchedule scheduleBlocks={scheduleBlocks} title="Mi Horario Semanal" />

            <Card>
              <CardHeader>
                <CardTitle>Mis Solicitudes Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{request.id}</span>
                          <Badge
                            variant={
                              request.status === "Aprobada"
                                ? "default"
                                : request.status === "Pendiente"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>
                            <span className="font-medium">De:</span> {request.from}
                          </p>
                          <p>
                            <span className="font-medium">A:</span> {request.to}
                          </p>
                          <p>
                            <span className="font-medium">Fecha:</span> {request.date}
                          </p>
                        </div>
                      </div>
                      {request.status === "Aprobada" && <CheckCircle className="h-5 w-5 text-success" />}
                      {request.status === "Pendiente" && <Clock className="h-5 w-5 text-warning" />}
                      {request.status === "Rechazada" && <XCircle className="h-5 w-5 text-destructive" />}
                    </div>
                  ))}
                </div>
                <Link href="/student/requests">
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Ver Todas las Solicitudes
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Clases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingClasses.map((classItem, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{classItem.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">{classItem.time}</p>
                      <p className="text-xs text-muted-foreground">{classItem.room}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Cierre de periodo</p>
                    <p className="text-xs text-muted-foreground mt-1">El periodo de cambios cierra en 5 días</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/student/new-request">
                  <Button className="w-full">Nueva Solicitud</Button>
                </Link>
                <Link href="/student/schedule">
                  <Button variant="outline" className="w-full bg-transparent">
                    Ver Horario Completo
                  </Button>
                </Link>
                <Link href="/student/curriculum">
                  <Button variant="outline" className="w-full bg-transparent">
                    Plan de Estudios
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
