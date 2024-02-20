import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { GateConfig } from 'src/app/station/_model/gate-config.model';
//import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { AdmindashboardService } from '../_services/admindashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-station-details',
  templateUrl: './single-station-details.component.html',
  styleUrls: ['./single-station-details.component.scss']
})
export class SingleStationDetailsComponent implements OnInit {
  stationCode: any;
  //configuredList: GateConfig[] = [];
  configuredList: any[] = [];
  stationData:any;
  North: String = 'North';
  South: String = 'South';
  errormsg: any;
  constructor(
    private activeRouter: ActivatedRoute,
    private dashboardService : AdmindashboardService,
    private toastr : ToastrService,
  ) { }

  ngOnInit() {
    this.activeRouter.paramMap.subscribe((params) => {
      this.stationCode = params.get("stationcode");
      //console.log(this.stationId);
      if (this.stationCode) {
           this.getStationAllGateConfig(this.stationCode); 
      }

    });
  }

  editConfig(item){
    console.log(item)
  }

  getStationAllGateConfig(stationCode){
    console.log(stationCode)
    // this.dashboardService.getGateConfigListByStationcode(stationCode).subscribe(
    //   (res) => {
    //         this.stationData = res['Station'];
    //         if(res["GateConfigs"].length === 0){
    //           //   this.spinner.hide();
    //           //   return this.toastr.error(res.data, "No data available!")
    //             //return swal("No data available!", "", "error");
    //             return Swal.fire({
    //               icon: "error",
    //               title: "ERROR",
    //               text: "No data available!",
    //             });
    //         }else{
    //           this.configuredList = res["GateConfigs"];
    //         }
            
    //   },
    //   (error) => {
    //     this.errormsg = error;
    //     Swal.fire({
    //         title: "Error!",
    //         text: this.errormsg,
    //     });
    //   }  
    //   );
      this.dashboardService.getGateConfigListByStationcode(stationCode).subscribe({
        next:(res)=>{
          if(res.status === "0"){
              this.toastr.error(res.data,'Error!')
          }
          else if(res.status === "1"){
            this.stationData = res.Station;
            if(res.GateConfigs.length === 0){
                return Swal.fire({
                  icon: "error",
                  title: "ERROR",
                  text: "No data available!",
                });
            }else{
              this.configuredList = res.GateConfigs;
            }
          }
        },
        error:(err)=>{
          this.errormsg = err.error.data;
          Swal.fire({
              title: "Error!",
              text: this.errormsg,
          });
        }
      })
  }

}
