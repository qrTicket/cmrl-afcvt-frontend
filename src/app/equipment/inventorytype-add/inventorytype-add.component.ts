import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { fadeInAnimation } from "../../_animations/fadeIn.animation";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import {
    RxwebValidators,
    NumericValueType,
} from "@rxweb/reactive-form-validators";

import { ProductTypeService } from "../_services/product-type.service";
import swal from 'sweetalert';
import Swal from "sweetalert2";

@Component({
    selector: "app-inventorytype-add",
    templateUrl: "./inventorytype-add.component.html",
    styleUrls: ["./inventorytype-add.component.scss"],
    animations: [fadeInAnimation],
    host: { "[@fadeInAnimation]": "" },
})
export class InventorytypeAddComponent implements OnInit {
    addInventoryType: UntypedFormGroup;
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
        private formBuilder: UntypedFormBuilder,
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
            //return swal("Please fill the details.", "", "error");
            return Swal.fire({
                icon:"error",
                text:"Please fill the details"
            })
        }
        this.spinner.show();
        this.productTypeService
            .postProductType(this.addInventoryType.value)
            .subscribe(
                (data) => {
                    if (data["status"] === "1") {
                        this.spinner.hide();
                        this.successmsg = data;
                        this.toastr.success(this.successmsg.data);
                        this.router.navigate(['/equipment/inventoryTypeList']);
                        
                    } else if (data["status"] === "2") {
                        // console.log("called status 2");
                        this.spinner.hide();
                        swal(data.data, "", "warning");
                    } else if (data["status"] === "0") {
                        this.spinner.hide();
                        swal(data.data, "", "warning");
                    }
                },
                (error) => {
                    // console.log(error);
                    this.spinner.hide();
                    this.errormsg = error;
                    // this.toastr.error(this.errormsg);
                    swal(this.errormsg, "", "error");
                }
            );

        this.addInventoryType.reset();
        this.submitted = false;
    }
}
