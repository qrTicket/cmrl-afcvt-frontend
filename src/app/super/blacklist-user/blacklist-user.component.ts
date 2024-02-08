import { Component, OnInit } from "@angular/core";
import { AddUserService } from "../../user-manger/_services/add-user.service";
@Component({
    selector: "app-blacklist-user",
    templateUrl: "./blacklist-user.component.html",
    styleUrls: ["./blacklist-user.component.scss"],
})
export class BlacklistUserComponent implements OnInit {
    blacklist_users: any;
    public temp: Object = false;
    constructor(private addUser_API: AddUserService) {}

    ngOnInit() {
        this.addUser_API.getBlacklistUsers().subscribe((res) => {
            this.blacklist_users = res;
            this.temp = true;
        });
    }
}
