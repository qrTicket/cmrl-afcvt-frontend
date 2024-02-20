import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StationService } from "../_services/station.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configured-terminal-list',
  templateUrl: './configured-terminal-list.component.html',
  styleUrls: ['./configured-terminal-list.component.scss']
})
export class ConfiguredTerminalListComponent implements OnInit {

  configuredterminalList: any;
  public temp: Boolean = false;
  
  constructor(
      private stationAPI: StationService,
      private router: Router,
      private toastr: ToastrService
  ) { }

  ngOnInit() {
      // this.stationAPI.configuredTerminal().subscribe((res) => {
      //     this.configuredterminalList = res["data"];
      //     this.temp = true;
      // });

      this.stationAPI.configuredTerminal().subscribe({
        next:(res)=>{
          if(res.status === "0"){
              this.toastr.error(res.data,'Error!')
          }
          else if(res.status === "1"){
            this.configuredterminalList = res.data;
            this.temp = true;
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
