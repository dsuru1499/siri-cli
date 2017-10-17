import { TestBed, inject } from '@angular/core/testing';

import { LinesDiscoveryService } from './lines-discovery.service';

describe('LinesDiscoveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinesDiscoveryService]
    });
  });

  it('should ...', inject([LinesDiscoveryService], (service: LinesDiscoveryService) => {
    expect(service).toBeTruthy();
  }));
});
