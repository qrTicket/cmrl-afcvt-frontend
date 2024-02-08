import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StationService } from "../_services/station.service";

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
      private router: Router
  ) { }

  ngOnInit() {
      this.stationAPI.assignedTerminal().subscribe((res) => {
          this.terminalList = res["data"];
          this.temp = true;
      });
  }

  //navigate to raise complain page with device id
  raiseComplain(device_id){
      this.router.navigate(["/raisecomplaint", device_id]);
  }


}
