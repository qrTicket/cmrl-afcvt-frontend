import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StationService } from "../_services/station.service";

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
      private router: Router
  ) { }

  ngOnInit() {
      this.stationAPI.configuredTerminal().subscribe((res) => {
          this.configuredterminalList = res["data"];
          this.temp = true;
      });
  }

  //navigate to raise complain page with device id
  raiseComplain(device_id){
      this.router.navigate(["/raisecomplaint", device_id]);
  }

}
