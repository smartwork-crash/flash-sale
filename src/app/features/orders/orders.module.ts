import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { InvoiceComponent } from './invoice/invoice.component';



@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    MaterialModule,
    CommonModule
  ],
  entryComponents: [InvoiceComponent]
})
export class OrdersModule { }
