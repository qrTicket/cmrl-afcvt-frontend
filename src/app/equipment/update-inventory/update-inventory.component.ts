import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import {
    RxwebValidators,
    ValidationAlphabetLocale,
    NumericValueType,
} from "@rxweb/reactive-form-validators";

import { ProductTypeService } from "../_services/product-type.service";
import { ProductService } from "../_services/product.service";
import { Product } from "../_models/product.model";
import { ProductType } from "../_models/product-type.model";
@Component({
    selector: "app-update-inventory",
    templateUrl: "./update-inventory.component.html",
    styleUrls: ["./update-inventory.component.scss"],
})
export class UpdateInventoryComponent implements OnInit {
    updateInventoryStock: FormGroup;
    successmsg;
    errormsg;
    message;
    minDate: Date;
    maxDate: Date;
    submitted = false;
    id;
    active: String = "No";
    status: String = "Active";

    productList: any[] = [];
    manufacturerList: any = [];
    constructor(
        private productTypeService: ProductTypeService,
        private productService: ProductService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) {
        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setDate(this.minDate.getDate());
        this.maxDate.setDate(this.maxDate.getDate());
    }

    ngOnInit() {
        this.updateInventoryStock = this.formBuilder.group({
            id: [""],
            productType: "",
            productCode: "",

            manufactureName: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            serialNumber: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    // RxwebValidators.alphaNumeric({
                    //     message: "This accept only Alpha Numeric value!",
                    // }),
                ],
            ],
            productMfgDate: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            productExpDate: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            productVersion: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.numeric({
                        acceptValue: NumericValueType.PositiveNumber,
                        allowDecimal: true,
                        message: "This accept only positive intergers!",
                    }),
                ],
            ],
            modelName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            purchaseDate: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            warranty: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            status: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            assign: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            createdDate: [""],
        });
        this.updateInventoryStock.get("status").setValue(this.status);
        this.updateInventoryStock.get("assign").setValue(this.active);
        // this.productTypeService.getProductTypeList().subscribe((res) => {
        //     this.productList = res;
        //     // console.log(this.productList);
        // });
        this.productTypeService.getProductTypeList().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.productList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
      
    }


    get fval() {
        return this.updateInventoryStock.controls;
    }
    onFormSubmit() {
        this.submitted = true;
        // if (this.updateInventoryStock.invalid)
        //     return this.toastr.error("Invalid form", "Error incountered");
        // console.log(this.updateInventoryStock.value);
        this.spinner.show();
        
        // console.log(this.updateInventoryStock.value);
        this.updateInventoryStock.reset();
        this.submitted = false;
    }
}
