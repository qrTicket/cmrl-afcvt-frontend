import { Component, OnInit } from '@angular/core';
import { ComplainService } from '../_complainservices/complain.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-complaintdash',
    templateUrl: './complaintdash.component.html',
    styleUrls: ['./complaintdash.component.scss']
})
export class ComplaintdashComponent implements OnInit {

    subscription: Subscription[] = []
    pending: any = [];
    progress: any = [];
    resolve: any = [];
    reject: any = [];
    dashboardData: any;

    constructor(
        private complaintService: ComplainService,
        private toastr:ToastrService
    ) { }

    ngOnInit() {
        this.getDashboardData();
    }

    // fetch data to display on dasboard
    getDashboardData() {
      this.complaintService.getDashboardData().subscribe({
        next:(res)=>{
          if(res.status === "0"){
              this.toastr.error(res.data)
          }
          else if(res.status === "1"){
            this.dashboardData = res.data;
          }
        },
        error:(err)=>{
            this.toastr.error(err.error.data)
        }
      })
    }

    
    
}