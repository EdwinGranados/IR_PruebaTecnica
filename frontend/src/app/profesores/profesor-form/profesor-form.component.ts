import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfesoresService } from '../../core/services/profesores.service';
import { Profesor, ProfesorDto } from '../../core/models/profesor.model';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-profesor-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './profesor-form.component.html',
  styleUrls: ['./profesor-form.component.scss'],
})
export class ProfesorFormComponent implements OnInit {
  form!: FormGroup;

  id?: number;
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private profesoresService: ProfesoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.modoEdicion = true;
      this.profesoresService.getById(this.id).subscribe((prof: Profesor) => {
        this.form.patchValue({
          nombre: prof.nombre,
        });
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const dto: ProfesorDto = this.form.value as ProfesorDto;

      if (this.modoEdicion && this.id) {
        this.profesoresService.update(this.id, dto).subscribe(() => {
          alert('✅ Profesor actualizado con éxito');
          this.router.navigate(['/profesores']);
        });
      } else {
        this.profesoresService.create(dto).subscribe(() => {
          alert('✅ Profesor registrado con éxito');
          this.router.navigate(['/profesores']);
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/profesores']);
  }
}
