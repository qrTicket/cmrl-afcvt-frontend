import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplaintService } from '../_services/complaint.service';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.scss']
})
export class ComplaintDetailsComponent implements OnInit {

  complaintDetails:any={};
  token:any;

  constructor(
    private complaintService: ComplaintService,
    private route: ActivatedRoute, 
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
      this.token = params.get("token");
      console.log(this.token);
    });

    this.complaintService.getComplaintDetails(this.token).subscribe((res) => {
      this.complaintDetails = res;
      
    });

  }

}
