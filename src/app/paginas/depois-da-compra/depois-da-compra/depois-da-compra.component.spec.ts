import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoisDaCompraComponent } from './depois-da-compra.component';

describe('DepoisDaCompraComponent', () => {
  let component: DepoisDaCompraComponent;
  let fixture: ComponentFixture<DepoisDaCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepoisDaCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepoisDaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
