import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

import { LinesService } from "../../admin/_services/lines.service";
import { StationService } from "../../admin/_services/station.service";
import { AddUserService } from "../_services/add-user.service";
import { AddUser } from "../_models/addUser.model";
import { AssignUserService } from "../_services/assign-user.service";
import { AssignUser } from "../_models/assign-user.model";

@Component({
    selector: "app-update-assign-user",
    templateUrl: "./update-assign-user.component.html",
    styleUrls: ["./update-assign-user.component.scss"],
})
export class UpdateAssignUserComponent implements OnInit {
    updateAssignUser: FormGroup;
    submitted = false;
    successmgs:any;
    errormsg:any;
    lines: any;
    stationList: any;
    //userList: AddUser[];
    userList: any[];
    currentval: any;
    selectedVal:any;
    roleValue: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,

        private lineService: LinesService,
        private stationService: StationService,
        private adduserService: AddUserService,
        private assignUserAPI: AssignUserService
    ) {}

    ngOnInit() {
        this.updateAssignUser = this.formBuilder.group({
            id: [""],
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
            roles: [""],
            createdDate:[""]
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

        // this.updateAssignUser.get("user").valueChanges.subscribe((res) => {
        //     this.currentval = res;
        //     console.log(this.currentval);
        //     this.roleValue = this.currentval.roles[0].name;
        //     console.log(this.roleValue);
        // });
        this.route.paramMap.subscribe((params) => {
            const Id = +params.get("id");
            if (Id) {
                this.getUserById(Id);
            }
        });
    }
    getUserById(id:any) {
        // this.assignUserAPI.assignUserById(id).subscribe(
        //     (updatedData: AssignUser) => {
        //         this.updateAssignData(updatedData);
        //     },
        //     (error) => {
        //         // console.log(error);
        //     }
        // );
        this.assignUserAPI.assignUserById(id).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.updateAssignData(res.data);
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }

    updateAssignData(update: AssignUser) {
        this.updateAssignUser.patchValue({
            id: update.id,
            // roles: update.user.roles[0].name,
            user: update.user.id,
            line: update.line.id,
            station: update.station.id,
            status: update.status,
            createdDate: update.createdDate,
        });
    }

    onSubmit() {
        this.spinner.show();
        this.submitted = true;
        if (this.updateAssignUser.invalid)
            return this.toastr.error("", "Invalid Forms");
        // console.log("Users DATA", this.updateAssignUser.value);
        // this.assignUserAPI.updateAssignedUser(this.updateAssignUser.value,this.updateAssignUser.value.id)
        //     .subscribe(
        //         (res) => {
        //             this.spinner.hide();
        //             this.successmgs = res;
        //             this.toastr.info("", this.successmgs.message);
        //             this.submitted = false;
        //             this.updateAssignUser.reset();
        //         },
        //         (error) => {
        //             this.spinner.hide();
        //             this.errormsg = error;
        //             this.toastr.error("", this.errormsg);
        //         }
        //     );
            this.assignUserAPI.updateAssignedUser(this.updateAssignUser.value,this.updateAssignUser.value.id).subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                      this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.spinner.hide();
                    this.successmgs = res.data;
                    this.toastr.info("", this.successmgs.message);
                    this.submitted = false;
                    this.updateAssignUser.reset();
                  }
                },
                error:(err)=>{
                    //this.toastr.error(err.error.data,'Error!')
                    this.spinner.hide();
                    this.errormsg = err.error.data;
                    this.toastr.error("", this.errormsg);
                }
              })
    }
}
