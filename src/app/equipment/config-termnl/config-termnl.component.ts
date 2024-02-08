import { Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { TerminalService } from "../_services/terminal.service";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import {
    RxwebValidators,
    ValidationAlphabetLocale,
} from "@rxweb/reactive-form-validators";
import { ProductService } from "../_services";
import { Product } from "../_models/product.model";
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
    selector: "app-config-termnl",
    templateUrl: "./config-termnl.component.html",
    styleUrls: ["./config-termnl.component.scss"],
})
export class ConfigTermnlComponent implements OnInit {
    @ViewChild("lgModal") lgModal: ModalDirective;
    addTerminalForm: UntypedFormGroup;
    productList: Product[];
    submitted = false;
    showSpinners = false;
    successmsg;
    errormsg;
    constructor(
        private formBuilder: UntypedFormBuilder,

        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private terminalService: TerminalService,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.addTerminalForm = this.formBuilder.group({
            productId: [
                "",
                RxwebValidators.required({
                    message: "This field is required",
                }),
            ],
            terminalIp: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            activationTime: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            deActivationTime: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            entryExitOverride: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            timeModeOverride: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            highSecurityMode: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            editable: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
        });
        this.productService.getProductList().subscribe((res) => {
            this.productList = res;
        });
    }
    showChildModal(): void {
        this.lgModal.show();
    }

    hideChildModal(): void {
        this.lgModal.hide();
    }
    onFormSubmit() {
        // this.spinner.show();
        console.log(this.addTerminalForm.value);

        this.lgModal.hide();
    }
}
