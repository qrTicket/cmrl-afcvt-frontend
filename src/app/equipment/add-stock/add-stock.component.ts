import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-add-stock-inventory',
  //selector: 'app-add-inventory',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
}) 
export class AddStockComponent implements OnInit {
  addInventoryStock: FormGroup;

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
    // this.maxDate={year:new Date().getFullYear(),month: 1, day: 1}
    this.maxDate={year:2060,month: 1, day: 1}
    // this.startDate = { year: 1988, month: 1, day: 1 };
    this.addInventoryStock = this.formBuilder.group({

      productType: ["", Validators.required],
        manufactureName: ["",  Validators.required],
      serialNo: ["",  Validators.required],
      productManu: ["",  Validators.required],
      productVersion: ["",  Validators.required]

  });

}


get fval() {
  return this.addInventoryStock.controls;
}
onaddinvetFormSubmit() {
  this.submitted = true;
  if (this.addInventoryStock.invalid)
      return this.toastr.error("Invalid form", "Error incountered");
      console.log(this.addInventoryStock);


}


  }


