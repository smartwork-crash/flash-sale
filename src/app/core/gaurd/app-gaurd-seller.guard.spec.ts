import { TestBed } from '@angular/core/testing';

import { AppGaurdSellerGuard } from './app-gaurd-seller.guard';

describe('AppGaurdSellerGuard', () => {
  let guard: AppGaurdSellerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AppGaurdSellerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
