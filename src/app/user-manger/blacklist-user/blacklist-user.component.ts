import { Component, OnInit } from "@angular/core";
import { AddUserService } from "../_services/add-user.service";
import { ToastrService } from "ngx-toastr";
@Component({
    selector: "app-blacklist-user",
    templateUrl: "./blacklist-user.component.html",
    styleUrls: ["./blacklist-user.component.scss"],
})
export class BlacklistUserComponent implements OnInit {
    public temp: Object = false;
    blacklist:any;
    constructor(private ADDUSER_API: AddUserService, private toastr: ToastrService) {}

    ngOnInit() {
        this.ADDUSER_API.getBlacklistUsers().subscribe((data) => {
            this.blacklist = data;
            this.temp = true;
        });
        this.ADDUSER_API.getBlacklistUsers().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.blacklist = res.data;
                this.temp = true;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }
}
