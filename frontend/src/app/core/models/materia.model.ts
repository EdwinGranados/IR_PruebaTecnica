import { Profesor } from './profesor.model';

export interface Materia {
  id: number;
  nombre: string;
  descripcion: string;
  creditos: number;
  profesorId: number;
  profesor?: Profesor;
}

export interface MateriaDto {
  nombre: string;
  descripcion: string;
  creditos: number;
  profesorId: number;
}
