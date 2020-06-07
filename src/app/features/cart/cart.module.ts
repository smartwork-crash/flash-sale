import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewCartComponent } from './review-cart/review-cart.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [ReviewCartComponent],
  imports: [
    MaterialModule,
    CommonModule
  ],
  entryComponents: [ReviewCartComponent]
})
export class CartModule { }