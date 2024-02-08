import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';

import { StationService } from '../_services/station.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-multi-gate-operation-mode',
  templateUrl: './multi-gate-operation-mode.component.html',
  styleUrls: ['./multi-gate-operation-mode.component.scss']
})
export class MultiGateOperationModeComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>
  modeList:any[]= [];
  configuredGateList:any = [];
  oprModeForm: UntypedFormGroup;
  submitted:any=false;
  gateMode:any;
  stn_group: any;
  constructor(
    private stationService:StationService,
    private formbuilder: UntypedFormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.oprModeForm = this.formbuilder.group({
      mode: [
        "",
        RxwebValidators.required({
            message: "This field is required!",
        }),
      ],
      assignTo: this.formbuilder.array([],
        RxwebValidators.required({
          message: "This field is required!",
        }),
      )
    })

    this.getModeList();
    this.getconfiguredGateList();
  }

  onCheckboxChange(e) {
    const checkArray: UntypedFormArray = this.oprModeForm.get('assignTo') as UntypedFormArray;
    if (e.target.checked) {
      checkArray.push(new UntypedFormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: UntypedFormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  getModeList(){
    this.stationService.getModelList().subscribe(
      (res)=>{
        if(res['status']==="1"){
          this.modeList = res['data'];
        }else{
          this.toastr.error(res.data);
        }
        
        console.log(res);
    })
  }

  getconfiguredGateList(){
    this.stationService.getConfiguredEquip().subscribe(
      (res)=>{
        if(res['status']==="1"){
          this.configuredGateList = res['data'];
        }else{
          this.toastr.error(res.data);
        }
          console.log(res);
      })
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
      title: "ERROR!",
      text:"Please select all fields!",
      icon: "error"
    });

    this.gateMode = this.oprModeForm.value.mode;
    const stnArr = this.oprModeForm.value.assignTo;
    this.stn_group = stnArr.toString();
    if(stnArr.length==0){
      //return swal("Please select gate", "", "error");
      return Swal.fire({
        title: "ERROR!",
        text:"Please select gate!",
        icon: "error"
      });
    }

    const obj = {
      mode : this.gateMode,
      assignTo: this.stn_group
    }
    console.log(obj)
    this.stationService.updateModeToSpecificGate(obj).subscribe(res => {
      if(res['status']==="1"){
        this.toastr.success(res.data);
        this.oprModeForm.reset();
        this.checkedEvnt();
      }else{
        this.toastr.error(res.data);
      }
    })
  }
}
