import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "app-user-manger",
    templateUrl: "./user-manger.component.html",
    styleUrls: ["./user-manger.component.scss"],
})
export class UserMangerComponent implements OnInit {
    collapedSideBar: boolean;
    constructor( private router: Router) {}

    ngOnInit() {}
    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
    Logout() {
        localStorage.removeItem("userToken");
        this.router.navigate(["/login"]);
    }
}
