import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materia, MateriaDto } from '../models/materia.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class MateriasService {
  private apiUrl = `${environment.apiUrl}/materias`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.apiUrl);
  }

  getById(id: number): Observable<Materia> {
    return this.http.get<Materia>(`${this.apiUrl}/${id}`);
  }

  create(dto: MateriaDto): Observable<Materia> {
    return this.http.post<Materia>(this.apiUrl, dto);
  }

  update(id: number, dto: MateriaDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
