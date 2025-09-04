import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { EstudiantesService } from '../../core/services/estudiantes.service';
import { MateriasService } from '../../core/services/materias.service';
import { Toast } from 'primeng/toast';
import { EstudianteDto } from '../../core/models/estudiante.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscripciones-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, MultiSelectModule, ButtonModule,Toast],
  templateUrl: './inscripcion-form.component.html',
  providers: [MessageService]
})
export class InscripcionFormComponent implements OnInit {
  estudiantes: any[] = [];
  materias: any[] = [];

  selectedEstudiante: any = null;
  selectedMaterias: any[] = [];

  constructor(
    private estudiantesService: EstudiantesService,
    private materiasService: MateriasService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadEstudiantes();
    this.loadMaterias();
  }

  loadEstudiantes() {
    this.estudiantesService.getAll().subscribe({
      next: (res) => (this.estudiantes = res),
      error: () => this.showError('Error cargando estudiantes')
    });
  }

  loadMaterias() {
    this.materiasService.getAll().subscribe({
      next: (res) => (this.materias = res),
      error: () => this.showError('Error cargando materias')
    });
  }

  validateSelection(): boolean {
    if (!this.selectedEstudiante) {
      this.showError('Debe seleccionar un estudiante');
      return false;
    }

    if (this.selectedMaterias.length > 3) {
      this.showError('Un estudiante no puede inscribirse en más de 3 materias');
      return false;
    }

    // Validar que no haya profesores repetidos
    const profesores = this.selectedMaterias.map(m => m.profesorId);
    const uniqueProfesores = new Set(profesores);
    if (profesores.length !== uniqueProfesores.size) {
      this.showError('No puede inscribirse en materias del mismo profesor');
      return false;
    }

    return true;
  }

  save() {
    if (!this.validateSelection()) return;

    const dto ={
      id: this.selectedEstudiante.id,
      materiasIds: this.selectedMaterias.map(m => m.id),

    };

    this.estudiantesService.inscribirMaterias(dto.id,dto.materiasIds).subscribe({
      next: () => {
        this.showSuccess('Inscripción realizada con éxito'),
        this.router.navigate(['/estudiantes/editar', dto.id]);
      },
      error: () => this.showError('Error guardando inscripción')
    });
  }

  private showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }

  private showSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: msg });
  }
}
