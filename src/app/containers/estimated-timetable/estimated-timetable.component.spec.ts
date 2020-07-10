import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedTimetableComponent } from './estimated-timetable.component';

describe('EstimatedTimetableComponent', () => {
  let component: EstimatedTimetableComponent;
  let fixture: ComponentFixture<EstimatedTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimatedTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
