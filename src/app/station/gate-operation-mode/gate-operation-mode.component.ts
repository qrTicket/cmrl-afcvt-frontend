import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';

import { StationService } from '../_services/station.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gate-operation-mode',
  templateUrl: './gate-operation-mode.component.html',
  styleUrls: ['./gate-operation-mode.component.scss']
})
export class GateOperationModeComponent implements OnInit {
  modeList:any[]= [];
  oprModeForm: UntypedFormGroup;
  submitted:any=false;
  gateMode:any;
  constructor(
    private stationService:StationService,
    private formbuilder: UntypedFormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.oprModeForm = this.formbuilder.group({
      modeName: [
        "",
        RxwebValidators.required({
            message: "This field is required!",
        }),
      ],
    })

    this.getModeList();
  }

  getModeList(){
    // this.stationService.getModelList().subscribe(
    //   (res)=>{
    //     this.modeList = res['data'];
    //     console.log(res);
    // })

    this.stationService.getModelList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
            //this.temp = true;
            this.modeList = res.data;
            console.log(this.modeList,'modeList list')
        }
    },
    error:(err)=>{
        this.toastr.error(err.error.data,'Error!')
    }
    })
  }

  onFormSubmit(){
    console.log(this.oprModeForm.controls);
    this.submitted=true;
    if (this.oprModeForm.invalid)
    //return swal("Please select any one operation mode", "", "error");
    return Swal.fire({
      title: "ERROR!",
      text:"Please select any one operation mode!",
      icon: "error"
    });

    this.gateMode = this.oprModeForm.value.modeName;
    // this.stationService.updateModeToAllGate(this.gateMode).subscribe(res => {
    //   if(res['status']==="1"){
    //     this.toastr.success(res.data);
    //   }else{
    //     this.toastr.error(res.data);
    //   }
    // })

    this.stationService.updateModeToAllGate(this.gateMode).subscribe({
      next:(res)=>{
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
