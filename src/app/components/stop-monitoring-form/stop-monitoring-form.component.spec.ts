import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopMonitoringFormComponent } from './stop-monitoring-form.component';

describe('StopMonitoringFormComponent', () => {
  let component: StopMonitoringFormComponent;
  let fixture: ComponentFixture<StopMonitoringFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopMonitoringFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopMonitoringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
