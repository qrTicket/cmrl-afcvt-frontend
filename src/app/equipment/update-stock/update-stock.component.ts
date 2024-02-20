import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {
  updateInventoryStock: FormGroup;

  maxDate: any; minDate:any; startDate:any;
    submitted = false;
  Installation;
  modified;
  time = {hour: '', minute: ''};
  icon = false;
  spinners = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
) {}

  ngOnInit() {
    this.minDate = { year: 1950, month: 1, day: 1 };
    this.maxDate={year:2060,month: 1, day: 1}
    this.updateInventoryStock = this.formBuilder.group({

      productType: ["", Validators.required],
        manufactureName: ["",  Validators.required],
      serialNo: ["",  Validators.required],
      productManu: ["",  Validators.required],
      productVersion: ["",  Validators.required],
      productID: ["",Validators.required]

  });

}


get fval() {
  return this.updateInventoryStock.controls;
}
onaddinvetFormSubmit() {
  this.submitted = true;
  if (this.updateInventoryStock.invalid)
      return this.toastr.error("Invalid form", "Error incountered");


}


  }


