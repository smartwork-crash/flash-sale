import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerProductsViewComponent } from './buyer-products-view/buyer-products-view.component';
import { SellerProductsViewComponent } from './seller-products-view/seller-products-view.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductSaleConfigComponent } from './seller-products-view/product-sale-config/product-sale-config.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [BuyerProductsViewComponent, SellerProductsViewComponent, CartComponent, OrdersComponent, ProductSaleConfigComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [ProductSaleConfigComponent]
})
export class FeaturesModule { }
