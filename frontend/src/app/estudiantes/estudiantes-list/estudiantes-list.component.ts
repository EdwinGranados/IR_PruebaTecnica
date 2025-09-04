import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';

import { EstudiantesService } from '../../core/services/estudiantes.service';
import { Estudiante } from '../../core/models/estudiante.model';

@Component({
  selector: 'app-estudiantes-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterLink],
  templateUrl: './estudiantes-list.component.html',
  styleUrls: ['./estudiantes-list.component.scss']
})
export class EstudiantesListComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  loading = true;

  constructor(
    private estudiantesService: EstudiantesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.estudiantesService.getAll().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar estudiantes', err);
        this.loading = false;
      }
    });
  }

  editar(est: Estudiante) {
    console.log('Editar estudiante', est);
    this.router.navigate(['/estudiantes/editar', est.id]);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este estudiante?')) {
      this.estudiantesService.delete(id).subscribe(() => {
        this.estudiantes = this.estudiantes.filter(e => e.id !== id);
      });
    }
  }
}
