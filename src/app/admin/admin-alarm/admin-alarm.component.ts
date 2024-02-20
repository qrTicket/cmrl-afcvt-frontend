import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AlarmService } from '../_services/alarm.service';
import { timer, Observable, Subject, of } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-alarm',
  templateUrl: './admin-alarm.component.html',
  styleUrls: ['./admin-alarm.component.scss']
})
export class AdminAlarmComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  searchTerm: any;
  alarms: any = [];
  dataRefresher: any;

  constructor(
    private alarmgapi: AlarmService, 
    private http: HttpClient, 
    private router: Router,
    private toastr:ToastrService
    ) { }

  dtOptions: DataTables.Settings = {};
  private killTrigger: Subject<void> = new Subject();
  private fetchData$: Observable<string> = this.alarmgapi.getAllalarm();


  ngOnInit() {
    // this.alarmlist ();
    // this.alarmgapi.getAllalarm().subscribe(data => {
    //   this.alarms = data;
    //   console.log(data); 
    // });
    this.alarmgapi.getAllalarm().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.alarms = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })

  }

  private refreshInterval$: Observable<string> = timer(0, 3000)
    .pipe(
      // This kills the request if the user closes the component 
      takeUntil(this.killTrigger),
      // switchMap cancels the last request, if no response have been received since last tick
      switchMap(() => this.fetchData$),
      // catchError handles http throws 
      catchError(error => of('Error'))
    );
  public statustext$: Observable<string> = this.refreshInterval$;

  ngOnDestroy() {
    this.killTrigger.next();
  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(true);
    });
  }


}
