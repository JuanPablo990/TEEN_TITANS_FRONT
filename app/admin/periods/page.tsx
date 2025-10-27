"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar, Pencil, Plus } from "lucide-react"
import { useState } from "react"

export default function PeriodsPage() {
  const [periods] = useState([
    {
      id: 1,
      name: "2024-1",
      startDate: "2024-01-15",
      endDate: "2024-05-30",
      requestsStart: "2024-01-01",
      requestsEnd: "2024-01-20",
      status: "Activo",
    },
    {
      id: 2,
      name: "2023-2",
      startDate: "2023-08-01",
      endDate: "2023-12-15",
      requestsStart: "2023-07-15",
      requestsEnd: "2023-08-05",
      status: "Finalizado",
    },
  ])

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Periodos</h1>
            <p className="text-muted-foreground mt-1">Administra los periodos académicos</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Periodo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Periodo</DialogTitle>
                <DialogDescription>Ingresa los datos del nuevo periodo académico</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre del Periodo</Label>
                  <Input id="name" placeholder="Ej: 2024-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Fecha de Inicio</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">Fecha de Fin</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="requestsStart">Inicio Solicitudes</Label>
                    <Input id="requestsStart" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="requestsEnd">Fin Solicitudes</Label>
                    <Input id="requestsEnd" type="date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Crear Periodo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {periods.map((period) => (
            <Card key={period.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-bold">{period.name}</CardTitle>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      period.status === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {period.status}
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Editar Periodo</DialogTitle>
                      <DialogDescription>Actualiza los datos del periodo académico</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-name">Nombre del Periodo</Label>
                        <Input id="edit-name" defaultValue={period.name} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-startDate">Fecha de Inicio</Label>
                          <Input id="edit-startDate" type="date" defaultValue={period.startDate} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-endDate">Fecha de Fin</Label>
                          <Input id="edit-endDate" type="date" defaultValue={period.endDate} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-requestsStart">Inicio Solicitudes</Label>
                          <Input id="edit-requestsStart" type="date" defaultValue={period.requestsStart} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-requestsEnd">Fin Solicitudes</Label>
                          <Input id="edit-requestsEnd" type="date" defaultValue={period.requestsEnd} />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        Guardar Cambios
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Periodo Académico</span>
                    </div>
                    <p className="text-sm font-medium">
                      {period.startDate} - {period.endDate}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Ventana de Solicitudes</span>
                    </div>
                    <p className="text-sm font-medium">
                      {period.requestsStart} - {period.requestsEnd}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
