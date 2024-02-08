import { Component, OnInit } from "@angular/core";
// import { fadeInAnimation } from "../../_animations/fadeIn.animation";
import { NgxSpinnerService } from "ngx-spinner";
import { SuperService } from "../_superservices/super.service";
import { AddUserService } from "../../user-manger/_services/add-user.service";
@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
    // animations: [fadeInAnimation],
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    rejectCount: number;
    verifiedCount: number;
    count: number;
    blacklistCount: any;

    constructor(
        private superAPI: SuperService,
        private spinner: NgxSpinnerService,
        private addUser_API: AddUserService
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.superAPI.rejectedUserList().subscribe(
            (res) => {
                this.spinner.hide();
                this.rejectCount = res.length;
                // console.log(this.rejectCount, "count");
            },
            (error) => {
                // console.log(error);
            }
        );
        this.superAPI.getUserList().subscribe((res) => {
            this.spinner.hide();
            this.verifiedCount = res.length;
            // console.log(res, "verified");

        });
        this.addUser_API.getBlacklistUsers().subscribe((res) => {
            // console.log(res, "blacklist");

            this.blacklistCount = res;
            this.count = this.blacklistCount.length;
            // console.log(this.count);

        });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
