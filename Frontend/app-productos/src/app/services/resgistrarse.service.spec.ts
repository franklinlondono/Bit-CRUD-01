import { TestBed } from '@angular/core/testing';

import { ResgistrarseService } from './resgistrarse.service';

describe('ResgistrarseService', () => {
  let service: ResgistrarseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResgistrarseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
