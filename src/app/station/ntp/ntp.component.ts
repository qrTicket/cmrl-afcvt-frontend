import { Component, OnInit, ViewChild } from '@angular/core';
import { NtpService} from '../_services/ntp.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-ntp',
  templateUrl: './ntp.component.html',
  styleUrls: ['./ntp.component.scss']
})
export class NtpComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
 dtElement: DataTableDirective;
 dtTrigger: Subject<any> = new Subject();
 searchTerm: any;
     ntp: any = [];

  constructor(private eventservice: NtpService, private http: HttpClient, private router: Router) { }
  dtOptions: DataTables.Settings = {};

  ngOnInit()
   {
    this.ntplist();     
  }

  ntplist()
  {
      this.eventservice.getntp().subscribe(data => {
          this.ntp = data;
          console.log(this.ntp,"NTP");
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
