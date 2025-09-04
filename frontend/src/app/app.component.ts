import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  items = [
    { label: 'Estudiantes', routerLink: '/estudiantes' },
    { label: 'Materias', routerLink: '/materias' },
    { label: 'Profesores', routerLink: '/profesores' },
    { label: 'Inscripciones', routerLink: '/inscripciones' }
  ];
}
