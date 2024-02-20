import { Component, OnInit, ViewChild  } from '@angular/core';
import { StationService } from '../_services/station.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-station-panel',
  templateUrl: './station-panel.component.html',
  styleUrls: ['./station-panel.component.scss']
})
export class StationPanelComponent implements OnInit {

  station: any = [];
  public stationData: Object;
  public temp: Object = false;
  searchTerm: any;
  submitted = false;


  constructor(
    private stationService: StationService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.stationlist();
  }
  stationlist() {
    // this.stationService.getStation().subscribe(data => {
    //   this.station = data;
    //   console.log(this.station);
    // });
    this.stationService.getStation().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.station = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
