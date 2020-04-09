import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteDividerComponent } from './white-divider.component';

describe('WhiteDividerComponent', () => {
  let component: WhiteDividerComponent;
  let fixture: ComponentFixture<WhiteDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteDividerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
