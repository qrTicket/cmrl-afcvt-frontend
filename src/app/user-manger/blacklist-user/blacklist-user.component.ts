import { Component, OnInit } from "@angular/core";
import { AddUserService } from "../_services/add-user.service";
@Component({
    selector: "app-blacklist-user",
    templateUrl: "./blacklist-user.component.html",
    styleUrls: ["./blacklist-user.component.scss"],
})
export class BlacklistUserComponent implements OnInit {
    public temp: Object = false;
    blacklist:any;
    constructor(private ADDUSER_API: AddUserService) {}

    ngOnInit() {
        this.ADDUSER_API.getBlacklistUsers().subscribe((data) => {
            this.blacklist = data;
            this.temp = true;
        });
    }
}
