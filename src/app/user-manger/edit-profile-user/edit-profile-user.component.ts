import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { disable, NumericValueType, RxwebValidators } from "@rxweb/reactive-form-validators";
import { UserProfileService } from "../../_services/user-profile.service";
import { PTO } from "src/app/auth_models/pto.model";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
//import swal from "sweetalert";
import { Subscription } from "rxjs";
import { AddUserService } from "../_services/add-user.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-edit-profile-user",
    templateUrl: "./edit-profile-user.component.html",
    styleUrls: ["./edit-profile-user.component.scss"],
})
export class EditProfileUserComponent implements OnInit {
    userList;
    editProfileForm: FormGroup;
    submitted: boolean = false;
    role: string;
    isReadOnly: boolean = true;
    userRole: PTO;
    data;
    currentuser: any;
    user: any;
    successmsg: any;
    errormsg: any;
    showEditBtn:boolean = false;
    showUpdateBtn:boolean = false;
    
    roleList: any;
    
    subscription: Subscription[] = [];
    
    showStationCode:boolean = false;
    stationList: any;
    roleError:boolean = false;
    stationError:boolean = false;
    isDisabled:boolean = false;
    userManagerRole:string;

    constructor(
        private formbuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private userProfileAPI: UserProfileService,
        private editUserService: AddUserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.showEditBtn = true;
        this.currentuser = JSON.parse(localStorage.getItem("Token"));
        this.user = this.currentuser.id;

        this.editProfileForm = this.formbuilder.group({
            //id: [],
            name: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            username: [
                "",
                RxwebValidators.required({
                    message: "This field is required!"
                })
            ],

            email: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.email({
                        message: "Email is not valid!",
                    })
                ]
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
                ]
            ],
            
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
                    })
                ]
            ],

           role:['']
        });

        
        

        //will fetch all roles on which USER-MANAGER can operate 
        this.subscription.push(
            // this.editUserService.getRolesToAdd().subscribe((res) => {
            //     this.roleList = res["data"];              
            // })  
            this.editUserService.getRolesToAdd().subscribe({
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

        //fetching User manager Details
        // this.userProfileAPI.UserProfile().subscribe(
        //     (userData) => 
        //     {
        //         this.getUserData(userData);
               
        //     },
        //     (error) => {
        //         this.toastr.error("", error.data)
        //     }
        // );
        this.userProfileAPI.UserProfile().subscribe({
            next:(res:any)=>{
                this.getUserData(res);
                
            //   if(res.status === "0"){
            //       this.toastr.error(res.data,'Error!')
            //   }
            //   else if(res.status === "1"){
            //     console.log(res,'res');
            //     this.getUserData(res.data);
            //   }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })

        //keep form disable untill Edit button is hit
        this.editProfileForm.disable();
    }//ngOnInit ends


    //enables all fields of form
    showEditForm(){
        this.editProfileForm.enable();
        this.showEditBtn = false;
        this.showUpdateBtn = true;
        this.isDisabled = null;
    }

    //will navigate back to user-list
    cancel(){
        
        this.editProfileForm.disable();
        this.showEditBtn = true;
        this.showUpdateBtn = false;
        // this.userProfileAPI.UserProfile().subscribe(
        //     (userData) => {
        //         this.getUserData(userData);
        //     }
        // );
        this.userProfileAPI.UserProfile().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.getUserData(res);
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
        this.isDisabled = false;
        this.showStationCode = false;
       
    }




    //will patch all USM data to appropriate form fields
    getUserData(userData: any) {
       
        this.userManagerRole = userData.roles[0].roleName;
        this.editProfileForm.patchValue({
            //id: userData.id,
            empId: userData.empId,
            username: userData.username,
            email: userData.email,
            name: userData.name,
            mobileNumber: userData.mobileNumber,
            stationCode: userData.stationCode
        });
    }

    //will get all the controls of form
    get fval() {
        return this.editProfileForm.controls;
    }

    

    //will update USER-MANAGER data
    onFormSubmit() {
       
        
        this.submitted = true;

        if(this.editProfileForm.invalid){
            return Swal.fire({
                icon: "error",
                text: "Please enter all fields!"
            });
        }
       

    

        this.spinner.show();
        this.subscription.push(
        //     this.editUserService.editUserManagerProfile(this.editProfileForm.value).subscribe((resp)=>{
        //     if(resp["status"] == "1"){
        //         this.toastr.success(resp["data"]);
        //         setTimeout(() => { this.spinner.hide();}, 3000);
        //             this.showEditBtn = true;
        //             this.showUpdateBtn = false;
        //             this.editProfileForm.disable();
        //             this.isDisabled = false;
        //     }
        //     else{
        //         this.toastr.error("", resp["data"]);
        //     }
        // })
        this.editUserService.editUserManagerProfile(this.editProfileForm.value).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.toastr.success(res.data);
                setTimeout(() => { this.spinner.hide();}, 3000);
                    this.showEditBtn = true;
                    this.showUpdateBtn = false;
                    this.editProfileForm.disable();
                    this.isDisabled = false;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
        )
         }
        

    }
//}
