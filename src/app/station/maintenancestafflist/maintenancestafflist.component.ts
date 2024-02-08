import { Component, OnInit, ViewChild } from '@angular/core';
import {MaintenancestaffService} from '../_services/maintenancestaff.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-maintenancestafflist',
  templateUrl: './maintenancestafflist.component.html',
  styleUrls: ['./maintenancestafflist.component.scss']
})
export class MaintenancestafflistComponent implements OnInit {

   
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
 dtElement: DataTableDirective;
 dtTrigger: Subject<any> = new Subject();
 searchTerm: any;
     mStaff: any = [];

  constructor(private MSservice: MaintenancestaffService, private http: HttpClient, private router: Router) { }
  
  dtOptions: DataTables.Settings = {};

  ngOnInit()
   {
      this.mStafflist ();     
   }

   mStafflist()
  {
      this.MSservice.getMantenanceStaffList().subscribe(data => {
          this.mStaff = data;
          console.log(this.mStaff,"maintenance Staff list");
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
