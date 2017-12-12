import { TestBed, inject } from '@angular/core/testing';

import { SignUpServiceService } from './authentication.service';

describe('SignUpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignUpServiceService]
    });
  });

  it('should be created', inject([SignUpServiceService], (service: SignUpServiceService) => {
    expect(service).toBeTruthy();
  }));
});
