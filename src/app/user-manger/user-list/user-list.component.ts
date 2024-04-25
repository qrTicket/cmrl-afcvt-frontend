import { Component, OnInit, TemplateRef, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddUserService } from "../_services/add-user.service";
import { AddUser } from "../_models/addUser.model";
import { Subscription } from "rxjs";
import { unique } from "@rxweb/reactive-form-validators";
import { updateStatus } from "../_models/updateStatus.model";
import Swal from "sweetalert2";
//import swal from 'sweetalert';
import { NumberSymbol } from "@angular/common";

@Component({
    selector: "app-user-list",
    templateUrl: "./user-list.component.html",
    styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit,OnDestroy {
    modalRef: BsModalRef;
    subscription: Subscription[] = [];
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    public temp: Object = false;

    toggle: Boolean = false;
    status = "Deactive";
    value: Boolean = false;
    successmsg:any;
    errormsg:any;
    //userList: AddUser[];
    userList: any[];
    rolesArray:String[] = [];
    statusArray:any[] = [];
    check:boolean = false;
    chkBoxValue:any;
    statusValue: number;
    allRoles:string[] = [];
    concanatedRoleCode2:String = "";
    hideEditBtn:boolean = true;
    successStatus:number = 0;
    

    constructor(
        private router: Router,
        private spinner: NgxSpinnerService,
        private toaster: ToastrService,
        private modalService: BsModalService,
        private userService: AddUserService
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.getAllUsers();

        
    }

    //this function will fetch all user-list on load-time
    getAllUsers() {
        // this.userService.userList().subscribe(
        //     (res) => {
        //         this.spinner.hide();
        //         this.userList = res["data"];
        //         this.temp = true;
        //         this.userList = res["data"];

        //         this.userList.forEach((user) => {
        //             //creating a string variable to store all roles in the form of string [e.g user.concanatedRoleCode = "";]
        //             user.concanatedRoleCode = "";
        //             user.roles.forEach((role) => {
        //                 user.concanatedRoleCode = user.concanatedRoleCode + ""+role.roleCode+","; 
        //             });
        //         })
        //     },
        //     (error) => {
        //         this.spinner.hide();
        //     }
        // );
        this.userService.userList().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.spinner.hide();
                  this.toaster.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.spinner.hide();
                this.userList = res.data;
                this.temp = true;
                this.userList.forEach((user) => {
                    //creating a string variable to store all roles in the form of string [e.g user.concanatedRoleCode = "";]
                    user.concanatedRoleCode = "";
                    user.roles.forEach((role) => {
                        user.concanatedRoleCode = user.concanatedRoleCode + ""+role.roleCode+","; 
                    });
                })
              }
            },
            error:(err)=>{
                this.spinner.hide();
                this.toaster.error(err.error.data,'Error!')
            }
          })
        
    }





    //update user profile
    update(user:any, roles:any) {
        console.log(roles,'roles in update func');
        console.log(user,'user in update func');
        
        //roles which have been fetched are in the form of String, 
        //so split that string and store in allRoles array in order to prevent 
        //user-manager from editing ADMIN or USER-MANAGER data
        // this.allRoles = roles.split(",");
        this.allRoles = roles;

        //applying a loop to check whether fetched roles contains ADMIN(ADM) or USER-MANAGER(USM) role
        let x:number = 0;
        for(x; x < this.allRoles.length; x++){
            if(this.allRoles[x] == "ADM" || this.allRoles[x] == "USM"){
                return Swal.fire({ icon:"error", text: "You CANNOT Edit/Update ADMIN or USER-MANAGER data" });
            }
            // else{
            //     this.addUserAPI.getUserUpdateData(user);
            //     this.router.navigate(["user-manager/user/update"]);
            // }
        }
        this.userService.getUserUpdateData(user, roles);
        // this.router.navigate(["user-manager/user/update"],{queryParams:{"userData" : user}, skipLocationChange:true});
        this.router.navigate(["user-manager/user/update"])
        
    }

    openModal(templateDeactivate: TemplateRef<any>, templateActive: TemplateRef<any>, e) {
        console.log("checked value => "+e.target.value);
        //incoming target value 0
        if(e.target.value === "0" ){
            // this.modalRef = this.modalService.show(templateActive, this.config);
            // this.statusValue = 1;
            // if(this.successStatus === 1){
            //     e.target.checked = true;
            // }
            // else{
            //     e.target.checked = false;
            // }
            this.modalRef = this.modalService.show(templateDeactivate, this.config);
            this.statusValue = 0;
        }
        //incoming target value 1
        else if(e.target.value === "1"){
            // this.modalRef = this.modalService.show(templateDeactivate, this.config);
            // this.statusValue = 0;
            // if(this.successStatus === 1){
            //     e.target.checked = false;
            // }
            // else{
            //     e.target.checked = true;
            // }
            this.modalRef = this.modalService.show(templateActive, this.config);
            this.statusValue = 1;
        }
        //incoming target value 2
        // else{
        //     this.modalRef = this.modalService.show(templateActive, this.config);
        //     this.statusValue = 1;
        //     if(this.successStatus === 1){
        //         e.target.checked = true;
        //     }
        //     else{
        //         e.target.checked = false;
        //     }
        // }
    }


    //update user details
    confirm(username: string,status:any) {
        this.spinner.show();
        this.modalRef.hide();
        // this.userService.statusUpdate(username, this.statusValue).subscribe(
        //     (res) => {
        //         this.spinner.hide();
        //         this.toaster.success("", "User status updated successfully");
        //         this.getAllUsers();
        //     },
        //     (error) => {
        //         this.spinner.hide();
        //         this.errormsg = error;
        //         this.modalRef.hide();
        //         this.toaster.error("", this.errormsg);
        //     });
            this.userService.statusUpdate(username, this.statusValue).subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                    this.spinner.hide();
                    this.toaster.error(res.data)
                  }
                  else if(res.status === "1"){
                    this.spinner.hide();
                    this.toaster.success("", "User status updated successfully");
                    this.getAllUsers();
                  }
                },
                error:(err)=>{
                    //this.toastr.error(err.error.data,'Error!')
                    this.spinner.hide();
                    this.errormsg = err.error.data;
                    this.modalRef.hide();
                    this.toaster.error("", this.errormsg);
                }
              })

        // this.addUserAPI.deleteUser(id).subscribe(
        //     (res) => {
        //         this.spinner.hide();
        //         this.toaster.success("", "Record deleted Successfully!");
        //         this.getAllUsers();
        //     },
        //     (error) => {
        //         this.spinner.hide();
        //         this.errormsg = error;
        //         this.modalRef.hide();
        //         this.toaster.error("", this.errormsg);
        //     }
        // );

        this.modalRef.hide();
    }

    decline() {
        this.modalRef.hide();
    }

    openBlacklistModel(blacklist_user: TemplateRef<any>) {
        this.modalRef = this.modalService.show(blacklist_user, this.config);
    }
    blacklist(id) {
        this.spinner.show();
        this.modalRef.hide();
        // this.userService.userBlacklist(id).subscribe(
        //     (res) => {
        //         this.spinner.hide();
        //         this.successmsg = res;
        //         this.toaster.success("", this.successmsg.message);
        //         this.getAllUsers();
        //     },
        //     (error) => {
        //         this.spinner.hide();
        //         this.errormsg = error;
        //         this.modalRef.hide();
        //         this.toaster.error("", this.errormsg);
        //     }
        // );
        this.userService.userBlacklist(id).subscribe({
            next:(res)=>{
              if(res.status === "0"){
                this.spinner.hide();
                this.toaster.error(res.data)
              }
              else if(res.status === "1"){
                this.spinner.hide();
                this.successmsg = res;
                this.toaster.success("", this.successmsg.message);
                this.getAllUsers();
              }
            },
            error:(err)=>{
                this.spinner.hide();
                this.errormsg = err.error.data;
                this.modalRef.hide();
                this.toaster.error("", this.errormsg);
            }
          })
    }
    notBlacklist(): void {
        // console.log("Not blacklist");

        this.modalRef.hide();
    }



    ngOnDestroy(){
        this.subscription.forEach( subs => subs.unsubscribe());
        // let x:number = 0;
        // for(x; x < this.allRoles.length; x++){
        //     this.allRoles.splice(x);
        // }
        console.log('in ng on destroy');
        
    }
}
