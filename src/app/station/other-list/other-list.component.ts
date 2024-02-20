import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StationService } from "../_services/station.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-other-list',
  templateUrl: './other-list.component.html',
  styleUrls: ['./other-list.component.scss']
})
export class OtherListComponent implements OnInit {

  otherList: any;
  public temp: Boolean = false;
  
  constructor(
      private stationAPI: StationService,
      private router: Router,
      private toastr: ToastrService
  ) { }

  ngOnInit() {
      // this.stationAPI.otherEquipment().subscribe((res) => {
      //   if(res['status'] === "1"){
      //     this.temp = true;
      //     this.otherList = res["data"];
      //     console.log(this.otherList,'otherEquipment List')
      // }
      // else if(res['status'] === "0"){
      //     this.toastr.error(res['data'])
      // }
      //     //this.otherList = res["data"];
      //     //this.temp = true;
      // });
      this.stationAPI.otherEquipment().subscribe({
        next:(res)=>{
          if(res.status === "0"){
              this.toastr.error(res.data,'Error!')
          }
          else if(res.status === "1"){
              this.temp = true;
              this.otherList = res.data;
              console.log(this.otherList,'otherList list')
          }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
      })
  }

  //navigate to raise complain page with device id
  raiseComplain(device_id){
      this.router.navigate(["/raisecomplaint", device_id]);
  }

}
