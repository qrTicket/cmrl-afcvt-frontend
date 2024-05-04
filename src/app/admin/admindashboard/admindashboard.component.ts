import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { StationService } from '../_services/station.service';
import { LinesService } from '../_services/lines.service';
import { AddUsermanagerService } from '../_services/add-usermanager.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdmindashboardService } from '../_services/admindashboard.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
//import swal from 'sweetalert';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-admindash',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss'],
  animations: []
})
export class AdmindashboardComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>
  id: number;

  station: any = [];
  line: any[];
  userList: any[];
  

  stationcount: number;
  linecount: number;
  usercount:number;
 
  modeList:any[]= [];
  configuredGateList:any = [];
  oprModeForm: FormGroup;
  submitted:any=false;
  gateMode: any;
  stationCode: any;
  lineZoneStationList:any[]=[];
  showconfiguredgatelist:any= false;
  stn_group: any;
  send_btn_text:string="SEND"
  gateConfigForm: FormGroup;

  generatedTicketCount:any;


  constructor(
    private stationService: StationService,
    private lineService: LinesService,
    private userService: AddUsermanagerService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private dashboardService : AdmindashboardService,
    private router: Router
   
  ) { }

  ngOnInit() {
    this.oprModeForm = this.formbuilder.group({
      stationCode: [
        "",
        RxwebValidators.required({
            message: "This field is required!",
        }),
      ],
      modeName: [
        "",
        RxwebValidators.required({
            message: "This field is required!",
        }),
      ],
      assignTo: this.formbuilder.array([],
        RxwebValidators.required({
          message: "This field is required!",
        }),
      ),
      gateTo:[
        "",
        RxwebValidators.required({
            message: "This field is required!",
        }),
      ]
    })

    this.gateConfigForm = this.formbuilder.group({
      stationCode :[""]
    })

    this.getModeList();
    this.stationlist();
    this.getLiineStationsList();
    this.getTicketCount();
    
  }

  getTicketCount(){
    this.dashboardService.getTicketCount().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toastr.error(res.data)
        }
        else if(res.status === "1"){
          this.generatedTicketCount = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data)
      }
    })
  }
 

  //show gate list to choos on the basis of change event
  showGateList(e){
    if(e.target.value==="MULTI"){
      this.showconfiguredgatelist = true;
      this.assignToForms.clear();
      this.send_btn_text = "SEND TO SPECIFIC GATE";
    }else if(e.target.value==="ALL"){
      this.showconfiguredgatelist = false;
      this.assignToForms.clear();
      this.send_btn_text = "SEND TO ALL GATE";
    }else{
      this.showconfiguredgatelist = false;
      this.assignToForms.clear();
      this.send_btn_text = "SEND";
    }
  }

  get assignToForms() {
    return this.oprModeForm.get('assignTo') as FormArray
  }


  onCheckboxChange(e) {
    const checkArray: FormArray = this.oprModeForm.get('assignTo') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  // ----------------- station count ------------------

  stationlist() {
    // this.stationService.getStation().subscribe(res => {
    //   this.station = res["data"];
    //   this.stationcount = res["data"].length;
    //   // console.log(this.station);

    // });
    this.stationService.getStation().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.station = res.data;
          //this.stationcount = res.data.length;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  // ----------------- line count ------------------

  linelist() {
    // this.lineService.getLines().subscribe(res => {
    //   this.line = res["data"];
    //   this.linecount = res["data"].length;
    //   // console.log(this.line);

    // });
    this.lineService.getLines().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.line = res.data;
          //this.linecount = res.data.length;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  getAllUsers() {
    // this.userService.userList().subscribe(
    //     (res) => {    
    //         this.userList = res["data"]; 
    //         this.usercount = res["data"].length;
    //     },
    // );
    this.userService.userList().subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.userList = res.data;
          //this.usercount = res.data.length;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  getLiineStationsList(){
    // this.dashboardService.getLiineStationList().subscribe(
    //   (res)=>{
    //     this.lineStationList = res;
    //     console.log(res);
    // })
    this.dashboardService.getLiineStationZoneList().subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
           this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          console.log(res,'dashboard serv');
          this.lineZoneStationList = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  getModeList(){
    // this.dashboardService.getModelList().subscribe(
    //   (res)=>{
    //     this.modeList = res['data'];
    //     console.log(res);
    // })
    this.dashboardService.getModelList().subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.modeList = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }
  
  //this method will be called when change station
  getconfiguredGateList(stnCode:any){
    console.log(stnCode)
    // this.dashboardService.getConfiguredEquip(stnCode).subscribe(
    //   (res)=>{
    //     if(res['status']==="1"){
    //       this.configuredGateList = res['data'];
    //     }else{
    //       this.toastr.error(res.data);
    //     }
    //       console.log(res);
    //   })
      this.dashboardService.getConfiguredEquip(stnCode).subscribe({
        next:(res:any)=>{
          if(res.status === "0"){
              this.toastr.error(res.data,'Error!')
          }
          else if(res.status === "1"){
            this.configuredGateList = res.data;
          }
        },
        error:(err)=>{
            this.toastr.error(err.error.data,'Error!')
        }
      })
  }

  //to show the selected station all gate config
  showGateConfig(stnCode:any){
    if(stnCode!=='')
    this.router.navigate(['/admin/single-station-details',stnCode]);
  }

  checkedEvnt() {
    this.checkboxes.forEach((element) => {
         element.nativeElement.checked = false;
    });
  }

  onFormSubmit(){
    console.log(this.oprModeForm.value);
    this.submitted=true;
    if (this.oprModeForm.invalid)
    //return swal("Please select all fields", "", "error");
    return Swal.fire({
      icon: "error",
      text: "Please select all fields!",
    });

    const gateMode = this.oprModeForm.value.modeName;
    const stationCode = this.oprModeForm.value.stationCode;
    const stnArr = this.oprModeForm.value.assignTo;
    const gateTo= this.oprModeForm.value.gateTo;
    if(gateTo==='MULTI' && stnArr.length>0){
      this.stn_group = stnArr.toString();
    }else if(gateTo==='ALL'){
      this.stn_group = "ALL"
    }else{
      //return swal("Please select gate", "", "error");
      return Swal.fire({
        icon: "error",
        text: "Please select gate!",
      });
    }
    
    const obj = {
      mode : gateMode,
      assignTo: this.stn_group
    }

    const reqObj = {};
    reqObj[stationCode] = obj;

    //this.toastr.success("sent successfully");
    this.oprModeForm.reset();
    this.checkedEvnt();
    this.send_btn_text = "SEND";
    this.showconfiguredgatelist = false;
    this.submitted=false;
    console.log(reqObj)

    // this.dashboardService.updateModeToSpecificStnGate(reqObj).subscribe(res => {
    //   if(res['status']==="1"){
    //     this.toastr.success(res.data);
    //   }else{
    //     this.toastr.error(res.data);
    //   }
    // })
    this.dashboardService.updateModeToSpecificStnGate(reqObj).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data);
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }


  

  


}
