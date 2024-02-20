import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { UserProfileService } from "../../_services/user-profile.service";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { MustMatch } from "src/app/_helpers/match-validators";
@Component({
    selector: "app-reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
    changePasswordForm: FormGroup;
    submitted: boolean = false;
    successmsg: any;
    errormsg: any;
    constructor(
        private router: Router,
        private formbuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private userProfileAPI: UserProfileService
    ) {}

    ngOnInit() {
        this.changePasswordForm = this.formbuilder.group({
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
        //{ validator: MustMatch('newPassword', 'confirmPassword') }
    }
    get fval() {
        return this.changePasswordForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.changePasswordForm.invalid)
            return Swal.fire({
                icon: "error",
                text: "Please fill all fields!",
            });
        this.spinner.show();
        // this.userProfileAPI.changePassword(this.changePasswordForm.value).subscribe(
        //         (res) => {
        //             if (res.status === "0") {
        //                 this.spinner.hide();
        //                 return Swal.fire({
        //                     icon: "error",
        //                     title: "Error!",
        //                     text: res.data,
        //                 });
        //             }
        //             this.spinner.hide();
        //             this.successmsg = res["data"];
        //             this.toastr.success("", this.successmsg);
        //             this.changePasswordForm.reset();
        //             this.submitted = false;
        //             this.router.navigateByUrl("/user-manager/dashboard");
        //             //localStorage.clear();
        //         },
        //         (error) => {
        //             this.spinner.hide();
        //             Swal.fire({
        //                 title: "Error!",
        //                 text: error.data,
        //             });
        //             // this.errormsg = error["data"];
        //             // this.toastr.error("", this.errormsg);
        //         }
        //     );
            this.userProfileAPI.changePassword(this.changePasswordForm.value).subscribe({
                next:(res)=>{
                  if(res.status === "0"){
                    this.spinner.hide();
                    return Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: res.data,
                    });
                  }
                  else if(res.status === "1"){
                    this.spinner.hide();
                    this.successmsg = res.data;
                    this.toastr.success("", this.successmsg);
                    this.changePasswordForm.reset();
                    this.submitted = false;
                    this.router.navigateByUrl("/user-manager/dashboard");
                  }
                },
                error:(err)=>{
                    //this.toastr.error(err.error.data,'Error!')
                    this.spinner.hide();
                    Swal.fire({
                        title: "Error!",
                        text: err.error.data,
                    });
                }
              })
    }
}
