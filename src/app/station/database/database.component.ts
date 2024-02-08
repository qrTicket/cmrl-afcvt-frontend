import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../_services/database.service';

import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {


  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  searchTerm: any;
  database: any = [];

  constructor(private dbservice: DatabaseService, private http: HttpClient, private router: Router) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.databaselist();
  }

  databaselist() {
    this.dbservice.getdatabase().subscribe(data => {
      this.database = data;
      console.log(this.database, "ALARMs");
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
