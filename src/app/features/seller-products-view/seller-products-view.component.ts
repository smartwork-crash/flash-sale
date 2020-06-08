import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ProductSaleConfigComponent } from './product-sale-config/product-sale-config.component';
import { FeaturesService } from '../features.service';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-products-view',
  templateUrl: './seller-products-view.component.html',
  styleUrls: ['./seller-products-view.component.css']
})
export class SellerProductsViewComponent implements OnInit {

  productObserver$: Observable<any>;
  subscriber: Subscription;
  products: any[] = [];
  imgSrc = '../../../assets/images/blank.jpg';

  constructor(private popup: MatDialog, private featureService: FeaturesService) { }

  ngOnInit(): void {
    if (localStorage.getItem("products") === null) {
      this.productObserver$ = this.featureService.getProducts();
      this.subscriber = this.productObserver$.subscribe(products => {
        this.products = products;
        localStorage.setItem('products', JSON.stringify(products));
      })
    }
    else
      this.products = JSON.parse(localStorage.getItem("products"));
  }

  saleModificationPopup(productInfo?: any) {
    const popupReference = this.popup.open(ProductSaleConfigComponent, {
      width: '1000px', maxHeight: '800px', disableClose: true,
      data: { product: productInfo }
    });

    popupReference.afterClosed().subscribe(product => {
      if (product) {
        if (product.id) this.products.splice(this.products.findIndex(data => data.id == product.id), 1);
        else product.id = this.products.length + 1;
        this.products.push(product);
        localStorage.setItem('products', JSON.stringify(this.products));
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }



}
