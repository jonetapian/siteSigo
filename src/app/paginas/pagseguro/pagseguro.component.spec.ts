import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagseguroComponent } from './pagseguro.component';

describe('PagseguroComponent', () => {
  let component: PagseguroComponent;
  let fixture: ComponentFixture<PagseguroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagseguroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagseguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
