import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from 'src/app/_services/user-profile.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-comp-change-password',
  templateUrl: './comp-change-password.component.html',
  styleUrls: ['./comp-change-password.component.scss']
})
export class CompChangePasswordComponent implements OnInit {

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
      return Swal.fire({
        title:'Error',
        icon:'error',
        text:'Please fill all the fields!'
      })

    // this.userProfileAPI
    //   .changePassword(
    //     this.changePasswordForm.value
    //   )
    //   .subscribe(
    //     (res) => {
    //         if(res.status === "0"){
    //             this.spinner.hide();
    //             return Swal.fire({
    //               title:'Error',
    //               icon:'error',
    //               text:res.data
    //             })
    //         }
    //       this.spinner.hide();
    //       this.successmsg = res["data"];
    //       this.toastr.success("", this.successmsg);
    //       //this.router.navigate(['/complaint/complaintdash']);
    //       this.changePasswordForm.reset();
    //       this.submitted = false;
    //       this.router.navigateByUrl("/login");
    //       localStorage.clear()

    //     },
    //     (error) => {
    //       this.spinner.hide();
    //       this.errormsg = error["data"];
    //       this.toastr.error("", this.errormsg);
    //     }
    //   );

      this.userProfileAPI.changePassword(this.changePasswordForm.value).subscribe({
        next:(res)=>{
          if(res.status === "0"){
            return Swal.fire({
              title:'Error',
              icon:'error',
              text:res.data
            })
          }
          else if(res.status === "1"){
            this.spinner.hide();
            this.successmsg = res.data;
            this.toastr.success("", this.successmsg);
            this.changePasswordForm.reset();
            this.submitted = false;
            this.router.navigateByUrl("/login");
            localStorage.clear()
          }
        },
        error:(err)=>{
            //this.toastr.error(err.error.data,'Error!')
            this.spinner.hide();
          this.errormsg = err.error.data;
          this.toastr.error("", this.errormsg);
        }
      })

  }

}
