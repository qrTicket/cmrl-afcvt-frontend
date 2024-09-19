import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastr:ToastrService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
      this.token = params.get("token");
      console.log(this.token);
    });

    // this.complaintService.getComplaintDetails(this.token).subscribe((res) => {
    //   this.complaintDetails = res;
    // });
    this.complaintService.getComplaintDetails(this.token).subscribe({
      next:(res)=>{
        if(res.status === "0"){
             this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.complaintDetails = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })

  }

}
