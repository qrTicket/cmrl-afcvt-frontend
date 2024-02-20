import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NumericValueType, RxwebValidators } from "@rxweb/reactive-form-validators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
//import swal from 'sweetalert';
import { Router } from "@angular/router";
import { AddUsermanagerService } from "../_services/add-usermanager.service";



@Component({
  selector: 'app-add-usermanager',
  templateUrl: './add-usermanager.component.html',
  styleUrls: ['./add-usermanager.component.scss']
})
export class AddUsermanagerComponent implements OnInit, OnDestroy  {

  addUser: FormGroup;
  subscription: Subscription[] = [];
  submitted = false;
  successmgs;
  errormsg;
  roleList: any;
  stationList: any;
  role: any;
  rolesArray:string[] = [];
  roleError:boolean = false;
  

  // roleNameMap : any = new Map<String,String>();
  // // set the placeholder to MultiSelect Dropdown input element
  // public localWaterMark: string = 'Select Roles';

  constructor(
      private formBuilder: FormBuilder,
      private addUserService: AddUsermanagerService,
      private spinner: NgxSpinnerService,
      private toastr: ToastrService,
      private router : Router
  ) {}

  ngOnInit() {
      this.addUser = this.formBuilder.group({
          empId:[
              "",
              [
                RxwebValidators.required({
                    message: "This field is required!"
                }),
                RxwebValidators.numeric({
                    acceptValue:NumericValueType.PositiveNumber,
                    allowDecimal:false,
                    message: "This will accept only Numbers!"
                }),
                RxwebValidators.minLength({
                    value: 4,
                    message: "Minimum 4 digits required!",
                }),
              ]
          ],
          name: [
              "",
              [
                  RxwebValidators.required({
                      message: "This field is required!",
                  }),
                  RxwebValidators.alpha({
                      message: "This will accept only alphabets!",
                      allowWhiteSpace: true,
                  }),
                  RxwebValidators.minLength({
                      value: 3,
                      message: "Minimum 3 characters required!",
                  }),
              ],
          ],
          email: [
              "",
              [
                  RxwebValidators.required({
                      message: "This field is required!",
                  }),
                  RxwebValidators.email({
                      message: "Email is not valid!",
                  }),
              ],
          ],
          username: [
              "",
              RxwebValidators.required({
                  message: "This field is required!",
              }),
          ],
          password: [
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
                      fieldName: "password",
                      message: "Password don't match!",
                  }),
              ],
          ],
          roles: [
              this.rolesArray
          ],

          mobileNumber: [
              "",
              [
                  RxwebValidators.required({
                      message: "This field is required!",
                  }),
                  RxwebValidators.pattern({
                      expression: { onlyDigit: /^[6-9]\d{9}$/ },
                      message: "Invalid mobile number!",
                  }),
              ],
          ],
          stationCode: [
              "",
              RxwebValidators.required({
                  message: "This field is required!",
              }),
          ],
      });

      
      this.addUser.controls["stationCode"].disable();
      
      
      this.subscription.push(
        //   this.addUserService.getAllRoles().subscribe((res) => {
        //       this.roleList = res["data"];              
        //   })
        this.addUserService.getAllRoles().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.roleList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
      );
      

      
     /** Not in use */     
    //   this.subscription.push(
    //       this.addUserService.getAllStation().subscribe((res) => {
    //           this.stationList = res["data"];
    //       })
    //   );
      
  }

  get fval() {
      return this.addUser.controls;
  }

  //fetch all checked roles into this array
  onChange(e){ 
      if(e.target.checked){
          
        //   if(e.target.value === "STN"){
        //       this.addUser.controls["stationCode"].enable();
        //   }
        //   else{
        //       this.addUser.controls["stationCode"].reset();
        //       this.addUser.controls["stationCode"].disable();
        //   }
          this.rolesArray.push(e.target.value);
      }
      else{
        //   this.addUser.controls["stationCode"].reset();
        //   this.addUser.controls["stationCode"].disable();
          let i:number = 0;
          for(i; i < this.rolesArray.length; i++){
              if(this.rolesArray[i] == e.target.value){
                  this.rolesArray.splice(i,1);
              }
          }
      }
      console.log(this.rolesArray);
  }


  onSubmit() {        
    
    console.log(this.addUser.controls)

    this.submitted = true;
    if(this.rolesArray.length <= 0){
        this.roleError = true;
        return Swal.fire({
            icon: "error",
            text: "Please enter all fields!",
        });
    }

    if (this.addUser.invalid)
        return Swal.fire({
            icon: "error",
            text: "Please enter all fields!",
        });

    //console.log(this.addUser.value)
    let reqObj = {
        "name":this.addUser.value.name,
        "username":this.addUser.value.username,
        "email":this.addUser.value.email,
        "mobileNumber":this.addUser.value.mobileNumber,
        "empId":this.addUser.value.empId,
        "roles":this.addUser.value.roles,
        "password":this.addUser.value.password
    }

    //console.log(reqObj);
      
    this.spinner.show();
    this.subscription.push(
        // this.addUserService.addUser(reqObj).subscribe(
        //     (res: any) => {
        //         this.spinner.hide();
        //         if (res["status"] === "1") {
        //             this.toastr.success(res["data"]);
        //             this.addUser.reset();
        //             let num : number = 0;
        //             for(num; num < this.rolesArray.length; num++){
        //                 this.rolesArray.splice(num);
        //             }
        //             this.submitted = false;
        //             this.router.navigate(["/admin/usermanager-list"]);
        //         } 
        //         else {
        //             this.spinner.hide();
        //             return Swal.fire({
        //                 icon: "warning",
        //                 text: res.data,
        //             });
        //         }
        //     },
        //     (error) => {
        //         this.spinner.hide();
        //         console.log("Error", error);
        //     }
        // )
        this.addUserService.addUser(reqObj).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.spinner.hide();
                return Swal.fire({
                    icon: "warning",
                    text: res.data,
                });
              }
              else if(res.status === "1"){
                this.toastr.success(res.data);
                this.addUser.reset();
                let num : number = 0;
                for(num; num < this.rolesArray.length; num++){
                    this.rolesArray.splice(num);
                }
                this.submitted = false;
                this.router.navigate(["/admin/usermanager-list"]);
              }
            },
            error:(err)=>{
                this.spinner.hide();
                return Swal.fire({
                    icon: "warning",
                    text: err.error.data,
                });
            }
          })
    );
    
      
  }

  ngOnDestroy() {
      this.subscription.forEach((subs) => subs.unsubscribe());
  }

}
