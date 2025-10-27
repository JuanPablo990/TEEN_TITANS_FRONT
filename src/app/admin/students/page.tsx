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

export default function StudentsPage() {
  const [students, setStudents] = useState([
    {
      id: 1,
      code: "2021-0001",
      name: "María González",
      email: "maria.gonzalez@universidad.edu",
      faculty: "Ingeniería",
      semester: 6,
      status: "Activo",
    },
    {
      id: 2,
      code: "2021-0002",
      name: "Pedro Sánchez",
      email: "pedro.sanchez@universidad.edu",
      faculty: "Ciencias",
      semester: 5,
      status: "Activo",
    },
    {
      id: 3,
      code: "2020-0045",
      name: "Laura Martínez",
      email: "laura.martinez@universidad.edu",
      faculty: "Humanidades",
      semester: 8,
      status: "Activo",
    },
    {
      id: 4,
      code: "2022-0123",
      name: "Carlos Ramírez",
      email: "carlos.ramirez@universidad.edu",
      faculty: "Ingeniería",
      semester: 3,
      status: "Inactivo",
    },
  ])

  const [editingStudent, setEditingStudent] = useState<any>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este estudiante?")) {
      setStudents(students.filter((s) => s.id !== id))
    }
  }

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Estudiantes</h1>
            <p className="text-muted-foreground mt-1">Administra los estudiantes del sistema</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Estudiante
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Estudiante</DialogTitle>
                <DialogDescription>Ingresa los datos del nuevo estudiante</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Código</Label>
                  <Input id="code" placeholder="Ej: 2024-0001" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Ej: Juan Pérez" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="estudiante@universidad.edu" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="faculty">Facultad</Label>
                    <Select>
                      <SelectTrigger id="faculty">
                        <SelectValue placeholder="Seleccionar" />
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
                    <Label htmlFor="semester">Semestre</Label>
                    <Input id="semester" type="number" placeholder="1" min="1" max="10" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Crear Estudiante
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar por nombre, código o correo..." className="pl-10" />
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
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Facultad</TableHead>
                <TableHead>Semestre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.code}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.faculty}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        student.status === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isEditOpen && editingStudent?.id === student.id} onOpenChange={setIsEditOpen}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditingStudent(student)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Editar Estudiante</DialogTitle>
                            <DialogDescription>Actualiza los datos del estudiante</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-name">Nombre Completo</Label>
                              <Input id="edit-name" defaultValue={editingStudent?.name} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-email">Correo Electrónico</Label>
                              <Input id="edit-email" type="email" defaultValue={editingStudent?.email} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="edit-faculty">Facultad</Label>
                                <Select defaultValue={editingStudent?.faculty.toLowerCase()}>
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
                                <Label htmlFor="edit-semester">Semestre</Label>
                                <Input
                                  id="edit-semester"
                                  type="number"
                                  defaultValue={editingStudent?.semester}
                                  min="1"
                                  max="10"
                                />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-status">Estado</Label>
                              <Select defaultValue={editingStudent?.status.toLowerCase()}>
                                <SelectTrigger id="edit-status">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="activo">Activo</SelectItem>
                                  <SelectItem value="inactivo">Inactivo</SelectItem>
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
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(student.id)}>
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
