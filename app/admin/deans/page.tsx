"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Pencil, Trash2, Search } from "lucide-react"
import { useState } from "react"

export default function DeansPage() {
  const [deans, setDeans] = useState([
    {
      id: 1,
      name: "Dr. Carlos López",
      email: "carlos.lopez@universidad.edu",
      faculty: "Ingeniería",
      startDate: "2020-01-15",
      status: "Activo",
      role: "dean",
    },
    {
      id: 2,
      name: "Dra. Ana Martínez",
      email: "ana.martinez@universidad.edu",
      faculty: "Ciencias",
      startDate: "2019-08-01",
      status: "Activo",
      role: "dean",
    },
    {
      id: 3,
      name: "Dr. Roberto Silva",
      email: "roberto.silva@universidad.edu",
      faculty: "Humanidades",
      startDate: "2021-03-10",
      status: "Activo",
      role: "dean",
    },
  ])

  const [editingDean, setEditingDean] = useState<any>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este decano?")) {
      setDeans(deans.filter((d) => d.id !== id))
    }
  }

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Decanos</h1>
            <p className="text-muted-foreground mt-1">Administra los decanos del sistema</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Decano
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Decano</DialogTitle>
                <DialogDescription>Ingresa los datos del nuevo decano</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Ej: Dr. Juan Pérez" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="decano@universidad.edu" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="faculty">Facultad</Label>
                  <Select>
                    <SelectTrigger id="faculty">
                      <SelectValue placeholder="Seleccionar facultad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Ingeniería</SelectItem>
                      <SelectItem value="sciences">Ciencias</SelectItem>
                      <SelectItem value="humanities">Humanidades</SelectItem>
                      <SelectItem value="business">Negocios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Fecha de Inicio</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select defaultValue="dean">
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dean">Decano</SelectItem>
                      <SelectItem value="administrator">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Crear Decano
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar por nombre o correo..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por facultad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las facultades</SelectItem>
              <SelectItem value="engineering">Ingeniería</SelectItem>
              <SelectItem value="sciences">Ciencias</SelectItem>
              <SelectItem value="humanities">Humanidades</SelectItem>
              <SelectItem value="business">Negocios</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Facultad</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deans.map((dean) => (
                <TableRow key={dean.id}>
                  <TableCell className="font-medium">{dean.name}</TableCell>
                  <TableCell>{dean.email}</TableCell>
                  <TableCell>{dean.faculty}</TableCell>
                  <TableCell>{dean.startDate}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        dean.status === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {dean.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isEditOpen && editingDean?.id === dean.id} onOpenChange={setIsEditOpen}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditingDean(dean)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Editar Decano</DialogTitle>
                            <DialogDescription>Actualiza los datos del decano</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-name">Nombre Completo</Label>
                              <Input id="edit-name" defaultValue={editingDean?.name} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-email">Correo Electrónico</Label>
                              <Input id="edit-email" type="email" defaultValue={editingDean?.email} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-faculty">Facultad</Label>
                              <Select defaultValue={editingDean?.faculty.toLowerCase()}>
                                <SelectTrigger id="edit-faculty">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="engineering">Ingeniería</SelectItem>
                                  <SelectItem value="sciences">Ciencias</SelectItem>
                                  <SelectItem value="humanities">Humanidades</SelectItem>
                                  <SelectItem value="business">Negocios</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-role">Rol</Label>
                              <Select defaultValue={editingDean?.role}>
                                <SelectTrigger id="edit-role">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="dean">Decano</SelectItem>
                                  <SelectItem value="administrator">Administrador</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="bg-primary hover:bg-primary/90">
                              Guardar Cambios
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(dean.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}
