import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesService,MateriaConCompaneros } from '../../core/services/estudiantes.service';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-materias-companeros',
  standalone: true,
  imports: [CommonModule, PanelModule, ListboxModule, ProgressSpinnerModule],
  templateUrl: './materias-companeros.component.html',
  styleUrls: ['./materias-companeros.component.scss']
})
export class MateriasCompanerosComponent implements OnInit {

  @Input() estudianteId!: number;

  materiasConCompaneros: MateriaConCompaneros[] = [];
  cargando: boolean = false;
  error: string | null = null;

  constructor(private estudiantesService: EstudiantesService) {}

  ngOnInit(): void {
    if (!this.estudianteId) {
      this.error = 'No se proporcionó el ID del estudiante';
      return;
    }
    this.cargarMateriasYCompañeros();
  }

  cargarMateriasYCompañeros() {
    this.cargando = true;
    this.error = null;

    this.estudiantesService.getMateriasConCompañeros(this.estudianteId)
      .subscribe({
        next: (res) => {
          this.materiasConCompaneros = res;
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'Error al cargar materias y compañeros';
          console.error(err);
          this.cargando = false;
        }
      });
  }
}



