import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

import { LinesService } from "../../admin/_services/lines.service";
import { StationService } from "../../admin/_services/station.service";
import { AddUserService } from "../_services/add-user.service";
import { AddUser } from "../_models/addUser.model";
import { AssignUserService } from "../_services/assign-user.service";

@Component({
    selector: "app-assign-user",
    templateUrl: "./assign-user.component.html",
    styleUrls: ["./assign-user.component.scss"],
})
export class AssignUserComponent implements OnInit {
    assignUser: FormGroup;
    submitted = false;
    successmgs;
    errormsg;
    lines: any;
    stationList: any;
    userList: any[];
    //userList: AddUser[];
    currentval: any;
    selectedVal;
    roleValue: any;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,

        private lineService: LinesService,
        private stationService: StationService,
        private adduserService: AddUserService,
        private assignUserAPI: AssignUserService
    ) {}

    ngOnInit() {
        this.assignUser = this.formBuilder.group({
            user: [
                "",
                RxwebValidators.required({ message: "This field is required" }),
            ],
            line: [
                "",
                RxwebValidators.required({ message: "This field is required" }),
            ],
            station: [
                "",
                RxwebValidators.required({ message: "This field is required" }),
            ],
            role: [""],
        });
        // this.lineService.getLines().subscribe((list) => {
        //     this.lines = list;
        // });
        this.lineService.getLines().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.lines = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })


        // this.stationService.getStation().subscribe((list) => {
        //     this.stationList = list;
        // });
        this.stationService.getStation().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.stationList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })



        // this.adduserService.userList().subscribe((list) => {
        //     this.userList = list;
        // });
        this.adduserService.userList().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.userList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })


        this.assignUser.get("user").valueChanges.subscribe((res) => {
            this.currentval = res;
            this.roleValue = this.currentval.roles[0].name;
        });
        //  this.assignUser.get('role').setValue(this.currentval.roles[0].name);
    }

    onSubmit() {
        this.submitted = true;
        if (this.assignUser.invalid) return this.toastr.error("Invalid form!");
        this.spinner.show();
        // this.assignUserAPI.assignUser(this.assignUser.value).subscribe(
        //     (res) => {
        //         this.spinner.hide();
        //         this.successmgs = res;
        //         this.toastr.success("", this.successmgs.message);
        //         this.router.navigate(["user-manager/users/station/list"]);
        //     },
        //     (error) => {
        //         this.spinner.hide();
        //         // console.log(error);
        //         this.errormsg = error;
        //         this.toastr.error("", this.errormsg);
        //         this.router.onSameUrlNavigation = "reload";
        //     }
        // );
        // this.assignUser.reset();
        // this.submitted = false;

        this.assignUserAPI.assignUser(this.assignUser.value).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.spinner.hide();
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.spinner.hide();
                this.successmgs = res.data;
                this.toastr.success("", this.successmgs.message);
                this.router.navigate(["user-manager/users/station/list"]);
              }
            },
            error:(err)=>{
                //this.toastr.error(err.error.data,'Error!')
                this.spinner.hide();
                this.errormsg = err.error.data;
                this.toastr.error("", this.errormsg);
                this.router.onSameUrlNavigation = "reload";
            }
          })
    }
}
