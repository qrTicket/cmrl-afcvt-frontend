import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { UserProfileService } from "../../_services/user-profile.service";
import { SuperService } from "../_superservices/super.service";
import { PTO } from "src/app/auth_models/pto.model";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-edit-profile",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
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

    constructor(
        private formbuilder: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private userProfileAPI: UserProfileService,
        private super__API: SuperService
    ) {}

    ngOnInit() {
        this.currentuser = JSON.parse(localStorage.getItem("Token"));
        this.user = this.currentuser.id;
        // console.log(this.currentuser.id, "id");

        this.editProfileForm = this.formbuilder.group({
            id: [],
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
            // roles: [
            //     "",
            //     RxwebValidators.required({
            //         message: "This field is required!",
            //     }),
            // ],
            email: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            // DOB: [
            //     "",
            //     RxwebValidators.required({
            //         message: "This field is required!",
            //     }),
            // ],
            contact: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            address: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
        });
        // this.userProfileAPI
        //     .getUserProfile(this.user)
        //     .subscribe((userData: PTO) => {
        //         this.userRole = userData;
        //         console.log("User Profile", this.userRole);
        //         this.getUserData(userData);
        //     });
    }

    getUserData(userData: PTO) {
        this.editProfileForm.patchValue({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            name: userData.name,
            // roles:this.data = userData.roles,
            contact: userData.contact,
            address: userData.address,
            // vendorName: userData.vendorName,
            // gstNumber: userData.gstNumber,
            // panNumber: userData.panNumber,
            // password: userData.password,
            // confirmPassword: userData.confirmPassword,
            // state: userData.state,
            // createdDate: userData.createdDate,
            // verified: userData.verified,
        });
    }

    get fval() {
        return this.editProfileForm.controls;
    }

    onFormSubmit() {
        this.spinner.show();
        // console.log(this.editProfileForm.value);
        // this.userProfileAPI
        //     .updateUserProfile(
        //         this.editProfileForm.value.id,
        //         this.editProfileForm.value
        //     )
        //     .subscribe(
        //         (res) => {
        //             console.log(res);
        //             this.spinner.hide();
        //             this.successmsg = res;
        //             this.toastr.info("", this.successmsg.message);
        //         },
        //         (error) => {
        //             console.log(error);
        //             this.spinner.hide();
        //             this.errormsg = error;
        //             this.toastr.info("", this.errormsg);
        //         }
        //     );
    }
}
