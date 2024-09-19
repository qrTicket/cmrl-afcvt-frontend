import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ComplaintService } from 'src/app/station/_services/complaint.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {
  deviceId: string;
  deviceDetails: any;

  constructor(
    private complaintService: ComplaintService,
    private route: ActivatedRoute,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.deviceId = params.get("deviceid");
      console.log(this.deviceId);
    });

    // this.complaintService.getDeviceDetails(this.deviceId).subscribe((res) => {
    //   this.deviceDetails = res;
    //   console.log(this.deviceDetails);
    // });
    this.complaintService.getDeviceDetails(this.deviceId).subscribe({
      next:(res)=>{
        //this.deviceDetails = res;
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.deviceDetails = res.data;
        
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data)
      }
    })
  }

}
