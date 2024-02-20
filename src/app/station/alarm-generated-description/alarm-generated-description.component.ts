import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AlarmService } from '../_services/alarm.service';
import { timer, Observable, Subject, of } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alarm-generated-description',
  templateUrl: './alarm-generated-description.component.html',
  styleUrls: ['./alarm-generated-description.component.scss']
})
export class AlarmGeneratedDescriptionComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  searchTerm: any;
  alarms: any = [];
  dataRefresher: any;

  constructor(
    private alarmgapi: AlarmService,
    private toastr:ToastrService
  ) { }

  dtOptions: DataTables.Settings = {};
  private killTrigger: Subject<void> = new Subject();
  // private fetchData$: Observable<string> = this.alarmgapi.getAllalarm();


  ngOnInit() {
    this.alarmsList();
  }

  alarmsList() {
    // this.alarmgapi.getAlarmGeneratedDescription().subscribe(res => {
    //   this.alarms = res["data"];
    //   // console.log(this.alarms, "Alarms Description");
    //   this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 5,
    //     processing: true
    //   };
    //   this.dtTrigger.next(true); // to rerender the table when next function is called 

    // });

    this.alarmgapi.getAlarmGeneratedDescription().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.alarms = res.data;
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

  //console.log(statustext$);
  ngOnDestroy() {
    this.killTrigger.next();
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
