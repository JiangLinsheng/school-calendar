import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScCalComponent } from './sc-cal.component';

describe('ScCalComponent', () => {
  let component: ScCalComponent;
  let fixture: ComponentFixture<ScCalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScCalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
