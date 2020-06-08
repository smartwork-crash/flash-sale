import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { weekDays } from '../cart.component'

@Component({
  selector: 'app-review-cart',
  templateUrl: './review-cart.component.html',
  styleUrls: ['./review-cart.component.css']
})
export class ReviewCartComponent implements OnInit, OnDestroy {

  saleTimer: any;

  constructor(
    private dialogRef: MatDialogRef<ReviewCartComponent>,
    @Inject(MAT_DIALOG_DATA) public popupInfo: any
  ) { }

  ngOnInit(): void {
    this.saleTimer = setInterval(() => {
      if (this.popupInfo.productGroup.length) {
        this.popupInfo.productGroup.forEach((value, index) => {
          if (value.saleInformation.length){
          let date = new Date();
          let currentHour = date.getHours();
          var currentMinute = date.getMinutes();
            if (value.saleInformation.length > 1) {
              let currentDay = weekDays[date.getDay()];
              let saleAvailable = value.saleInformation.saleInformation.find(info => info.day === currentDay);
              if(saleAvailable){
              if (saleAvailable.saleEndTime.hour < currentHour || (saleAvailable.saleEndTime.hour === currentHour && (value.saleInformation[0].saleEndTime.minute-currentMinute) <= 0)) {
                this.popupInfo.removedProduct.push(value);
                this.popupInfo.productGroup.splice(index,1);
              }
            }
            }
            else {
              console.log(value.saleInformation[0],currentHour,value.saleInformation[0].saleEndTime.hour < currentHour,value.saleInformation[0].saleEndTime.hour === currentHour, currentMinute,value.saleInformation[0].saleEndTime.minute,(value.saleInformation[0].saleEndTime.minute-currentMinute), (value.saleInformation[0].saleEndTime.minute-currentMinute) <= 0);
              
              if (value.saleInformation[0].saleEndTime.hour < currentHour || (value.saleInformation[0].saleEndTime.hour === currentHour && (value.saleInformation[0].saleEndTime.minute-currentMinute) <= 0)) {
                this.popupInfo.removedProduct.push(value);
                this.popupInfo.productGroup.splice(index,1);
              }
            }
          }
        })
      }
    }, 1000)

  }

  getNumberOfThisProductAdded(id: number) {
    if (this.popupInfo.product.length)
      return this.popupInfo.product.filter(product => product.id === id);
    else return [];
  }

  costOfProductGroup(id: number, price: number) {
    let numberOfProduct = this.getNumberOfThisProductAdded(id).length;
    return (price * numberOfProduct);
  }

  totalBill() {
    return this.popupInfo.productGroup.reduce((prev, current) => {
      return prev + this.costOfProductGroup(current.id, current.price);
    }, 0);
  }

  priceDistribution(type: string) {
    if (type === 'seller') {
      if (this.totalBill() < 100) return Math.ceil((70 * this.totalBill()) / 100);
      if (this.totalBill() > 100 && this.totalBill() < 500) return Math.ceil((65 * this.totalBill()) / 100);
      if (this.totalBill() > 500) return Math.ceil((33.33 * this.totalBill()) / 100);
    }
    if (type === 'app') {
      if (this.totalBill() < 100) return Math.ceil((20 * this.totalBill()) / 100);
      if (this.totalBill() > 100 && this.totalBill() < 500) return Math.ceil((15 * this.totalBill()) / 100);
      if (this.totalBill() > 500) return Math.ceil((33.33 * this.totalBill()) / 100);
    }
    if (type === 'charity') {
      if (this.totalBill() < 100) return Math.ceil((10 * this.totalBill()) / 100);
      if (this.totalBill() > 100 && this.totalBill() < 500) return Math.ceil((20 * this.totalBill()) / 100);
      if (this.totalBill() > 500) return Math.ceil((33.33 * this.totalBill()) / 100);
    }
    if (type === 'gst') {
      return Math.ceil((19 * this.totalBill()) / 100)
    }
  }

  Reviewed() {
    if (this.popupInfo.productGroup.length) {
      Swal.fire({
        title: 'Are you sure?',
        text: "This will create an Order.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Buy'
      }).then((result) => {
        if (result.value) {
          let order = [];
          this.popupInfo.productGroup.forEach((value, index) => {
            this.popupInfo.productGroup[index].totalQuantity = this.getNumberOfThisProductAdded(value.id).length;
            this.popupInfo.productGroup[index].totalPrice = this.costOfProductGroup(value.id, value.price);
          })
          order.push(this.popupInfo.productGroup);
          order[order.length - 1].push({
            'gst': this.priceDistribution('gst'),
            'sellerShare': this.priceDistribution('seller'),
            'appShare': this.priceDistribution('app'),
            'charityShare': this.priceDistribution('charity'),
            'totalOrderCost': this.priceDistribution('gst') + this.totalBill()
          })
          localStorage.setItem('orders', JSON.stringify(order));
          this.dialogRef.close('order');
        }
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You don`t have anything to shop!',
      }).then(() => {
        localStorage.removeItem('cart');
        this.dialogRef.close();
      })
    }
  }

  ngOnDestroy() {
    clearInterval(this.saleTimer);
  }

}
