import { Component, OnInit, ViewChild } from '@angular/core';
import { MultiDashboardService } from '../_services/multi-dashboard.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Multidashboard } from '../_models/multi-dashboard.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-multi-dash-list',
  templateUrl: './multi-dash-list.component.html',
  styleUrls: ['./multi-dash-list.component.scss']
})
export class MultiDashListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  
  multidashboard: Multidashboard[] = [];
  
  constructor(
    private multidashboardservice: MultiDashboardService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  dtOptions: DataTables.Settings = {};  

  ngOnInit() {
    this.dashboardlist();
  }

  dashboardlist() {
    // this.multidashboardservice.dashboardList().subscribe(data => {
    //   this.multidashboard = data;
    //   console.log(this.multidashboard);
    //   this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 5,
    //     processing: true
    //   };
    //   this.dtTrigger.next(true);
    // });
    this.multidashboardservice.dashboardList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.multidashboard = res.data;
          this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true
          };
          this.dtTrigger.next(true);
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
    
  }

}
