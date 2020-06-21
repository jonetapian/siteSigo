import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRastreioComponent } from './card-rastreio.component';

describe('CardRastreioComponent', () => {
  let component: CardRastreioComponent;
  let fixture: ComponentFixture<CardRastreioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRastreioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRastreioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
