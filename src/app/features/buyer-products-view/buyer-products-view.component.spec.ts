import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerProductsViewComponent } from './buyer-products-view.component';

describe('BuyerProductsViewComponent', () => {
  let component: BuyerProductsViewComponent;
  let fixture: ComponentFixture<BuyerProductsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerProductsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
