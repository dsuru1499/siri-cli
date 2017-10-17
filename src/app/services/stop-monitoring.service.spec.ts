import { TestBed, inject } from '@angular/core/testing';

import { StopMonitoringService } from './stop-monitoring.service';

describe('StopMonitoringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StopMonitoringService]
    });
  });

  it('should ...', inject([StopMonitoringService], (service: StopMonitoringService) => {
    expect(service).toBeTruthy();
  }));
});
