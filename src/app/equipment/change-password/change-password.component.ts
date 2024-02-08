import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { UserProfileService } from "../../_services/user-profile.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import swal from 'sweetalert';

@Component({
    selector: "app-change-password",
    templateUrl: "./change-password.component.html",
    styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
    changePassword: UntypedFormGroup;
    submitted: boolean = false;
    successmsg: any;
    errormsg: any;
    constructor(
        private router: Router,
        private formBuilder: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private userProfileAPI: UserProfileService
    ) {}

    ngOnInit() {
        this.changePassword = this.formBuilder.group({
            oldPassword: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            newPassword: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.pattern({
                        expression: {
                            pass: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                        },
                        message:
                            "This will accept atleast 1 Uppercase, 1 lowercase, 1 symbol and 1 number with min lenght 8!",
                    }),
                ],
            ],
            confirmPassword: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.compare({
                        fieldName: "newPassword",
                        message: "Password does not match!",
                    }),
                ],
            ],
        });
    }
    get fval() {
        return this.changePassword.controls;
    }
    onSubmit() {
        this.submitted = true;
        if (this.changePassword.invalid)
            // return this.toastr.error("Please fill all the fields!");
            return swal("Please fill all the fields!", "", "error");

        this.spinner.show();
        this.userProfileAPI.changePassword(this.changePassword.value).subscribe(
            (res) => {
                if (res.status === "0") {
                    this.spinner.hide();
                    // return this.toastr.error(res.data);
                    return swal(res.data, "", "error");                  
                }

                this.spinner.hide();
                this.successmsg = res["data"];
                this.toastr.success("", this.successmsg);
                this.changePassword.reset();
                this.submitted = false;
                this.router.navigateByUrl("/login");
                localStorage.clear();
            },
            (error) => {
                this.spinner.hide();
                this.errormsg = error["data"];
                // this.toastr.error("", this.errormsg);
                swal(this.errormsg, "", "error");
            }
        );
    }
}
