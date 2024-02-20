import { Component, OnInit } from "@angular/core";
import { Terminal } from "../_models/terminal.model";
import { TerminalService } from "../_services/terminal.service";
import { ToastrService } from "ngx-toastr";
@Component({
    selector: "app-terminal-list",
    templateUrl: "./terminal-list.component.html",
    styleUrls: ["./terminal-list.component.scss"],
})
export class TerminalListComponent implements OnInit {
    terminalList: Terminal[];
    temp: Boolean = false;
    successmsg;
    errormsg;
    constructor(
        private terminalAPI: TerminalService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        // this.terminalAPI.getTerminalList().subscribe(
        //     (data) => {
        //         // console.log(data, "Terminal");
        //         this.terminalList = data;
        //         this.temp = true;
        //         this.successmsg = data;
        //         this.toastr.success("", this.successmsg.message);
        //     },
        //     (error) => {
        //         // console.log(error);
        //         this.errormsg = error;
        //         this.toastr.error("", this.errormsg);
        //     }
        // );
        this.terminalAPI.getTerminalList().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.terminalList = res.data;
                this.temp = true;
                this.successmsg = res.data;
                this.toastr.success("", this.successmsg.message);
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }
}
