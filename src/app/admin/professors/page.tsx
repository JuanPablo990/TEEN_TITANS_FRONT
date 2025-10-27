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

export default function ProfessorsPage() {
  const [professors, setProfessors] = useState([
    {
      id: 1,
      name: "Dr. Juan Pérez",
      email: "juan.perez@universidad.edu",
      faculty: "Ingeniería",
      department: "Sistemas",
      courses: 3,
      status: "Activo",
      role: "professor",
    },
    {
      id: 2,
      name: "Dra. María García",
      email: "maria.garcia@universidad.edu",
      faculty: "Ciencias",
      department: "Matemáticas",
      courses: 2,
      status: "Activo",
      role: "professor",
    },
    {
      id: 3,
      name: "Dr. Carlos López",
      email: "carlos.lopez@universidad.edu",
      faculty: "Ingeniería",
      department: "Industrial",
      courses: 4,
      status: "Activo",
      role: "professor",
    },
  ])

  const [editingProfessor, setEditingProfessor] = useState<any>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este profesor?")) {
      setProfessors(professors.filter((p) => p.id !== id))
    }
  }

  return (
    <DashboardLayout role="administrator">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Profesores</h1>
            <p className="text-muted-foreground mt-1">Administra los profesores del sistema</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Profesor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Profesor</DialogTitle>
                <DialogDescription>Ingresa los datos del nuevo profesor</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Ej: Dr. Juan Pérez" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="profesor@universidad.edu" />
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
                    <Label htmlFor="department">Departamento</Label>
                    <Input id="department" placeholder="Ej: Sistemas" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select defaultValue="professor">
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professor">Profesor</SelectItem>
                      <SelectItem value="administrator">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Crear Profesor
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
                <TableHead>Departamento</TableHead>
                <TableHead>Materias</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professors.map((professor) => (
                <TableRow key={professor.id}>
                  <TableCell className="font-medium">{professor.name}</TableCell>
                  <TableCell>{professor.email}</TableCell>
                  <TableCell>{professor.faculty}</TableCell>
                  <TableCell>{professor.department}</TableCell>
                  <TableCell>{professor.courses}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        professor.status === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {professor.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isEditOpen && editingProfessor?.id === professor.id} onOpenChange={setIsEditOpen}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditingProfessor(professor)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Editar Profesor</DialogTitle>
                            <DialogDescription>Actualiza los datos del profesor</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-name">Nombre Completo</Label>
                              <Input id="edit-name" defaultValue={editingProfessor?.name} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-email">Correo Electrónico</Label>
                              <Input id="edit-email" type="email" defaultValue={editingProfessor?.email} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="edit-faculty">Facultad</Label>
                                <Select defaultValue={editingProfessor?.faculty.toLowerCase()}>
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
                                <Label htmlFor="edit-department">Departamento</Label>
                                <Input id="edit-department" defaultValue={editingProfessor?.department} />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-role">Rol</Label>
                              <Select defaultValue="professor">
                                <SelectTrigger id="edit-role">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="professor">Profesor</SelectItem>
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
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(professor.id)}>
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
