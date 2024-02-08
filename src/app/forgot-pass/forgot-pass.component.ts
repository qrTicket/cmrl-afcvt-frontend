import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { ForgotPasswordService } from "../_services/forgot-password.service";

@Component({
    selector: "app-forgot-pass",
    templateUrl: "./forgot-pass.component.html",
    styleUrls: ["./forgot-pass.component.scss"]
})
export class ForgotPassComponent implements OnInit {
    forgotForm: UntypedFormGroup;
    submitted = false;
    loading = false;
    constructor(
        private formbuilder: UntypedFormBuilder,
        private forgotpasswordService: ForgotPasswordService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.forgotForm = this.formbuilder.group({
            email: ["", [Validators.required, Validators.email]]
        });
    }

    get fval() {
        return this.forgotForm.controls;
    }
    onFormSubmit() {
        this.submitted = true;

        if (this.forgotForm.invalid) {
            return this.toastr.warning("", "Please enter you email !", {
                progressBar: true
            });
        }

        this.spinner.show();
        this.loading = false;
        this.forgotpasswordService
            .postResetPassword(this.forgotForm.value)
            .subscribe(data => {
                this.spinner.hide();
                this.toastr.success(
                    "",
                    "Reset link send to your registered email",
                    {
                        progressBar: true
                    }
                );
                this.forgotForm.reset();
                this.submitted = false;
            });
        error => {
            this.loading = false;
            this.toastr.error("", "Email does not exists !");
        };
    }
}
