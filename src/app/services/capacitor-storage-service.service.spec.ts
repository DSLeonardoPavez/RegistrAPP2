import { TestBed } from '@angular/core/testing';

import { CapacitorStorageServiceService } from './capacitor-storage-service.service';

describe('CapacitorStorageServiceService', () => {
  let service: CapacitorStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacitorStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
