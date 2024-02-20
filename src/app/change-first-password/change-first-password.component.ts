import { AfterViewInit ,Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fadeInAnimation } from "../_animations/fadeIn.animation";
import Swal from 'sweetalert2';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../_services';
import { first } from "rxjs/operators";
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-change-first-password',
  templateUrl: './change-first-password.component.html',
  styleUrls: ['./change-first-password.component.scss'],
  animations: [fadeInAnimation]
})
export class ChangeFirstPasswordComponent implements OnInit, AfterViewInit {
  @ViewChild("myinput") el: ElementRef;
  changeFirstPassword: FormGroup;
  focus: string;
  oldPasswordCheck:boolean = false;
  submitted = false;
  username:string;
  successMessage:any;
  errMessage:string;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router : Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(){
    if(this.el.nativeElement){
      this.focus = this.el.nativeElement.focus();
    }
  }

  ngOnInit() {
    console.log("change first password loaded");
    this.changeFirstPassword = this.fb.group({
      oldPassword :["", RxwebValidators.required({message:"This field is required!"})],
      newPassword : ["", 
                      [
                        RxwebValidators.required({message:"This field is required!"}),
                        RxwebValidators.pattern({expression: {pass: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,}, message: "This will accept atleast 1 Uppercase, 1 lowercase, 1 symbol and 1 number with min lenght 8!" }),
                      ]
                    ],
      confirmNewPassword: ["", 
                            [
                              RxwebValidators.required({message:"This field is required!"}),
                              RxwebValidators.compare({fieldName:"newPassword", message:"Password Don't match"})
                            ]
                          ]
    });
    this.username = localStorage.getItem("username"); 
  }

  get fval(){
    return this.changeFirstPassword.controls;
  }

  onFormSubmit(){
    
    this.submitted = true;
    if(this.changeFirstPassword.invalid){
      return Swal.fire({icon:"error", text:"Please enter all fields!"})
    }

    this.spinner.show();

    // this.authService.changeFirstPassword( localStorage.getItem("username"), this.fval.oldPassword.value, this.fval.newPassword.value ).pipe(first()).subscribe(
    //   (data)=>{
    //   if(data.status === "1")
    //   {
    //     this.spinner.hide();
    //     this.router.navigate(["/login"]);
    //     this.toastr.success(`${data.data}`);
    //   }
    //   else if(data.status === "0"){
    //     //this.toastr.error(`${data.data}`)
    //     this.errMessage = data.data;
    //     this.spinner.hide();
    //     console.log(data.status);
    //     console.log(this.errMessage);
    //   }
    // },
    //   (error)=>{
    //     this.spinner.hide();
    //   }
    // )
    this.authService.changeFirstPassword( localStorage.getItem("username"), this.fval.oldPassword.value, this.fval.newPassword.value ).pipe(first()).subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.errMessage = res.data;
          this.spinner.hide();
          console.log(res.status);
          console.log(this.errMessage);
        }
        else if(res.status === "1"){
          this.spinner.hide();
        this.router.navigate(["/login"]);
        this.toastr.success(`${res.data}`);
        }
      },
      error:(err)=>{
        this.spinner.hide();
      }
    })


}

}
