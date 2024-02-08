import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { StationService } from "../../_services/station.service";
//import { Station } from "src/app/admin/_models/station.model";
import { GeneralmsgService } from "../../_services/generalmsg.service";
import { Subscription } from "rxjs";
import { interval } from "rxjs";
import { AuthService } from "src/app/_services/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    username;
    stationList: any = [];
    // public temp: Boolean = false;
    stationName: any;

    constructor(
        private translate: TranslateService,
        public router: Router,
        private stationNameService: StationService,
        private authService: AuthService
    ) {
        this.router.events.subscribe((val) => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = "push-right";
        this.username = JSON.parse(localStorage.getItem("currentUser"));
        this.stationNameList();
    }

    stationNameList() {
        this.stationNameService.getStationName().subscribe((res) => {
            // this.stationList = res["data"].stationList;
            this.stationName = res.data.stationName;
        });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector("body");
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector("body");
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        // localStorage.removeItem("isLoggedin");
        this.authService.logout();
        this.router.navigate(["/login"]);
    }
}
