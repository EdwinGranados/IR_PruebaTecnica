import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from '../../core/services/estudiantes.service';
import { Estudiante, EstudianteDto } from '../../core/models/estudiante.model';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MateriasCompanerosComponent } from '../materias-companeros/materias-companeros.component';

@Component({
  selector: 'app-estudiante-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
    MateriasCompanerosComponent
  ],
  templateUrl: './estudiante-form.component.html',
  styleUrls: ['./estudiante-form.component.scss'],
})
export class EstudianteFormComponent implements OnInit {
  form!: FormGroup;

  id?: number; // si viene, estamos editando
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudiantesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [0, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      materiasIds: [[]], // podrías luego conectar con un MultiSelect de Materias
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.modoEdicion = true;
      this.estudiantesService.getById(this.id).subscribe((est: Estudiante) => {
        this.form.patchValue({
          nombre: est.nombre,
          apellido: est.apellido,
          edad: est.edad,
          email: est.email,
        });
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const dto: EstudianteDto = this.form.value as EstudianteDto;

      if (this.modoEdicion && this.id) {
        this.estudiantesService.update(this.id, dto).subscribe(() => {
          alert('✅ Estudiante actualizado con éxito');
          this.router.navigate(['/estudiantes']);
        });
      } else {
        this.estudiantesService.create(dto).subscribe(() => {
          alert('✅ Estudiante registrado con éxito');
          this.router.navigate(['/estudiantes']);
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/estudiantes']);
  }
}
