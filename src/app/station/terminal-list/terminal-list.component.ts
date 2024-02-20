import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StationService } from "../_services/station.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-terminal-list',
  templateUrl: './terminal-list.component.html',
  styleUrls: ['./terminal-list.component.scss']
})
export class TerminalListComponent implements OnInit {
  terminalList: any;
  public temp: Boolean = false;
  
  constructor(
      private stationAPI: StationService,
      private router: Router,
      private toastr: ToastrService,
  ) { }

  ngOnInit() {
      // this.stationAPI.assignedTerminal().subscribe((res) => {
      //   if(res['status'] === "1"){
      //     this.temp = true;
      //     this.terminalList = res["data"];
      //     console.log(this.terminalList,'terminal List')
      // }
      // else if(res['status'] === "0"){
      //     this.toastr.error(res['data'])
      // }
      //     //this.terminalList = res["data"];
      //     //this.temp = true;
      // });
      this.stationAPI.assignedTerminal().subscribe({
        next:(res)=>{
          if(res.status === "0"){
              this.toastr.error(res.data,'Error!')
          }
          else if(res.status === "1"){
              this.temp = true;
              this.terminalList = res.data;
              console.log(this.terminalList,'terminal list')
          }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
      })
  }

  //navigate to raise complain page with device id
  raiseComplain(device_id){
      this.router.navigate(["/raisecomplaint", device_id]);
  }


}
