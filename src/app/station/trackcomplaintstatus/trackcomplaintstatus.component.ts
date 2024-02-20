import { Component, OnInit } from '@angular/core';

import { Complaint } from '../_model/complaint.model';
import { ComplaintService } from '../_services/complaint.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trackcomplaintstatus',
  templateUrl: './trackcomplaintstatus.component.html',
  styleUrls: ['./trackcomplaintstatus.component.scss']
})
export class TrackcomplaintstatusComponent implements OnInit {

  public temp: Boolean = false;
  trackComplaintList: Complaint[];
  data: any;
  successmsg: any;
  error: any;
  subscriptions: Subscription[] = [];

  constructor(
    private complaintService: ComplaintService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.complaintService.getComplaintStatus().subscribe((res) => {
      this.trackComplaintList = res['data'];
      this.temp = true;
    });

    this.complaintService.getComplaintStatus().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.trackComplaintList = res.data;
          this.temp = true;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }


}
