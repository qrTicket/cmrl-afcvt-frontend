import { Component, OnInit } from '@angular/core';

import { Complaint } from '../_model/complaint.model';
import { ComplaintService } from '../_services/complaint.service';
import { Subscription } from 'rxjs';

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
    private complaintService: ComplaintService    
  ) { }

  ngOnInit() {
    this.complaintService.getComplaintStatus().subscribe((res) => {
      this.trackComplaintList = res['data'];
      this.temp = true;
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }


}
