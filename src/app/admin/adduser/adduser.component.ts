import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
import { Register } from '../../auth_models/register.model';
import { MustMatch } from 'src/app/_helpers/match-validators';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
  ) { }
  userForm: FormGroup;
  submitted = false;

  successmsg;
  errormsg;

   ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      empId: ['', Validators.required],
      username: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required]
    },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );

  }
  get fval() {
    return this.userForm.controls;
  }

   onFormSubmit() {
    this.submitted = true;
   
    // this.userService
    //   .postAdduser(this.userForm.value)
    //   .subscribe(
    //     (res) => {
    //       this.successmsg = res;
    //       this.toastr.success("", this.successmsg.message);
    //     },
    //     (error) => {
    //       this.errormsg = error;
    //       this.toastr.error("", this.errormsg);
    //     }
    //   );
    // this.userForm.reset();
    // this.submitted = false;

    this.userService.postAdduser(this.userForm.value).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.successmsg = res;
          this.toastr.success("", this.successmsg.message);
          this.userForm.reset();
          this.submitted = false;
        }
      },
      error:(err)=>{
          //this.toastr.error(err.error.data,'Error!')
          this.errormsg = err.error.data;
          this.toastr.error("", this.errormsg);
      }
    })
  }

}
