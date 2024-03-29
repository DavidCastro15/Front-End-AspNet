import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioActoresComponent } from './formulario-actores.component';

describe('FormularioActoresComponent', () => {
  let component: FormularioActoresComponent;
  let fixture: ComponentFixture<FormularioActoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioActoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioActoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
