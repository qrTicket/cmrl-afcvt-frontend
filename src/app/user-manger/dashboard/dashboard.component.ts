import { Component, OnInit, OnDestroy } from "@angular/core";

import { AddUserService } from "../_services/add-user.service";
import { ShiftsService } from "../_services/shifts.service";
import { Subscription } from "rxjs";
import { AddUser } from "../_models/addUser.model";

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
        private shiftAPI: ShiftsService
    ) {}

    ngOnInit() {
        this.totaluserlist();
        this.totalusershiftlist();
    }

    totaluserlist() {
        this.subscription.push(
            this.userAPI.userCount().subscribe((res) => {
                if(res["status"] === "1"){
                    this.userCount = res["data"];
                }
                else{
                    this.userCount = "Error fetching User count";
                }
            })
        );
    }

    totalusershiftlist() {
        this.subscription.push(
            this.shiftAPI.shiftCount().subscribe((res) => {
                this.shiftCount = res["data"];
            })
        );
    }

    ngOnDestroy() {
        this.subscription.forEach((subs) => subs.unsubscribe());
    }
}
