import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

import { MateriasService } from '../../core/services/materias.service';
import { Materia } from '../../core/models/materia.model';

@Component({
  selector: 'app-materias-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './materias-list.component.html',
  styleUrls: ['./materias-list.component.scss']
})
export class MateriasListComponent implements OnInit {
  materias: Materia[] = [];
  loading = true;

  constructor(
    private materiasService: MateriasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.materiasService.getAll().subscribe({
      next: (data) => {
        this.materias = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar materias', err);
        this.loading = false;
      }
    });
  }

  nuevo() {
    this.router.navigate(['/materias/nueva']);
  }

  editar(mat: Materia) {
    this.router.navigate(['/materias/editar', mat.id]);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta materia?')) {
      this.materiasService.delete(id).subscribe(() => {
        this.materias = this.materias.filter(m => m.id !== id);
      });
    }
  }
}
