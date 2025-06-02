import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CommonHttpService } from './common-http.service';

describe('CommonHttpService', () => {
  let service: CommonHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommonHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
