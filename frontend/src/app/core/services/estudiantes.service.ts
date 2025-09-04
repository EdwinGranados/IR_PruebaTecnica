import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante, EstudianteDto } from '../models/estudiante.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class EstudiantesService {
  private apiUrl = `${environment.apiUrl}/estudiantes`;
  private materiasInscripcion = environment.apiURLMaterias

  constructor(private http: HttpClient) {}

  getAll(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  getById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/${id}`);
  }

  create(dto: EstudianteDto): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.apiUrl, dto);
  }

  update(id: number, dto: EstudianteDto): Observable<void> {
    dto.id = id; // Asegurarse de que el ID esté en el DTO
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  inscribirMaterias(estudianteID:number,materiasIds:number[]): Observable<void> {
    return this.http.post<void>(`${this.materiasInscripcion}/EstudianteM/inscribir`, {estudianteID,materiasIds});
  }

  getMateriasConCompañeros(estudianteId: number): Observable<MateriaConCompaneros[]> {
    return this.http.get<MateriaConCompaneros[]>(`${this.materiasInscripcion}/EstudianteM/${estudianteId}/materias-compañeros`);
  }
}

export interface Materia {
  id: number;
  nombre: string;
}

export interface Companero {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
}

export interface MateriaConCompaneros {
  materiaId: number;
  materiaNombre: string;
  estudiantes: Companero[];
}



