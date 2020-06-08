import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FeaturesService } from '../../features.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-sale-config',
  templateUrl: './product-sale-config.component.html',
  styleUrls: ['./product-sale-config.component.css']
})
export class ProductSaleConfigComponent implements OnInit {

  saleDaysObserver$: Observable<any>;
  dayObserver$: Observable<any>;
  productForm: FormGroup;
  specificDaySelected: boolean;

  constructor(
    private featureService: FeaturesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductSaleConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public popupInfo: any,
  ) { }

  ngOnInit(): void {
    this.saleDaysObserver$ = this.featureService.getSaleDays();
    this.dayObserver$ = this.featureService.getDays();
    this.createProductForm();
    if (this.popupInfo.product) this.productForm.setValue(this.popupInfo.product)
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      img: new FormControl(''),
      description: new FormControl('', Validators.required),
      saleDays: new FormControl('', Validators.required),
      saleInformation: this.formBuilder.array([
        this.addSaleInformation()
      ])
    })
  }

  addSaleInformation(): FormGroup {
    return this.formBuilder.group({
      day: new FormControl(''),
      saleStartTime: new FormControl({}),
      saleEndTime: new FormControl({}),
    })
  }

  addSpecificDay() {
    (<FormArray>this.productForm.get('saleInformation')).push(this.addSaleInformation());
  }

  removeSpecificDay(index: number) {
    (<FormArray>this.productForm.get('saleInformation')).removeAt(index);
  }

  onSaleDaysSelected(data: string) {
    if (data === 'Specific Days') {
      this.specificDaySelected = true;
    }
    else {
      this.specificDaySelected = false;
    }
  }

  onDaySelect(data: string) {

  }

  addProduct(event: Event) {
    if (this.productForm.valid) {
      let saleMoreThan2Hours = false;
      let hourMoreThan21;
      for (let info of this.productForm.value.saleInformation) {
        if (info.saleStartTime.hour > 21) hourMoreThan21 = info.saleStartTime.hour - 20;
        let hourDifference = Math.abs((hourMoreThan21 && hourMoreThan21 - info.saleEndTime.hour) || (info.saleEndTime.hour - info.saleStartTime.hour));
        let minDifference = info.saleEndTime.minute - info.saleStartTime.minute;
        if (hourDifference > 2 || (hourDifference === 2 && minDifference > 0)) {
          Swal.fire({
            title: 'Error!',
            text: 'Sale exceeded 2 hour limit',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          return 0;
        }
      }
      this.dialogRef.close(this.productForm.value);
    }
  }

}
