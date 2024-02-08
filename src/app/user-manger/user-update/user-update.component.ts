import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NumericValueType, RxwebValidators } from "@rxweb/reactive-form-validators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { AddUserService } from "../_services/add-user.service";
import { Shifts } from "../_models/shifts.model";
import { ShiftsService } from "../_services/shifts.service";
import { AddUser } from "../_models/addUser.model";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";



@Component({
    selector: "app-user-update",
    templateUrl: "./user-update.component.html",
    styleUrls: ["./user-update.component.scss"],
})
export class UserUpdateComponent implements OnInit {
    
    updateUser: UntypedFormGroup;
    submitted = false;
    successmgs;
    errormsg;
    shifts: Shifts[];
    usersList: AddUser[];

    subscription: Subscription[] = [];
    roleList: any;
    rolesArray:string[] = [];
    updateArray:string[] = [];
    roleError:boolean = false;
    stationList: any;
    showStationCode:boolean = false;
    status:any;
    allRoles:string[] = [];
    emptyStationError:boolean = false;
    t:number = 0;


    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private userService: AddUserService,
        private shiftsService: ShiftsService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router : Router
    ) {}

    ngOnInit() {
        this.updateUser = this.formBuilder.group({
           name:[
                    "", 
                    [
                        RxwebValidators.required({message:'This field is required!'}),
                        RxwebValidators.alpha({ message: "This will accept only alphabets!", allowWhiteSpace: true  }),
                    ]
                ],
           username:["", RxwebValidators.required({message:'This field is required!'})],
           email:[
                    "", 
                    [
                        RxwebValidators.required({message:'This field is required!'}),
                        RxwebValidators.email({message: "Email is not valid!" }),
                    ]
                ],
           empId:
           [
                    "", 
                    [
                        RxwebValidators.required({message:'This field is required!'}),
                        RxwebValidators.numeric({
                            acceptValue:NumericValueType.PositiveNumber,
                            allowDecimal:false,
                            message: "This will accept only Numbers!"
                        })
                    ]
            ],
           roles:[ this.rolesArray ],
           mobileNumber:
           [
               "", 
               [
                   RxwebValidators.required({message:'This field is required!'}),
                   RxwebValidators.pattern({
                        expression: { onlyDigit: /^[6-9]\d{9}$/ },
                        message: "Invalid mobile number!",
                }),
               ]
            ],

            stationCode: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            status:  this.status 
        });
        this.patchFormValue();
       
        this.userService.userList().subscribe((users) => {
            this.usersList = users;
        });
        
        
        this.subscription.push(
            this.userService.getRolesToAdd().subscribe((res) => {
                this.roleList = res["data"];      
            })  
        );

        //will populate DropDownList of station fetched from database
        this.subscription.push(
            this.userService.getAllStation().subscribe((res) => {
                this.stationList = res["data"];
            })
        );

        
        //will check all roles fetched from database
        let x:number = 0;
        for(x; x < this.userService.userData.roles.length; x++){
            if(this.userService.userData.roles[x].roleCode === "STN"){
                this.showStationCode = true;
                this.updateUser.controls["stationCode"].enable();
            }
            else{
                this.showStationCode = false;
                this.updateUser.controls["stationCode"].disable();
            }
           this.rolesArray.push(this.userService.userData.roles[x].roleCode);
           console.log('rolesArray onload => '+this.rolesArray);
        }

        let y:number = 0;
        for(y; y < this.rolesArray.length; y++){
            if(this.rolesArray[y] === "STN"){
                this.showStationCode = true;
                this.updateUser.controls["stationCode"].enable();
            }
        }
        this.updateArray = this.rolesArray;
        console.log('updateArray onload => '+this.updateArray);

        let z:number = 0;
        for(z; z < this.updateArray.length; z++){
            if(this.updateArray[z] === "STN"){
                this.showStationCode = true;
                this.updateUser.controls["stationCode"].enable();
            }
        }


    }//ngOnInit ends

    patchFormValue(){
        
        this.updateUser.patchValue({
            name: localStorage.getItem("data_name"),
            email: localStorage.getItem("data_email"),
            username: localStorage.getItem("data_username"),
            empId: localStorage.getItem("data_empId"),
            mobileNumber: localStorage.getItem("data_mobileNumber"),
            stationCode: localStorage.getItem("data_stationCode"),
        });
        
    }

    get fval(){
        return this.updateUser.controls;
    }
    

    //on change of roles on Checkbox it will CHECK or UNCHECK checkboxes
    onChange(e){
        if(e.target.checked){
            if(e.target.value === "STN"){
                this.showStationCode = true;
                this.updateUser.controls["stationCode"].enable();
            }
            else{
                this.showStationCode = false;
                this.updateUser.controls["stationCode"].disable();
            }
           this.rolesArray.push(e.target.value);
           console.log('rolesArray onChange if checked => '+ this.rolesArray);
        }
        else{
            this.showStationCode = false;
            this.updateUser.controls["stationCode"].disable();
            let i:number = 0;
            for(i; i < this.rolesArray.length; i++){
                if(this.rolesArray[i] == e.target.value){
                    this.rolesArray.splice(i,1);
                }
            }
        }
        this.updateArray = this.rolesArray;
        console.log('updateArray onChange => '+ this.updateArray);
        
        let z:number = 0;
        for(z; z < this.updateArray.length; z++){
            if(this.updateArray[z] === "STN"){
                this.showStationCode = true;
                this.updateUser.controls["stationCode"].enable();
            }
        }
    }

    //on canceling form it will navigate to userList
    cancel(){
        this.updateUser.disable();
        this.router.navigate(['user-manager/users/all/list']);
    }
    
    //on successfull validations this method will be called and send data to service file with updated JSON file
    //API is called from service file
    onSubmit() {
        
        this.submitted = true;
       if (this.updateUser.invalid){
           return Swal.fire({ icon: "error", text: "Please enter all fields!" });
       }
       if(this.rolesArray.length <= 0)
       {
           this.roleError = true;
           return Swal.fire({ icon: "error", text: "Please enter all fields!" });
       }
       else{
           for(this.t; this.t < this.rolesArray.length; this.t++){
               if(this.rolesArray[this.t] === "STN"){
                   
                   if(this.updateUser.controls["stationCode"].value === "undefined" ){
                       
                       this.emptyStationError = true;
                       return Swal.fire({ icon: "error", text: "Please enter all fields!" });
                   }
               }
           }
           
           this.spinner.show();
           this.updateUser.value.roles = this.updateArray;
           this.userService.updateUser(this.updateUser.value)
           .subscribe(
               (res:any) => {
                   if(res.status === "0"){
                       this.toastr.error(res.data);
                       this.spinner.hide();
                   }
                   else{
                       localStorage.removeItem("data_name");
                       localStorage.removeItem("data_username");
                       localStorage.removeItem("data_email");
                       localStorage.removeItem("data_empId");
                       localStorage.removeItem("data_mobileNumber");
                       localStorage.removeItem("data_stationCode");
                       setTimeout(() => {
                           /** spinner ends after 5 seconds */
                           this.spinner.hide();
                         }, 3000);
                       this.toastr.success(res.data);
                       this.updateUser.reset();
                       this.submitted = false;
                       
                       this.router.navigate(['user-manager/users/all/list']);
                   } 
               },
               (error) => {
                   this.errormsg = error;
                   this.spinner.hide();
                   this.toastr.error("Error!", this.errormsg, {
                       progressBar: true,
                   });
               }
           );
       }
   }
}
