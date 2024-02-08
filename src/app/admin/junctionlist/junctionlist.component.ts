import { Component, OnInit, ViewChild } from '@angular/core';
import { StationService } from '../_services/station.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Station } from '../_models/station.model';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-junctionlist',
  templateUrl: './junctionlist.component.html',
  styleUrls: ['./junctionlist.component.scss']
})
export class JunctionlistComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  //junction: Station[] = [];
  junction: any[] = [];
  public junctionData: Object;
  public temp: Object = false;
  searchTerm: any;
  submitted = false;
  error: string;

  constructor(
    private stationService: StationService,
    private http: HttpClient,
    private router: Router
  ) { }
  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.junctionlist();
  }

  junctionlist() {
    this.stationService.getJunction().subscribe(data => {
      this.junction = data;
      console.log(this.junction);
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
      this.dtTrigger.next(true);
    });
  }

}
