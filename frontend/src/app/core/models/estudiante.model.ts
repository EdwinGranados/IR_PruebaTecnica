import { Materia } from './materia.model';

export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  email: string;
  materias: Materia[]; // detalle de materias inscritas
}

export interface EstudianteDto {
  id:number
  nombre: string;
  apellido: string;
  edad: number;
  email: string;
  materiasIds?: number[]; // solo los IDs de las materias seleccionadas
  EstudianteMaterias?: number[]; // solo los IDs de las materias seleccionadas
}
