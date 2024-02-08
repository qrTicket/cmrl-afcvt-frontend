import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { from } from "rxjs";
import { UserProfileService } from "../../_services/user-profile.service";
import { AddUserService } from "../../user-manger/_services/add-user.service";
import { PTO } from "src/app/auth_models/pto.model";
import { Subscription } from "rxjs/Subscription";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
    selector: "app-edit-profile",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
    editProfileForm: UntypedFormGroup;
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
    showRole:any;


    constructor(
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private userProfileAPI: AddUserService,
        private userDataUpdate: UserProfileService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.currentuser = JSON.parse(localStorage.getItem("Token"));
        this.user = this.currentuser.id;

        this.editProfileForm = this.formBuilder.group({
            empId: [''],
            roles:[''],
            name: ["", RxwebValidators.required({ message: "This field is required!" }) ],
            username: ["", Validators.required],
            mobileNumber: [ "", [ RxwebValidators.required({ message: "This field is required!", }), RxwebValidators.pattern({ expression: { onlyDigit: /^[6-9]\d{9}$/ }, message: "Invalid mobile number!", }) ]            ],
            email: [ "", [ RxwebValidators.required({ message: "This field is required!" }), RxwebValidators.email({message:"Invalid email address"})]]
        });

        this.subscription.push(
            this.userProfileAPI
                .getUserProfile()
                .subscribe((userData: PTO) => {
                    this.getUserData(userData);
                })
        );
        this.editProfileForm.disable();
    }

    getUserData(userData: PTO) {
        this.editProfileForm.patchValue({
            empId: userData.empId,
            roles: userData.roles[0].roleName,
            username: userData.username,
            email: userData.email,
            name: userData.name,
            mobileNumber: userData.mobileNumber,
        });
        this.showRole = userData.roles[0].roleName;
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
        this.ngOnInit();
        //this.router.navigate(['/complaint/complaintdash']);
    }

    onFormSubmit() {
        this.submitted = true;
        
        if(this.editProfileForm.invalid){
            return Swal.fire({
                icon:"error",
                text:"Please enter all fields!"
            })
        }
        this.spinner.show();
        this.userDataUpdate.updateUserProfile(this.editProfileForm.value)
            .subscribe(
                (res:any) => {
                    if(res.status === "1"){
                        
                        setTimeout(() => {
                            this.spinner.hide();
                        },3000);
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
