import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

import { ProfesoresService } from '../../core/services/profesores.service';
import { Profesor } from '../../core/models/profesor.model';

@Component({
  selector: 'app-profesores-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './profesores-list.component.html',
  styleUrls: ['./profesores-list.component.scss']
})
export class ProfesoresListComponent implements OnInit {
  profesores: Profesor[] = [];
  loading = true;

  constructor(
    private profesoresService: ProfesoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profesoresService.getAll().subscribe({
      next: (data) => {
        this.profesores = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar profesores', err);
        this.loading = false;
      }
    });
  }

  nuevo() {
    this.router.navigate(['/profesores/nuevo']);
  }

  editar(prof: Profesor) {
    this.router.navigate(['/profesores/editar', prof.id]);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este profesor?')) {
      this.profesoresService.delete(id).subscribe(() => {
        this.profesores = this.profesores.filter(p => p.id !== id);
      });
    }
  }
}
