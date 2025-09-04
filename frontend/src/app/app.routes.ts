import { Routes } from '@angular/router';
import { EstudianteFormComponent } from './estudiantes/estudiante-form/estudiante-form.component';
import { EstudiantesListComponent } from './estudiantes/estudiantes-list/estudiantes-list.component';
import { InscripcionFormComponent } from './inscripciones/inscripcion-form/inscripcion-form.component';
import { MateriasListComponent } from './materias/materias-list/materias-list.component';
import { ProfesoresListComponent } from './profesores/profesores-list/profesores-list.component';
import { MateriaFormComponent } from './materias/materia-form/materia-form.component';
import { ProfesorFormComponent } from './profesores/profesor-form/profesor-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
  { path: 'estudiantes', component: EstudiantesListComponent },
  { path: 'estudiantes/nuevo', component: EstudianteFormComponent },
  { path: 'estudiantes/editar/:id', component: EstudianteFormComponent },
  { path: 'materias', component: MateriasListComponent },
  { path: 'materias/nueva', component: MateriaFormComponent },
  { path: 'materias/editar/:id', component: MateriaFormComponent },
  { path: 'profesores', component: ProfesoresListComponent },
  { path: 'profesores/nuevo', component: ProfesorFormComponent },
  { path: 'profesores/editar/:id', component: ProfesorFormComponent },
  { path: 'inscripciones', component: InscripcionFormComponent },
];
