import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription, from } from "rxjs";
import { UserProfileService } from "../../_services/user-profile.service";
import { PTO } from "src/app/auth_models/pto.model";
import { ProfileService } from "../_services/admin-profile.service";
import { EditProfile } from "src/app/_models/editProfile.model";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import Swal from "sweetalert2";
import { AddUserService } from "src/app/user-manger/_services/add-user.service";


@Component({
    selector: "app-edit-profile",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
    editProfileForm: FormGroup;
    submitted: boolean = false;
    role: string;
    isReadOnly: boolean = true;
    //userRole: PTO[] = [];
    userRole: any[] = [];
    currentuser: any;
    user: any;
    successmsg;
    subscription: Subscription[] = [];
    showEditBtn:boolean = true;
    showUpdateBtn:boolean = false;
    editProfileModel: EditProfile;
    username:string;
    empId:any;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private userProfileAPI: AddUserService,
        private adminProfileSrv: ProfileService 
    ) { }

    ngOnInit() {
        this.submitted = false;
        this.currentuser = JSON.parse(localStorage.getItem("Token"));
        this.user = this.currentuser.id;
        //this.username = localStorage.getItem("profilename");
        console.log(this.username);

        this.editProfileForm = this.formBuilder.group({
            name: 
                [
                    "",
                    [
                        RxwebValidators.required({message:"This field is required!"})
                    ]
                ],
            mobileNumber: 
                [ 
                    "",
                    [
                        RxwebValidators.required({message:"This field is required!"}),
                        RxwebValidators.pattern({
                            expression: { onlyDigit: /^[6-9]\d{9}$/ },
                            message: "Invalid mobile number!",
                        }),
                    ]
                ],
            email: 
                [
                    "",
                    [
                        RxwebValidators.required({message:"This field is required!"}),
                        RxwebValidators.email({message:"Invalid email address"})
                    ]
                ],
            //username: [""]
        });
        this.editProfileForm.disable();

        this.subscription.push(
            this.userProfileAPI
                .getUserProfile()
                .subscribe((userData: any) => {
                    this.getUserData(userData);
                })
        );
    }

    getUserData(userData: any) {
        this.editProfileForm.patchValue({
            //id: userData.id,
            //username: userData.username,
            email: userData.email,
            name: userData.name,
            mobileNumber: userData.mobileNumber,
        });
        this.username=userData.username;
        this.empId = userData.empId
        this.userRole=userData.roles;
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
                text:"Please enter all fields"
            })
        }

        console.log('inside....');
        console.log(this.editProfileForm.value);
        // this.editProfileModel.name = this.editProfileForm.value.name;
        // this.editProfileModel.email = this.editProfileForm.value.email;
        // this.editProfileModel.mobileNumber = this.editProfileForm.value.mobileNumber;
        //console.log("editProfileModel : "+this.editProfileModel);
        this.adminProfileSrv.editAdminProfile(this.editProfileForm.value).subscribe((res:any)=>{
            if(res.status === "1"){
                this.toastr.success(res.data);
                this.showEditBtn = true;
                this.showUpdateBtn = false;
                this.editProfileForm.disable();
            }
            else{
                console.log('error');
            }
        })
    }
}
