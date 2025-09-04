import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor, ProfesorDto } from '../models/profesor.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProfesoresService {
  private apiUrl = `${environment.apiUrl}/profesores`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.apiUrl}/${id}`);
  }

  create(dto: ProfesorDto): Observable<Profesor> {
    return this.http.post<Profesor>(this.apiUrl, dto);
  }

  update(id: number, dto: ProfesorDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
