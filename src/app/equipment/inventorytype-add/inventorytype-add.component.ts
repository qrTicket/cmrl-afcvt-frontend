import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { fadeInAnimation } from "../../_animations/fadeIn.animation";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import {
    RxwebValidators,
    NumericValueType,
} from "@rxweb/reactive-form-validators";

import { ProductTypeService } from "../_services/product-type.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-inventorytype-add",
    templateUrl: "./inventorytype-add.component.html",
    styleUrls: ["./inventorytype-add.component.scss"],
    animations: [fadeInAnimation],
    host: { "[@fadeInAnimation]": "" },
})
export class InventorytypeAddComponent implements OnInit {
    addInventoryType: FormGroup;
    submitted = false;
    successmsg;
    errormsg;
    Installation;
    modified;
    time = { hour: "", minute: "" };
    icon = false;
    spinners = false;
    constructor(
        private productTypeService: ProductTypeService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private router:Router
    ) {}

    ngOnInit() {
        this.addInventoryType = this.formBuilder.group({
            equipmentTypeId: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.numeric({
                        acceptValue: NumericValueType.PositiveNumber,
                        allowDecimal: false,
                        message: "This will take only positive numbers",
                    }),
                ],
            ],
            equipmentTypeShortName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.alpha({
                        message: "Only Alphabet is required!",
                        allowWhiteSpace: true,
                    }),
                ],
            ],
            equipmentTypeName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.alpha({
                        message: "Only Alphabet is required!",
                        allowWhiteSpace: true,
                    }),
                ],
            ],
        });
    }

    get fval() {
        return this.addInventoryType.controls;
    }

    onaddinvetFormSubmit() {
        this.submitted = true;
        if (this.addInventoryType.invalid) {
            return Swal.fire({
                icon:"error",
                text:"Please fill the details"
            })
        }
        this.spinner.show();
        this.productTypeService.postProductType(this.addInventoryType.value).subscribe({
            next:(res)=>{
              if(res.status === "0"){
                this.spinner.hide();
                this.toastr.error(res.data)
              }
              else if(res.status === "1"){
                this.spinner.hide();
                //this.successmsg = res.data;
                this.toastr.success(res.data);
                this.addInventoryType.reset();
                this.submitted = false;
                this.router.navigate(['/equipment/inventoryTypeList']);
              }
            },
            error:(err)=>{
                this.spinner.hide();
                this.toastr.error(err.error.data)
            }
          })
    }
}
