import { Component, OnInit, TemplateRef, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { ShiftsService } from "../../_services/shifts.service";
import { Shifts } from "../../_models/shifts.model";
import { Subscription } from "rxjs";
@Component({
    selector: "app-shifts-list",
    templateUrl: "./shifts-list.component.html",
    styleUrls: ["./shifts-list.component.scss"],
})
export class ShiftsListComponent implements OnInit, OnDestroy {
    modalRef: BsModalRef;
    subscription: Subscription[]=[];
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    public temp: Object = false;
    successmsg;
    errormsg;
    shiftList: Shifts[];
    constructor(
        private shiftAPI: ShiftsService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toaster: ToastrService,
        private modalService: BsModalService
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.subscription.push(  
            // this.shiftAPI.getAllShifts().subscribe(
            //     (list) => {
            //         this.shiftList = list["data"];
            //         this.temp = true;
            //         this.spinner.hide();
            //     },
            //     (error) => {
            //         this.spinner.hide();
            //     }
            // )
            this.shiftAPI.getAllShifts().subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                    this.spinner.hide();
                      this.toaster.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.spinner.hide();
                    this.shiftList = res.data;
                    this.temp = true;
                  }
                },
                error:(err)=>{
                    this.spinner.hide();
                    this.toaster.error(err.error.data,'Error!')
                }
              })
            )//subscription ends
    }
    update(id) {
        // console.log("ID", id);
        this.router.navigate(["user-manager/shifts/update", id]);
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.config);
    }
    confirm(id, index) {
        this.spinner.show();
      this.subscription.push(  
        // this.shiftAPI.getDelete(id).subscribe(
        //     (res) => {
        //         this.successmsg = res["data"];
        //         this.spinner.hide();
        //         this.shiftList.splice(index, 1);
        //         this.toaster.success("", this.successmsg);
        //         this.shiftAPI.getAllShifts();
        //     },
        //     (error) => {
        //         this.spinner.hide();

        //         this.toaster.error("", "Unable to Delete!");
        //     }
        // )
        this.shiftAPI.getDelete(id).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.spinner.hide();
                  this.toaster.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.successmsg = res.data;
                this.spinner.hide();
                this.shiftList.splice(index, 1);
                this.toaster.success("", this.successmsg);
                this.shiftAPI.getAllShifts();
              }
            },
            error:(err)=>{
                this.spinner.hide();
                this.toaster.error(err.error.data,'Error!')
            }
          })
        );
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }

    ngOnDestroy(){
        this.subscription.forEach(subs => subs.unsubscribe())
    }
}
