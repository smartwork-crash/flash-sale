import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { InvoiceComponent } from './invoice/invoice.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  orders: any[] = [];

  constructor(
    private popup: MatDialog,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('orders') !== null)
      this.orders = JSON.parse(localStorage.getItem('orders'));
  }

  pageEvent(event: PageEvent) {
    console.log(event);

  };

  viewInvoice(order: any) {
    console.log(order);
    
    const popupReference = this.popup.open(InvoiceComponent, {
      width: '1000px', maxHeight: '800px', disableClose: true,
      data: { order }
    });

    popupReference.afterClosed().subscribe(result => {
    })
  }
}
