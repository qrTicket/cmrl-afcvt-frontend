import { Component, OnInit } from "@angular/core";
import { SuperService } from "../_superservices/super.service";
import { UserList } from "../_Models/userlist.model";

@Component({
    selector: "app-rejected-user",
    templateUrl: "./rejected-user.component.html",
    styleUrls: ["./rejected-user.component.scss"],
})
export class RejectedUserComponent implements OnInit {
    public temp: Object = false;
    rejectedList: UserList[];
    constructor(private superAPI: SuperService) {}

    ngOnInit() {
        this.superAPI.rejectedUserList().subscribe((res) => {
            this.rejectedList = res;
            this.temp = true;
        });
    }
}
