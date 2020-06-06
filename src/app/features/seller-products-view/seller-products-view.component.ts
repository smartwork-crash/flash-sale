import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-products-view',
  templateUrl: './seller-products-view.component.html',
  styleUrls: ['./seller-products-view.component.css']
})
export class SellerProductsViewComponent implements OnInit {

  constructor(private popup: Mat) { }

  ngOnInit(): void {
  }

  saleModificationPopup() {
    const popupReference = this.popup.open(ProductSaleConfigComponent, {
      width: '1000px', maxHeight: '800px', disableClose: true,
      data: { costEstimation: totalCost, treeData: this.managementForm.value.group }
    });
  }

}
