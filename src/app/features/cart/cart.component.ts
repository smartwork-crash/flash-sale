import { Component, OnInit } from '@angular/core';
import * as  _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutService } from 'src/app/layout/layout.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewCartComponent } from './review-cart/review-cart.component';
import Swal from 'sweetalert2';

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productInCart: any[] = [];
  productGroupInCart: any[] = [];
  imgSrc = '../../../assets/images/blank.jpg';

  constructor(
    private _snackBar: MatSnackBar,
    private popup: MatDialog,
    private layoutService: LayoutService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("cart") !== null) this.productInCart = JSON.parse(localStorage.getItem("cart"));
    this.productGroupInCart = _.uniqBy(this.productInCart, 'id');
  }

  addToCart(product: Object) {
    this.productInCart.push(product)
    localStorage.setItem('cart', JSON.stringify(this.productInCart));
    this.layoutService.getCartCount(this.productInCart.length);
    this._snackBar.open('product Added', 'Close', {
      duration: 10000,
    });
  }

  removeFromCart(id: number) {
    let index = this.productInCart.findIndex(product => product.id === id);
    this.productInCart.splice(index, 1);
    this.productGroupInCart = _.uniqBy(this.productInCart, 'id');
    localStorage.setItem('cart', JSON.stringify(this.productInCart));
    this.layoutService.getCartCount(this.productInCart.length);
    this._snackBar.open('Product Removed', 'Close', {
      duration: 10000,
    });
  }

  getNumberOfThisProductAdded(id: number) {
    if (this.productInCart.length)
      return this.productInCart.filter(product => product.id === id);
    else return [];
  }

  buyProduct() {
    this.checkProductSale();
  }

  checkProductSale() {
    let removeItem = [];
    let saleOver: boolean;
    var date = new Date();
    for (let product of this.productGroupInCart) {
      let currentDay = weekDays[date.getDay()];
      if ((product.saleDays === 'Weekends' && (date.getDay() == 0 || date.getDay() == 6))
        || (product.saleDays === 'Weekdays' && (date.getDay() > 0 && date.getDay() < 6))
        || product.saleDays === 'Everyday') {
        saleOver = this.checkTimeSlot(product.saleInformation);
      }
      else if (product.saleDays === 'Specific Days') {
        let saleAvailable = product.saleInformation.find(info => info.day === currentDay);
        if (saleAvailable) {
          saleOver = this.checkTimeSlot([saleAvailable]);
        }
        else saleOver = true;
      }
      else {
        removeItem.push(product);
      }
      if (saleOver) {
        removeItem.push(product);
      }
      saleOver = false;
    }
    this.productGroupInCart = this.productGroupInCart.filter((cartProduct) => {
      return !removeItem.find((removedProduct) => {
        return cartProduct.id === removedProduct.id
      })
    })
    this.reviewPopup(removeItem);
  }

  checkTimeSlot(products) {
    let date = new Date();
    let currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    for (const product of products) {
      if ((product.saleStartTime.hour < currentHour && product.saleEndTime.hour > currentHour)
        || (product.saleStartTime.hour > 21 && ((product.saleStartTime.hour - 24) < 0) && product.saleEndTime.hour > currentHour)
        || (currentHour === product.saleStartTime.hour && currentMinute >= product.saleStartTime.minute)
        || (currentHour === product.saleEndTime.hour && currentMinute <= product.saleEndTime.minute)) {
        return false;
      }
      else return true;
    }
  }

  reviewPopup(productRemoved?: any) {
    const popupReference = this.popup.open(ReviewCartComponent, {
      width: '1000px', maxHeight: '800px', disableClose: true,
      data: { product: this.productInCart, productGroup: this.productGroupInCart, removedProduct: productRemoved }
    });

    popupReference.afterClosed().subscribe(result => {
      if (result === 'order') {
        localStorage.removeItem('cart');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your order has been created',
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.layoutService.getCartCount((localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length) || 0);
      this.ngOnInit();
    })
  }

}
