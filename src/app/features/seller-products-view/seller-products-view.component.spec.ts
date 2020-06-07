import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductsViewComponent } from './seller-products-view.component';

describe('SellerProductsViewComponent', () => {
  let component: SellerProductsViewComponent;
  let fixture: ComponentFixture<SellerProductsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProductsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
