import { TestBed } from '@angular/core/testing';

import { SeriesResolver } from './series-resolver';

describe('SeriesResolver', () => {
  let service: SeriesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriesResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
