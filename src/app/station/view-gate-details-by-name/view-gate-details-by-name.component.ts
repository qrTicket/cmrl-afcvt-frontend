import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GateConfig } from "../_model/gate-config.model";
import { StationService } from "../_services/station.service";
import { FormGroup } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-view-gate-details-by-name',
  templateUrl: './view-gate-details-by-name.component.html',
  styleUrls: ['./view-gate-details-by-name.component.scss']
})
export class ViewGateDetailsByNameComponent implements OnInit {

  public temp: Boolean = false;
  detailsByGateNameList: GateConfig[];
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
     
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }


}
