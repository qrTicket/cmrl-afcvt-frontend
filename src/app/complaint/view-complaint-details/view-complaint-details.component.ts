import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplaintService } from 'src/app/station/_services/complaint.service';

@Component({
  selector: 'app-view-complaint-details',
  templateUrl: './view-complaint-details.component.html',
  styleUrls: ['./view-complaint-details.component.scss']
})
export class ViewComplaintDetailsComponent implements OnInit {

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
