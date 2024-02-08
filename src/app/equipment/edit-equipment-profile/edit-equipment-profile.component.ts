import { Component, OnInit, OnDestroy } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { AddUserService } from "../../user-manger/_services/add-user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

import { PTO } from "src/app/auth_models/pto.model";
import Swal from "sweetalert2";
import { UserProfileService } from "src/app/_services/user-profile.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-edit-equipment-profile",
    templateUrl: "./edit-equipment-profile.component.html",
    styleUrls: ["./edit-equipment-profile.component.scss"],
})
export class EditEquipmentProfileComponent implements OnInit, OnDestroy {
    subscription: Subscription[] = [];
    userList;
    editProfileForm: UntypedFormGroup;
    submitted: boolean = false;
    role: string;
    isReadOnly: boolean = true;
    userRole: PTO;
    data;
    currentuser: any;
    user: any;
    successmsg: any;
    errormsg: any;
    showEditBtn:boolean = true;
    showUpdateBtn:boolean = false;
    showRole:any = "";


    constructor(
        private formbuilder: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private userProfileAPI: AddUserService,
        private userDataUpdate: UserProfileService,
        private router: Router
    ) {}

    ngOnInit() {
        this.currentuser = JSON.parse(localStorage.getItem("Token"));
        this.user = this.currentuser.id;

        this.editProfileForm = this.formbuilder.group({
            empId: [''],
            name: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            username: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],

            email: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.email({message:"Invalid email address"})
                ],
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
            roles:['']
        });
        this.subscription.push(
            this.userProfileAPI
                .getUserProfile()
                .subscribe((profileData: PTO) => {
                    this.getUserData(profileData);
                })
        );
        this.editProfileForm.disable();
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
        this.showRole = '';
        this.ngOnInit();
    }

    getUserData(userData: PTO) {
        this.editProfileForm.patchValue({
            empId: userData.empId,
            username: userData.username,
            email: userData.email,
            name: userData.name,
             //roles:this.data = userData.roles,
            mobileNumber: userData.mobileNumber,
            // address: userData.address,
            // vendorName: userData.vendorName,
            // gstNumber: userData.gstNumber,
            // panNumber: userData.panNumber,
            // password: userData.password,
            // confirmPassword: userData.confirmPassword,
            // state: userData.state,
            // createdDate: userData.createdDate,
            // verified: userData.verified,
        });
        userData.roles.forEach((role)=>{
            this.showRole = role.roleName + ', ' + this.showRole;
        })
        //this slice method will remove/detach/substract the last 2 characters which are comma and space 
        this.showRole = this.showRole.slice(0,-2);
    }

    get fval() {
        return this.editProfileForm.controls;
    }

    onFormSubmit() {
        this.submitted = true;
        //this.spinner.show();
        if(this.editProfileForm.invalid){
            return Swal.fire({
                icon:"error",
                text:"Please enter all fields!"
            });
        }

        this.userDataUpdate.updateUserProfile(this.editProfileForm.value)
            .subscribe(
                (res:any) => {
                    if(res.status === "1"){
                        this.spinner.show();
                        this.toastr.success("SUCCESS! "+res.data);
                        this.showEditBtn = true;
                        this.showUpdateBtn = false;
                        this.editProfileForm.disable();
                        this.spinner.hide();
                    }
                },
                (error) => {
                    this.toastr.error("ERROR! ", error.data)
                }
            );

        
    }

    ngOnDestroy() {
        this.subscription.forEach((subs) => subs.unsubscribe());
    }
}
