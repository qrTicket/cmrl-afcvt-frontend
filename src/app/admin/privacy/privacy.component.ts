import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { UserProfileService } from "../../_services/user-profile.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
    selector: "app-privacy",
    templateUrl: "./privacy.component.html",
    styleUrls: ["./privacy.component.scss"],
})
export class PrivacyComponent implements OnInit {
    updatepwdForm: UntypedFormGroup;
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
        this.updatepwdForm = this.formBuilder.group({
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
        return this.updatepwdForm.controls;
    }

   

    onSubmit() {
        this.spinner.show();
        this.submitted = true;
        if (this.updatepwdForm.invalid)
            return Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Please fill all fields!",
            });
        this.userProfileAPI.changePassword(this.updatepwdForm.value).subscribe(
            (res) => {
                if (res.status === "0") {
                    this.spinner.hide();
                    return this.toastr.error(res.data);
                }
                console.log(res, "Password");

                this.spinner.hide();
                this.successmsg = res["data"];
                this.toastr.success("", this.successmsg);
                this.updatepwdForm.reset();
                this.submitted = false;
                this.router.navigateByUrl("/login");
                localStorage.clear();
            },
            (error) => {
                this.spinner.hide();

                Swal.fire({
                    title: "Error!",
                    text: error["data"],
                });
                
            }
        );
    }
}
