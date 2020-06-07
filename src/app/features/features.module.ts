import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuyerProductsViewComponent } from './buyer-products-view/buyer-products-view.component';
import { SellerProductsViewComponent } from './seller-products-view/seller-products-view.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductSaleConfigComponent } from './seller-products-view/product-sale-config/product-sale-config.component';
import { MaterialModule } from '../material.module';
import { Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { AppGaurdGuard } from '../core/gaurd/app-gaurd.guard';
import { AppGaurdSellerGuard } from '../core/gaurd/app-gaurd-seller.guard';



@NgModule({
  declarations: [BuyerProductsViewComponent, SellerProductsViewComponent, CartComponent, OrdersComponent, ProductSaleConfigComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    CartModule,
    OrdersModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).seller == true) ? 'sell-product' : 'buy-product',
        pathMatch: 'full',
      },
      {
        path: 'buy-product',
        component: BuyerProductsViewComponent,
        canActivate: [AppGaurdGuard]
      },
      {
        path: 'sell-product',
        component: SellerProductsViewComponent,
        canActivate: [AppGaurdSellerGuard]
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AppGaurdGuard]
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AppGaurdGuard]
      }
    ])
  ],
  entryComponents: [ProductSaleConfigComponent]
})
export class FeaturesModule { }
