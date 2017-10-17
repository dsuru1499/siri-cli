import { TestBed, inject } from '@angular/core/testing';

import { StopPointsDiscoveryService } from './stop-points-discovery.service';

describe('StopPointsDiscoveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StopPointsDiscoveryService]
    });
  });

  it('should ...', inject([StopPointsDiscoveryService], (service: StopPointsDiscoveryService) => {
    expect(service).toBeTruthy();
  }));
});
