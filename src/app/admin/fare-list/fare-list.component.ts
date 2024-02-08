import { Component, OnInit, ViewChild } from '@angular/core';
import { FareService } from '../_services/fare.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fare-list',
  templateUrl: './fare-list.component.html',
  styleUrls: ['./fare-list.component.scss']
})
export class FareListComponent implements OnInit {


  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  farelist: any;

  constructor(
    private fareService: FareService
  ) { }
  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.fareList();
  }

  fareList() {
    this.fareService.getFareList().subscribe(res => {
      this.farelist = res["data"];
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
      this.dtTrigger.next(true);
    });
  }


}
