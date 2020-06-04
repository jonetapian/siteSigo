import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCompradorComponent } from './formulario-comprador.component';

describe('FormularioCompradorComponent', () => {
  let component: FormularioCompradorComponent;
  let fixture: ComponentFixture<FormularioCompradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCompradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
