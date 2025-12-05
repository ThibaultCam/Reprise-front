import { TestBed } from '@angular/core/testing';

import { SerieResolver } from './serie-resolver';

describe('SerieResolver', () => {
  let service: SerieResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerieResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
