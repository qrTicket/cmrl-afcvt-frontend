import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-schedule-file-update-list',
  templateUrl: './schedule-file-update-list.component.html',
  styleUrls: ['./schedule-file-update-list.component.scss']
})
export class ScheduleFileUpdateListComponent implements OnInit {
  
  public temp: Object = false;
  searchTerm: any;
  joblist:any=[];
  errormsg: any;



    constructor(
        private toaster: ToastrService,
        private router: Router,
        ) {}
    //dtOptions: DataTables.Settings = {};

    ngOnInit() {
        this.scheduleJobList();
    }

    scheduleJobList() {
      this.temp = true;
      //will get data from api when api will be ready.
      this.joblist=[]; 
    }

  

}
