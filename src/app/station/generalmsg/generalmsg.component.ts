import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralmsgService } from '../_services/generalmsg.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-generalmsg',
  templateUrl: './generalmsg.component.html',
  styleUrls: ['./generalmsg.component.scss']
})
export class GeneralmsgComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  searchTerm: any;
  generalmsg: any = [];

  constructor(
    private gnrlmsgservice: GeneralmsgService
  ) { }
  
  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.generalmsgList();
  }

  generalmsgList() {
    this.gnrlmsgservice.getGeneralMsg().subscribe(res => {
      this.generalmsg = res["data"];
      // console.log(this.generalmsg, "General Message");
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
      this.dtTrigger.next(true); // to rerender the table when next function is called 

    });
  }

  // to reload the data from datable when sorting or filtering function is called 

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(true);
    });
  }

}
