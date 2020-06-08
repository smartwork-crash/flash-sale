import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { InvoiceComponent } from './invoice/invoice.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  orders: any[] = [];
  tableDataSource: any[] = [];

  constructor(
    private popup: MatDialog,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('orders') !== null)
      this.orders = JSON.parse(localStorage.getItem('orders'));
  }

  ngAfterViewInit() {
    this.length = this.orders.length;
  }

  pageEvent(event: PageEvent) {
    console.log(event);
    
    let objectStartIndex = event.previousPageIndex * this.pageSize - 1;
    let objectEndIndex = event.pageIndex * this.pageSize - 1;
    if (objectEndIndex >= this.length) objectEndIndex = this.length - 1;
    this.tableDataSource = this.orders.splice(objectStartIndex, objectEndIndex);
  };

  viewInvoice(order: any) {

    const popupReference = this.popup.open(InvoiceComponent, {
      width: '1000px', maxHeight: '800px', disableClose: true,
      data: { order }
    });

    popupReference.afterClosed().subscribe(result => {
    })
  }
}
