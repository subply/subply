import { TestBed } from "@angular/core/testing";

import { CanActivateUserService } from "./can-activate-user.service";

describe("CanActivateUserService", () => {
  let service: CanActivateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateUserService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
