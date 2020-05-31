import { TestBed } from '@angular/core/testing';

import { HttpConfigInerceptorService } from './http-config-inerceptor.service';

describe('HttpConfigInerceptorService', () => {
  let service: HttpConfigInerceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpConfigInerceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
