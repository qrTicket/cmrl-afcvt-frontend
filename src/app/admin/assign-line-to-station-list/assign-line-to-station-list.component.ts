import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LineToStation } from '../_models/linetostation.model';
import { LineToStationService } from '../_services/linetostation.service';


@Component({
  selector: 'app-assign-line-to-station-list',
  templateUrl: './assign-line-to-station-list.component.html',
  styleUrls: ['./assign-line-to-station-list.component.scss']
})
export class AssignLineToStationListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  linetostation: LineToStation [] = [];
  public linetostationData: Object;
  public temp: Object = false;
  searchTerm: any;

  constructor(
    private linetostationapi: LineToStationService,
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.linetostationlist();
  }

  linetostationlist() {
    this.linetostationapi.getLineToStation().subscribe(data => {
      this.linetostation = data;
      console.log(this.linetostation);
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
      this.dtTrigger.next(true);
    });
  }

}
