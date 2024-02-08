import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StationService } from "../_services/station.service";

@Component({
  selector: 'app-other-list',
  templateUrl: './other-list.component.html',
  styleUrls: ['./other-list.component.scss']
})
export class OtherListComponent implements OnInit {

  otherList: any;
  public temp: Boolean = false;
  
  constructor(
      private stationAPI: StationService,
      private router: Router
  ) { }

  ngOnInit() {
      this.stationAPI.otherEquipment().subscribe((res) => {
          this.otherList = res["data"];
          this.temp = true;
      });
  }

  //navigate to raise complain page with device id
  raiseComplain(device_id){
      this.router.navigate(["/raisecomplaint", device_id]);
  }

}
