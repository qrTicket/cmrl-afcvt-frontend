import { Component, OnInit, ViewChild  } from '@angular/core';
import { StationService } from '../_services/station.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.stationlist();
  }
  stationlist() {
    this.stationService.getStation().subscribe(data => {
      this.station = data;
      console.log(this.station);
    });
  }

}
