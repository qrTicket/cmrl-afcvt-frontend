import { Component, OnInit } from '@angular/core';
import { StationService } from '../_services/station.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-station-discount-list',
  templateUrl: './station-discount-list.component.html',
  styleUrls: ['./station-discount-list.component.scss']
})
export class StationDiscountListComponent implements OnInit {
  stationList: any[] = [];
  public temp: Object = false;
  errormsg: any;


  constructor(
    private stnSrv: StationService,
    private toaster: ToastrService
    ) {}

  ngOnInit() {
    this.stationDiscountlist();
  }

  stationDiscountlist() {
    this.stnSrv.getStationDiscountList().subscribe({
        next:(res)=>{
          if(res.status === "0"){
            this.toaster.error(res.data)
          }
          else if(res.status === "1"){
            this.stationList = res.data;
            this.temp = true;
          }
        },
        error:(err)=>{
            this.toaster.error(err.error.data,'Error!')
        }
      })
  }

}
