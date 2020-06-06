import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSaleConfigComponent } from './product-sale-config.component';

describe('ProductSaleConfigComponent', () => {
  let component: ProductSaleConfigComponent;
  let fixture: ComponentFixture<ProductSaleConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSaleConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSaleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
