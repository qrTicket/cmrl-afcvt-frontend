// import { Component, OnInit } from "@angular/core";
// import { UserProfileService } from "../../_services/user-profile.service";
// import { Observable } from 'rxjs';


// @Component({
//   selector: "app-edit-profile",
//   templateUrl: "./edit-profile.component.html",
//   styleUrls: ["./edit-profile.component.scss"],
// })
// export class EditProfileComponent implements OnInit {

//   profile: Observable<[]>;
//   name: String;
//   username: String;
//   contact: String;
//   email: String;

//   constructor(
//     private userProfileService: UserProfileService
//   ) { }

//   ngOnInit() {
//     this.profileList();
//   }

//   profileList() {
//     this.userProfileService.UserProfile().subscribe((data) => {
//       this.profile = data;
//       this.name = data.name;
//       this.username = data.username;
//       this.contact = data.mobileNumber;
//       this.email = data.email;
//     });
//   }
  
// }

import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserProfileService } from "../../_services/user-profile.service";
import { PTO } from "src/app/auth_models/pto.model";
import Swal from "sweetalert2";

@Component({
    selector: "app-edit-profile",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
    editProfileForm: UntypedFormGroup;
    userList;
    submitted: boolean = false;
    role: string;
    isReadOnly: boolean = true;
    userRole: PTO;
    data;
    currentuser: any;
    user: any;
    successmsg;
    errormsg: any;
    showEditBtn:boolean = true;
    showUpdateBtn:boolean = false;
    username:string;
    empId:any;
    userRoles:any;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private userProfileAPI: UserProfileService
    ) {}

    ngOnInit() {
        this.currentuser = JSON.parse(localStorage.getItem("Token"));
        this.user = this.currentuser.id;

        this.editProfileForm = this.formBuilder.group({
            // id: [],
            // name: ["", Validators.required],
            // username: ["", Validators.required],
            // // role: ["", Validators.required],
            // // empId: ["", Validators.required],
            // contact: [
            //     "",
            //     [
            //         Validators.required,
            //         Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
            //     ],
            // ],
            // email: [
            //     "",
            //     [
            //         Validators.required,
            //         Validators.email,
            //         Validators.pattern(
            //             "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
            //         ),
            //     ],
            // ],
            // // dob: ["", Validators.required],
            // address: ["", Validators.required],
            //id: [],
            name: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            // username: [
            //     "",
            //     RxwebValidators.required({
            //         message: "This field is required!",
            //     }),
            // ],

            email: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.email({message:"Invalid email address"})
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
        });
        this.editProfileForm.disable();

        // this.userProfileAPI
        //     .getUserProfile(this.user)
        //     .subscribe((userData: PTO) => {
        //         this.userRole = userData;
        //         console.log("User Profile", this.userRole);
        //         this.getUserData(userData);
        //     });
        this.userProfileAPI.UserProfile().subscribe(
            (userData) => {
                this.getUserData(userData);
                console.log(userData)
            },
            (error) => {
                // console.log(error);
            }
        );
    }

    getUserData(userData: PTO) {
        this.editProfileForm.patchValue({
            // id: userData.id,
            // username: userData.username,
            // email: userData.email,
            // name: userData.name,
            // // roles:this.data = userData.roles,
            // contact: userData.contact,
            // address: userData.address,
            id: userData.id,
            username: userData.username,
            email: userData.email,
            name: userData.name,
            mobileNumber: userData.mobileNumber,
        });
        this.username=userData.username;
        this.empId = userData['empId'];
        this.userRoles = userData.roles;
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
            })
        }

        this.userProfileAPI
            .updateUserProfile(this.editProfileForm.value)
            .subscribe(
                (res:any) => {
                    if(res.status === "1"){
                        this.toastr.success("SUCCESS! "+res.data);
                        this.showEditBtn = true;
                        this.showUpdateBtn = false;
                        this.editProfileForm.disable();
                    }
                },
                (error) => {
                    this.toastr.error("ERROR! ", error.data)
                }
            );
    }
}

