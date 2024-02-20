import { Component, OnInit, OnDestroy } from "@angular/core";

import { AddUserService } from "../_services/add-user.service";
import { ShiftsService } from "../_services/shifts.service";
import { Subscription } from "rxjs";
import { AddUser } from "../_models/addUser.model";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
    subscription: Subscription[] = [];
    totaluserList: any[];
    totalshiftList: any[];

    userCount: any;
    shiftCount: number;

    constructor(
        private userAPI: AddUserService,
        private shiftAPI: ShiftsService,
        private toastr:ToastrService
    ) {}

    ngOnInit() {
        this.totaluserlist();
        this.totalusershiftlist();
    }

    totaluserlist() {
        this.subscription.push(
            // this.userAPI.userCount().subscribe((res) => {
            //     if(res["status"] === "1"){
            //         this.userCount = res["data"];
            //     }
            //     else{
            //         this.userCount = "Error fetching User count";
            //     }
            // })
            this.userAPI.userCount().subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                      this.toastr.error(res.data,'Error fetching User count!')
                  }
                  else if(res.status === "1"){
                    this.userCount = res.data;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
    }

    totalusershiftlist() {
        this.subscription.push(
            // this.shiftAPI.shiftCount().subscribe((res) => {
            //     this.shiftCount = res["data"];
            // })
            this.shiftAPI.shiftCount().subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                      this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.shiftCount = res.data;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
    }

    ngOnDestroy() {
        this.subscription.forEach((subs) => subs.unsubscribe());
    }
}
