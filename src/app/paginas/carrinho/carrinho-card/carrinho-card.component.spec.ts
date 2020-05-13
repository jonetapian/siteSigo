import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoCardComponent } from './carrinho-card.component';

describe('CarrinhoCardComponent', () => {
  let component: CarrinhoCardComponent;
  let fixture: ComponentFixture<CarrinhoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrinhoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
