import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MateriasService } from '../../core/services/materias.service';
import { ProfesoresService } from '../../core/services/profesores.service';
import { Materia, MateriaDto } from '../../core/models/materia.model';
import { Profesor } from '../../core/models/profesor.model';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-materia-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DropdownModule,
    CardModule
  ],
  templateUrl: './materia-form.component.html',
  styleUrls: ['./materia-form.component.scss']
})
export class MateriaFormComponent implements OnInit {
  form!:FormGroup

  profesores: Profesor[] = [];
  id?: number;
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private materiasService: MateriasService,
    private profesoresService: ProfesoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    creditos: [3],
    profesorId: [null, Validators.required]
  });
    // Cargar profesores para el selector
    this.profesoresService.getAll().subscribe(data => (this.profesores = data));

    // Modo edición
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.modoEdicion = true;
      this.materiasService.getById(this.id).subscribe((mat: Materia) => {
        this.form.patchValue({
          nombre: mat.nombre,
          descripcion: mat.descripcion,
          creditos: mat.creditos,
          profesorId: mat.profesorId
        });
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const dto: MateriaDto = this.form.value as MateriaDto;

      if (this.modoEdicion && this.id) {
        this.materiasService.update(this.id, dto).subscribe(() => {
          alert('✅ Materia actualizada con éxito');
          this.router.navigate(['/materias']);
        });
      } else {
        this.materiasService.create(dto).subscribe(() => {
          alert('✅ Materia registrada con éxito');
          this.router.navigate(['/materias']);
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/materias']);
  }
}
