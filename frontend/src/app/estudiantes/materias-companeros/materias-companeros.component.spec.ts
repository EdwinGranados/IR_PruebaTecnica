import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasCompanerosComponent } from './materias-companeros.component';

describe('MateriasCompanerosComponent', () => {
  let component: MateriasCompanerosComponent;
  let fixture: ComponentFixture<MateriasCompanerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriasCompanerosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriasCompanerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
