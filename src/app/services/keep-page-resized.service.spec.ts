import { TestBed } from '@angular/core/testing';

import { KeepPageResizedService } from './keep-page-resized.service';

describe('KeepPageResizedService', () => {
  let service: KeepPageResizedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeepPageResizedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
