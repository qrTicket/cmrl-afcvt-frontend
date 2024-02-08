import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl } from "@angular/forms";
import { Router } from "@angular/router";

import { CustomValidators } from "ng2-validation";
import { ToastrService } from "ngx-toastr";
import { SuperService } from "../_superservices/super.service";

@Component({
    selector: "app-registration",
    templateUrl: "./registration.component.html",
    styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
    regform: UntypedFormGroup;
    submitted = false;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private superservice: SuperService
    ) {
        this.regform = new UntypedFormGroup({
            vendorName: new UntypedFormControl("", CustomValidators.required),
            contactPerson: new UntypedFormControl("", CustomValidators.required),
            mobileNumber: new UntypedFormControl("", CustomValidators.number),
            gstNumber: new UntypedFormControl("", CustomValidators.required),
            panNumber: new UntypedFormControl("", CustomValidators.required),
            password: new UntypedFormControl("", CustomValidators.required),
            confirmPassword: new UntypedFormControl("", CustomValidators.required),
            userName: new UntypedFormControl("", CustomValidators.required),
            address: new UntypedFormControl("", CustomValidators.required),
            email: new UntypedFormControl(
                "",
                (CustomValidators.required, CustomValidators.email)
            )
        });
    }

    ngOnInit() {}

    get fval() {
        return this.regform.controls;
    }

    onFormSubmit() {
        this.submitted = true;
        if (this.regform.invalid)
            return this.toastr.error("Error", "Please fill the details", {
                "progressBar": true,
            });

        this.superservice
            .postVendorVerify(this.regform.value)
            .subscribe(res => {
                this.toastr.success("PTO Verified", "Success");
            });

        this.regform.reset();
        this.submitted = false;
    }
}
