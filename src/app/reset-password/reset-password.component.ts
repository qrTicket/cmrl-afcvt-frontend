import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

import { ForgotPasswordService } from "../_services/forgot-password.service";

@Component({
    selector: "app-reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
    token = JSON.parse(localStorage.getItem("Token"));
    successmsg;
    errormsg;
    show: boolean = false;
    resetPasswordForm: FormGroup;
    submitted = false;
    loading;
    user: any;

    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private forgotpasswordService: ForgotPasswordService
    ) {}

    ngOnInit() {
        this.user = this.token.email;

        this.resetPasswordForm = this.formBuilder.group({
            email: [""],
            password: ["", [Validators.required, Validators.minLength]],
            confirmPassword: ["", [Validators.required, Validators.minLength]],
        });
        this.resetPasswordForm
            .get("email")
            .setValue(this.user, { onlySelf: true });
    }
    get fval() {
        return this.resetPasswordForm.controls;
    }
    toggleEve(e) {
        this.show = e.target.checked;
    }

    onFormSubmit() {
        this.spinner.show();
        this.submitted = true;
        // this.forgotpasswordService.postChangePassword(this.resetPasswordForm.value).subscribe(
        //         (data) => {
        //             this.spinner.hide();
        //             this.successmsg = data;
        //             this.toastr.success("", this.successmsg.message);
        //         },
        //         (error) => {
        //             this.spinner.hide();
        //             this.errormsg = error;
        //             this.toastr.error(this.errormsg);
        //         }
        //     );
       
        // this.resetPasswordForm.reset();
        // this.submitted = false;

        this.forgotpasswordService.postChangePassword(this.resetPasswordForm.value).subscribe({
            next:(res)=>{
              if(res.status === "0"){
                this.spinner.hide();
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.spinner.hide();
                this.successmsg = res.data;
                this.toastr.success("", this.successmsg.message);
                this.resetPasswordForm.reset();
                this.submitted = false;
              }
            },
            error:(err)=>{
                //this.toastr.error(err.error.data,'Error!')
                this.spinner.hide();
                this.errormsg = err.error.data;
                this.toastr.error(this.errormsg);
            }
          })
    }
}
