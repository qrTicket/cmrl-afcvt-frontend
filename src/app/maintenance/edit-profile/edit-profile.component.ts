import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { from } from "rxjs";
import { UserProfileService } from "../../_services/user-profile.service";
import { AddUserService } from "../../user-manger/_services/add-user.service";
import { PTO } from "src/app/auth_models/pto.model";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

@Component({
    selector: "app-edit-profile",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
    editProfileForm: FormGroup;
    // userList;
    submitted: boolean = false;
    role: string;
    isReadOnly: boolean = true;
    userRole: PTO[] = [];
    currentuser: any;
    user: any;
    successmsg;
    subscription: Subscription[] = [];
    showEditBtn:boolean = true;
    showUpdateBtn:boolean = false;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private userProfileAPI: AddUserService,
        private userDataUpdate: UserProfileService
    ) { }

    ngOnInit() {
        this.currentuser = JSON.parse(localStorage.getItem("Token"));
        this.user = this.currentuser.id;
        this.editProfileForm = this.formBuilder.group({
            //id: [],
            name: [
                "", 
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            //username: ["", Validators.required],
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
            email: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.email({message:"Invalid email address"})
                ],
            ]
        });

        this.subscription.push(
            // this.userProfileAPI.getUserProfile().subscribe((userData: PTO) => {
            //         this.getUserData(userData);
            //     })
            this.userProfileAPI.getUserProfile().subscribe({
                next:(res:any)=>{
                    if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                    }
                    else if(res.status === "1"){
                    this.getUserData(res.data)
                    }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
                })
        );
        this.editProfileForm.disable();
    }

    getUserData(userData: PTO) {
        this.editProfileForm.patchValue({
            //id: userData.id,
            //username: userData.username,
            email: userData.email,
            name: userData.name,
            mobileNumber: userData.mobileNumber,
        });
    }
    get fval() {
        return this.editProfileForm.controls;
    }


    showEditForm(){
        this.showEditBtn = false;
        this.showUpdateBtn = true;
        this.editProfileForm.enable();
    }

    cancel(){
        this.showEditBtn = true;
        this.showUpdateBtn = false;
        this.editProfileForm.disable();
    }

    onFormSubmit() {
        this.submitted = true;

        if(this.editProfileForm.invalid){
            return Swal.fire({
                icon:"error",
                text:"Please enter all fields!"
            });
        }

        // this.userDataUpdate.updateUserProfile(this.editProfileForm.value)
        //     .subscribe(
        //         (res:any) => {
        //             if(res.status === "1"){
        //                 this.toastr.success("SUCCESS! "+res.data);
        //                 this.showEditBtn = true;
        //                 this.showUpdateBtn = false;
        //                 this.editProfileForm.disable();
        //             }
        //         },
        //         (error) => {
        //             this.toastr.error("ERROR! ", error.data)
        //         }
        //     );
            this.userDataUpdate.updateUserProfile(this.editProfileForm.value).subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.toastr.success("SUCCESS! "+res.data);
                    this.showEditBtn = true;
                    this.showUpdateBtn = false;
                    this.editProfileForm.disable();
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        
    }
}
