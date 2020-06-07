import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { FeaturesService } from '../features.service';
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: 'app-buyer-products-view',
  templateUrl: './buyer-products-view.component.html',
  styleUrls: ['./buyer-products-view.component.css']
})
export class BuyerProductsViewComponent implements OnInit {

  productObserver$: Observable<any>;
  subscriber: Subscription;
  products: any[] = [];
  productInCart: any[] = [];
  imgSrc = '../../../assets/images/blank.jpg';

  constructor(
    private featureService: FeaturesService,
    private layoutService: LayoutService,
     private _snackBar: MatSnackBar
     ) { }

  ngOnInit(): void {
    if (localStorage.getItem("products") === null) {
      this.productObserver$ = this.featureService.getProducts();
      this.subscriber = this.productObserver$.subscribe(products => {
        this.products = products;
      localStorage.setItem('products',JSON.stringify(products));
      })
    }
    else
      this.products = JSON.parse(localStorage.getItem("products"));

    if (localStorage.getItem("cart") !== null) this.productInCart = JSON.parse(localStorage.getItem("cart"));
  }

  addToCart(product: Object) {
    this.productInCart.push(product)
    localStorage.setItem('cart', JSON.stringify(this.productInCart));
    this._snackBar.open('product Added', 'Close', {
      duration: 10000,
    });
    this.layoutService.getCartCount(this.productInCart.length);
  }

  removeFromCart(id: number) {
     let index = this.productInCart.findIndex(product => product.id === id);
     console.log(index);
     this.productInCart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(this.productInCart));
    this.layoutService.getCartCount(this.productInCart.length);
    this._snackBar.open('Product Removed', 'Close', {
      duration: 10000,
    });
  }

  getNumberOfThisProductAdded(id: number) {
    if(this.productInCart.length)
    return this.productInCart.filter(product => product.id === id);
    else return [];
  }

}
