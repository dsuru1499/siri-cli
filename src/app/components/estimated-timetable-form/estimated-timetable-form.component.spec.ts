import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedTimetableFormComponent } from './estimated-timetable-form.component';

describe('EstimatedTimetableFormComponent', () => {
  let component: EstimatedTimetableFormComponent;
  let fixture: ComponentFixture<EstimatedTimetableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimatedTimetableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedTimetableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
