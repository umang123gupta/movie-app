import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
import { CommonHttpService } from '../common-http/common-http.service';

class MockCommonHttpService {
  get(url: string) {
    return {
      subscribe: () => {}
    };
  }
}

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        { provide: CommonHttpService, useClass: MockCommonHttpService }
      ]
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
