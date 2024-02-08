import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormArray, UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { NumericValueType, RxwebValidators } from "@rxweb/reactive-form-validators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
import { AddUserService } from "../_services/add-user.service";
import { Shifts } from "../_models/shifts.model";
import { Subscription } from "rxjs";
//import swal from 'sweetalert';
import { Router } from "@angular/router";



@Component({
    selector: "app-add-user",
    templateUrl: "./add-user.component.html",
    styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit, OnDestroy {
    addUser: UntypedFormGroup;
    subscription: Subscription[] = [];
    submitted = false;
    successmgs;
    errormsg;
    shifts: Shifts[];
    roleList: any;
    stationList: any;
    role: any;
    rolesArray:string[] = [];
    roleError:boolean = false;
    showStationList:boolean;
    

    // roleNameMap : any = new Map<String,String>();
    // // set the placeholder to MultiSelect Dropdown input element
    // public localWaterMark: string = 'Select Roles';

    constructor(
        private formBuilder: UntypedFormBuilder,
        private addUserService: AddUserService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router : Router
    ) {}

    ngOnInit() {
        this.addUser = this.formBuilder.group({
            empId:[ "", [RxwebValidators.required({ message: "This field is required!" }), 
                        RxwebValidators.numeric({ acceptValue:NumericValueType.PositiveNumber, allowDecimal:false, message: "This will accept only Numbers!" }), 
                        RxwebValidators.minLength({value:4, message:'Minimum length of emp ID should be 4'}), 
                        RxwebValidators.maxLength({value:10, message:'Maximum length of emp ID should be 10'})  ] ],

            name: [ "", [RxwebValidators.required({ message: "This field is required!" }), RxwebValidators.alpha({ message: "This will accept only alphabets!", allowWhiteSpace: true,}), RxwebValidators.minLength({ value: 3, message: "Minimum 3 characters required!" }) ] ],
            email: [ "", [RxwebValidators.required({message: "This field is required!" }), RxwebValidators.email({ message: "Email is not valid!" }) ] ],
            username: [ "", [RxwebValidators.required({ message: "This field is required!" }),
                            RxwebValidators.maxLength({value:30, message:'Please enter username less than 30 characters!'}) ] ],
            password: [ "", [RxwebValidators.required({message: "This field is required!" }), RxwebValidators.pattern({ expression: { pass: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, },  message: "This will accept atleast 1 Uppercase, 1 lowercase, 1 symbol and 1 number with min lenght 8!" }) ] ],
            confirmPassword: [ "",[RxwebValidators.required({ message: "This field is required!" }),  RxwebValidators.compare({ fieldName: "password", message: "Password don't match!" }) ]],
            roles: [ this.rolesArray ],
            mobileNumber: [ "", [ RxwebValidators.required({ message: "This field is required!" }), RxwebValidators.pattern({ expression: { onlyDigit: /^[6-9]\d{9}$/ }, message: "Invalid mobile number!"})] ],
            stationCode: ["", RxwebValidators.required({ message: "This field is required!" }) ] 
        });

        this.addUser.controls["stationCode"].disable();
                
        this.subscription.push(
            this.addUserService.getRolesToAdd().subscribe((res) => {
                this.roleList = res["data"];              
            })
        );

        this.subscription.push(
            this.addUserService.getAllStation().subscribe((res) => {
                this.stationList = res["data"];
            })
        );
        
    }

    get fval() {
        return this.addUser.controls;
    }


    //fetch all checked roles into this array
    onChange(e){ 
        let i:number = 0;
        if(e.target.checked){
            this.roleError = false;
            this.rolesArray.push(e.target.value);
            for(i; i < this.rolesArray.length; i++){
                if(this.rolesArray[i] === 'STN'){
                    this.showStationList = true;
                    this.addUser.controls["stationCode"].enable();
                }
            }
        }
        else{
            if(e.target.value === 'STN'){
                this.showStationList = false;
                this.addUser.controls["stationCode"].reset();
                this.addUser.controls["stationCode"].disable();
            }
            for(i; i < this.rolesArray.length; i++){
                if(this.rolesArray[i] == e.target.value){
                    this.rolesArray.splice(i,1);
                }
            }
        }
       
       

        // if(e.target.checked){
        //     this.roleError = false;
        //     if(e.target.value === "STN"){
        //         this.showStationList = true;
        //         this.addUser.controls["stationCode"].enable();
        //     }
        //     else{
                
        //         this.addUser.controls["stationCode"].reset();
        //         this.addUser.controls["stationCode"].disable();
        //         this.showStationList = false;
        //     }
           
        //     this.rolesArray.push(e.target.value);
        // }
        // else{
        //     //this.showStationList = false;
        //     this.addUser.controls["stationCode"].reset();
        //     this.addUser.controls["stationCode"].disable();
        //     let i:number = 0;
        //     for(i; i < this.rolesArray.length; i++){
        //         if(this.rolesArray[i] == e.target.value){
        //             this.rolesArray.splice(i,1);
        //         }
        //     }
        // }
       
        console.log(this.rolesArray);
    }


    
    cancel(){
        this.router.navigate(['/user-manager/dashboard']);
    }


    onSubmit() {        
        this.submitted = true;
        if(this.rolesArray.length <= 0){
            this.roleError = true;
            return Swal.fire({
                icon: "error",
                text: "Please enter all fields!",
            });
        }
        else{
            this.roleError = false;
        }
        if (this.addUser.invalid)
            return Swal.fire({
                icon: "error",
                text: "Please enter all fields!",
            });

        this.spinner.show();
        this.subscription.push(
            this.addUserService.addUser(this.addUser.value).subscribe(
                (res: any) => {
                    this.spinner.hide();
                    if (res["status"] === "1") {
                        this.toastr.success(res["data"]);
                        this.addUser.reset();
                        let num : number = 0;
                        for(num; num < this.rolesArray.length; num++){
                            this.rolesArray.splice(num);
                        }
                        this.submitted = false;
                        this.router.navigate(["/user-manager/users/all/list"]);
                    } 
                    else 
                    {
                        this.spinner.hide();
                        // this.toastr.info(data.data);
                        //swal(res.data, "", "warning");
                        Swal.fire({
                            icon: "error",
                            text: res.data,
                        });
                    }
                    //this.router.navigate(["/user-manager/users/all/list"]);
                },
                (error) => {
                    this.spinner.hide();
                    Swal.fire({
                        title: "Error !",
                        text: "backend error "+error.data,
                    });
                    // console.log("Error", error);
                    // this.errormsg = error;
                    // this.toastr.error(this.errormsg.data);
                }
            )
        );
        
    }

    ngOnDestroy() {
        this.subscription.forEach((subs) => subs.unsubscribe());
    }
}
