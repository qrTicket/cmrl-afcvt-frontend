import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
// import { MustMatch } from 'src/app/_helpers/match-validators';
import { UserProfileService } from "../../_services/user-profile.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  changePasswordForm: UntypedFormGroup;
  submitted: boolean = false;
  successmsg: any;
  errormsg: any;
  constructor(
    private formbuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private userProfileAPI: UserProfileService
  ) { }

  ngOnInit() {
    
    this.changePasswordForm = this.formbuilder.group({
      oldPassword: [
        "", [
          RxwebValidators.required({
            message: "This field is required!",
          }),
        ],
      ],
      newPassword: [
        "", [
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
        "", [
          RxwebValidators.required({
            message: "This field is required!",
          }),

          RxwebValidators.compare({
            fieldName: "newPassword",
            message: "Password don't match!",
          }),
        ],
      ]
    }
    );
  }

  get fval() {
    return this.changePasswordForm.controls;
  }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;
    if (this.changePasswordForm.invalid)
      // return this.toastr.error("", "Error");
      //return swal("Please fill all the fields!", "", "error");
      return Swal.fire({
        title: "ERROR!",
        text:"Please fill all the fields!",
        icon: "error"
      });
    this.userProfileAPI
      .changePassword(
        this.changePasswordForm.value
      )
      .subscribe(
        (res) => {
            if(res.status === "0"){
                this.spinner.hide();
                // return this.toastr.error(res.data)
                //return Swal.fire(res.data, "", "error");
                return Swal.fire({
                  title: "ERROR!",
                  text:res.data,
                  icon: "error"
                });
            }
          this.spinner.hide();
          this.successmsg = res["data"];
          this.toastr.success("", this.successmsg);
          //this.router.navigate(['/stationdashboard']);
          this.changePasswordForm.reset();
          this.submitted = false;
          this.router.navigateByUrl("/login");
          localStorage.clear()

        },
        (error) => {
          this.spinner.hide();
          this.errormsg = error["data"];
          // this.toastr.error("", this.errormsg);
          //swal(this.errormsg, "", "error");
          Swal.fire({
            title: "ERROR!",
            text:this.errormsg,
            icon: "error"
          });
        }
      );


  }

}
