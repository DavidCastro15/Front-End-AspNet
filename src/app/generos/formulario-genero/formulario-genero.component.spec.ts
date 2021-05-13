import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGeneroComponent } from './formulario-genero.component';

describe('FormularioGeneroComponent', () => {
  let component: FormularioGeneroComponent;
  let fixture: ComponentFixture<FormularioGeneroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioGeneroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
