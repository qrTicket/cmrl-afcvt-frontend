import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { TerminalService } from "../_services/terminal.service";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import {
    RxwebValidators,
    ValidationAlphabetLocale,
} from "@rxweb/reactive-form-validators";
import { ProductService, ProductTypeService } from "../_services";
import { Product } from "../_models/product.model";
import { StationService } from "src/app/admin/_services/station.service";
import { Station } from "src/app/admin/_models/station.model";
import { ProductType } from "../_models/product-type.model";

@Component({
    selector: "app-terminal",
    templateUrl: "./terminal.component.html",
    styleUrls: ["./terminal.component.scss"],
})
export class TerminalComponent implements OnInit {
    addTerminalForm: UntypedFormGroup;
    productList: Product[];
    submitted = false;
    showSpinners = false;
    successmsg;
    errormsg;
    stationList: Station[];
    productTypeList: ProductType[];
    constructor(
        private formBuilder: UntypedFormBuilder,

        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private terminalService: TerminalService,
        private productService: ProductService,
        private stationService: StationService,
        private productType: ProductTypeService
    ) {}

    ngOnInit() {
        this.addTerminalForm = this.formBuilder.group({
            productId: [
                "",
                RxwebValidators.required({
                    message: "This field is required",
                }),
            ],
            station: [
                "",
                RxwebValidators.required({
                    message: "This field is required",
                }),
            ],
            productTypeId: [
                "",
                RxwebValidators.required({
                    message: "This field is required",
                }),
            ],
                       
        });
        this.productService.getProductList().subscribe((res) => {
            this.productList = res;
        });
        this.stationService.getStation().subscribe((res) => {
            this.stationList = res;
        });
        this.productType.getProductTypeList().subscribe((res) => {
            this.productTypeList = res;
        });
    }

    onFormSubmit() {
        this.submitted = true;
        if (this.addTerminalForm.invalid)
            return this.toastr.error("Invalid form", "Error incountered");
        this.spinner.show();
        // console.log(this.addTerminalForm.value);
        this.terminalService.addTerminal(this.addTerminalForm.value).subscribe(
            (res) => {
                this.spinner.hide();
                this.successmsg = res;
                this.toastr.success("", this.successmsg.message);
                this.addTerminalForm.reset();
                this.submitted = false;
            },
            (error) => {
                this.spinner.hide();
                this.errormsg = error;
                this.toastr.error(this.errormsg);
            }
        );
    }
}
