import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../_services/events.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  searchTerm: any;
  events: any = [];
  constructor(
    private eventservice: EventsService,
    private toastr: ToastrService,
  ) { }
  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.eventsList();
  }

  eventsList() {
    // this.eventservice.getEvents().subscribe(res => {
    //   this.events = res["data"];
    //   // console.log(this.events, "Events");
    //   this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 5,
    //     processing: true
    //   };
    //   this.dtTrigger.next(true); // to rerender the table when next function is called 

    // });
    this.eventservice.getEvents().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.events = res.data
          // console.log(this.events, "Events");
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
