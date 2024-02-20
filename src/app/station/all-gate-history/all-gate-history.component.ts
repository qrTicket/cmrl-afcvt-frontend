import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GateConfig } from "../_model/gate-config.model";
import { StationService } from "../_services/station.service";
import { FormGroup } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-gate-history',
  templateUrl: './all-gate-history.component.html',
  styleUrls: ['./all-gate-history.component.scss']
})
export class AllGateHistoryComponent implements OnInit {

  public temp: Boolean = false;
  allGateHistoryList: GateConfig[];
  data: any;
  successmsg: any;
  error: any;
  subscriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private stationAPI: StationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    // this.stationAPI.getAllGateHistory().subscribe((res) => {
    //   this.allGateHistoryList = res['data'];
    //   this.temp = true;
    // });

    this.stationAPI.getAllGateHistory().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.allGateHistoryList = res.data;
          this.temp = true;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  

  ngOnDestroy() {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }

}
