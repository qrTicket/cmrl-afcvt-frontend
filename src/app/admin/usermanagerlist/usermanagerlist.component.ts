import { Component, OnInit, TemplateRef, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import { unique } from "@rxweb/reactive-form-validators";
import { AddUsermanager } from "../_models/add-usermanager.model";
import { AddUsermanagerService } from "../_services/add-usermanager.service";


@Component({
  selector: 'app-usermanagerlist',
  templateUrl: './usermanagerlist.component.html',
  styleUrls: ['./usermanagerlist.component.scss']
})
export class UsermanagerlistComponent implements OnInit {

  //@ViewChild("check",{static: false}) el_check: ElementRef;
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
  //userList: AddUsermanager[];
  userList: any[];
  rolesArray:String[] = [];
  statusArray:any[] = [];
  check:boolean = false;
  chkBoxValue:any;
  statusValue: number;

  constructor(
      private router: Router,
      private spinner: NgxSpinnerService,
      private toaster: ToastrService,
      private modalService: BsModalService,
      private userService: AddUsermanagerService,
      private toastr: ToastrService,
  ) {}

  ngOnInit() {
      this.spinner.show();
      this.getAllUsers();
  }

  getAllUsers() {
    //   this.userService.userList().subscribe(
    //       (res) => {
    //           this.spinner.hide();
    //           this.userList = res["data"];
    //           this.temp = true;
    //           this.userList = res["data"];
    //           //console.log(this.userList);
    //           this.userList.forEach((user) => {
    //               user.concanatedRoleCode = "";
    //               user.roles.forEach((role) => {
    //                   user.concanatedRoleCode = user.concanatedRoleCode + " "+role.roleCode+","; 
    //               });
    //           })
              
    //       },
    //       (error) => {
    //           this.spinner.hide();
    //           // console.log(error);
    //       }
    //   );
      this.userService.userList().subscribe({
        next:(res:any)=>{
          if(res.status === "0"){
              this.toastr.error(res.data,'Error!')
          }
          else if(res.status === "1"){
            this.spinner.hide();
            this.userList = res.data;
            this.temp = true;
            this.userList.forEach((user) => {
                user.concanatedRoleCode = "";
                user.roles.forEach((role) => {
                    user.concanatedRoleCode = user.concanatedRoleCode + " "+role.roleCode+","; 
                });
            })
          }
        },
        error:(err)=>{
            this.spinner.hide();
            this.toastr.error(err.error.data,'Error!')
        }
      })
  }
  //update user profile function
  update(user:any) {
      console.log("data  => " + user);
      console.log(user);
      this.userService.getUserUpdateData(user);
     this.router.navigate(["admin/usermanager/update"]);
  }

  openModal(templateDeactivate: TemplateRef<any>, templateActive: TemplateRef<any>, e) {
      console.log("checked value => "+e.target.value);
      //incoming 0
      if(e.target.value === "0" ){
          this.modalRef = this.modalService.show(templateActive, this.config);
          this.statusValue = 1;
          e.target.checked = false;
      }
      //incoming 1
      else if(e.target.value === "1"){
          this.modalRef = this.modalService.show(templateDeactivate, this.config);
          this.statusValue = 0;
          e.target.checked = true;
      }
      //incoming 2
      else{
          this.modalRef = this.modalService.show(templateActive, this.config);
          this.statusValue = 1;
          e.target.checked = true;
      }
  }
  confirm(username: string, status:number) {
      this.spinner.show();
      this.modalRef.hide();
    //   this.userService.statusUpdate(username, this.statusValue).subscribe(
    //       (res) => {
    //           //console.log(res);
    //           if(res.status==="1"){
    //             this.spinner.hide();
    //             //this.toaster.success("", "User status updated successfully");
    //             this.toaster.success("", res.data);
    //             this.getAllUsers();
    //           }else{
    //             this.spinner.hide();
    //             this.toaster.error("",res.data);
    //             this.getAllUsers();
    //           }
              
    //       },
    //       (error) => {
    //           this.spinner.hide();
    //           this.errormsg = error;
    //           this.modalRef.hide();
    //           this.toaster.error("", this.errormsg);
    //       });

          this.userService.statusUpdate(username, this.statusValue).subscribe({
            next:(res)=>{
              if(res.status === "0"){
                this.spinner.hide();
                this.toaster.error("",res.data);
                this.getAllUsers();
              }
              else if(res.status === "1"){
                this.spinner.hide();
                this.toaster.success("", res.data);
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
    

      this.modalRef.hide();
  }

  decline() {
      this.modalRef.hide();
      this.getAllUsers();
  }

  openBlacklistModel(blacklist_user: TemplateRef<any>) {
      this.modalRef = this.modalService.show(blacklist_user, this.config);
  }
  blacklist(id:any) {
      this.spinner.show();
      this.modalRef.hide();
    //   this.userService.userBlacklist(id).subscribe(
    //       (res) => {
    //           this.spinner.hide();
    //           this.successmsg = res;
    //           this.toaster.success("", this.successmsg.message);
    //           this.getAllUsers();
    //       },
    //       (error) => {
    //           this.spinner.hide();
    //           this.errormsg = error;
    //           this.modalRef.hide();
    //           this.toaster.error("", this.errormsg);
    //       }
    //   );
      this.userService.userBlacklist(id).subscribe({
        next:(res)=>{
          if(res.status === "0"){
              this.toastr.error(res.data,'Error!')
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
      this.subscription.forEach( subs => subs.unsubscribe())
  }

}
