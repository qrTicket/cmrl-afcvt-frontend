import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { AssignUserService } from "../_services/assign-user.service";
import { AssignUser } from "../_models/assign-user.model";
@Component({
    selector: "app-user-list",
    templateUrl: "./usertostation-list.component.html",
    styleUrls: ["./usertostation-list.component.scss"],
})
export class UserToStationListComponent implements OnInit {
    modalRef: BsModalRef;
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    public temp: Object = false;
    //AssignUserList: AssignUser[];
    AssignUserList: any[];
    toggle: Boolean = false;
    status = "Deactive";
    value: Boolean = false;
    successmsg:any;
    errormsg:any;

    constructor(
        private router: Router,
        private assignUserService: AssignUserService,
        private spinner: NgxSpinnerService,
        private toaster: ToastrService,
        private modalService: BsModalService
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.getAllUsers();
    }

    getAllUsers() {
        // this.assignUserService.assignUserList().subscribe(
        //     (list) => {
        //         this.spinner.hide();
        //         this.AssignUserList = list;
        //         this.temp = true;
        //     },
        //     (error) => {
        //         this.spinner.hide();
        //         // console.log(error);
        //     }
        // );
        this.assignUserService.assignUserList().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.spinner.hide();
                  this.toaster.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.spinner.hide();
                this.AssignUserList = res.data;
                this.temp = true;
              }
            },
            error:(err)=>{
                this.spinner.hide();
                this.toaster.error(err.error.data,'Error!')
            }
          })
    }

    update(id) {
        // console.log("ID", id);
        this.router.navigate(["user-manager/assign/user/update", id]);
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.config);
    }
    confirm(id) {
        this.spinner.show();
        // this.assignUserService.deleteAssignUser(id).subscribe(
        //     (res) => {
        //         this.spinner.hide();
        //         this.toaster.success("", "User Deleted Successfully!");
        //         this.getAllUsers();
        //         // this.assignUserService.assignUserList();
        //     },
        //     (error) => {
        //         this.spinner.hide();
        //         // console.log("Error", error);

        //         this.toaster.error("", "Unable to delete!");
        //     }
        // );
        this.assignUserService.deleteAssignUser(id).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.spinner.hide();
                  this.toaster.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.spinner.hide();
                this.toaster.success("", "User Deleted Successfully!");
                this.getAllUsers();
              }
            },
            error:(err)=>{
                this.spinner.hide();
                this.toaster.error(err.error.data,'Error!')
            }
          })

        this.modalRef.hide();
    }

    decline(): void {
        // console.log("Declined");

        this.modalRef.hide();
    }

    // deleteUser(id) {
    //     this.spinner.show();
    //     console.log("Assign user id", id);
    //     this.assignUserService.deleteAssignUser(id).subscribe(
    //         (res) => {
    //             this.spinner.hide();
    //             console.log("Deleted user", res);
    //             this.toaster.success("", "User Deleted Successfully!");
    //             this.getAllUsers();
    //             // this.assignUserService.assignUserList();
    //         },
    //         (error) => {
    //             this.spinner.hide();
    //             console.log("Error", error);

    //             this.toaster.error("", "Unable to delete!");
    //         }
    //     );
    // }
    changestatus(id) {
        this.spinner.show();
        // console.log(id);
        // this.assignUserService.trueStatus(id).subscribe(
        //     (res) => {
        //         // console.log("Status True", res);
        //         this.spinner.hide();
        //         this.successmsg = res;
        //         this.toaster.success("Active", this.successmsg.message);
        //         this.getAllUsers();
        //     },
        //     (error) => {
        //         this.spinner.hide();
        //         this.errormsg = error;
        //         // console.log(error);
        //         this.toaster.error("Deactive", this.errormsg);
        //     }
        // );
        this.assignUserService.trueStatus(id).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.spinner.hide();
                  this.toaster.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.spinner.hide();
                this.successmsg = res.data;
                this.toaster.success("Active", this.successmsg.message);
                this.getAllUsers();
              }
            },
            error:(err)=>{
                this.spinner.hide();
                this.errormsg = err.error.data;
                this.toaster.error("Deactive", this.errormsg);
                //this.toaster.error(err.error.data,'Error!')
            }
          })
    }
    // enabledesable(){
    //     // console.log(, "status");

    //     this.toggle = !this.toggle
    //     this.status = this.toggle? 'Deactive': 'Active'
    // }
}
