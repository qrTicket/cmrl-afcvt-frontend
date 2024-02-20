import { Component, OnInit, ViewChild } from '@angular/core';
import { NtpService} from '../_services/ntp.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private eventservice: NtpService, private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  dtOptions: DataTables.Settings = {};

  ngOnInit()
   {
    this.ntplist();     
  }

  ntplist()
  {
  //     this.eventservice.getntp().subscribe(data => {
  //         this.ntp = data;
  //         console.log(this.ntp,"NTP");
  //         this.dtOptions = {
  //       pagingType: 'full_numbers',
  //       pageLength: 5,
  //       processing: true
  //     };
  //     this.dtTrigger.next(true); // to rerender the table when next function is called 
     
  // });
  this.eventservice.getntp().subscribe({
    next:(res)=>{
      if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
      }
      else if(res.status === "1"){
        this.ntp = res.data
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true
        };
        this.dtTrigger.next(true); // to rerender the table when next function is called
      }
    },
    error:(err)=>{
        this.toastr.error(err.error.data,'Error!')
    }
  })
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
