import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimeTableService } from '../_services/time-table.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TimeTable } from '../_models/TimeTable';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-time-table-edit',
  templateUrl: './time-table-edit.component.html',
  styleUrls: ['./time-table-edit.component.scss']
})
export class TimeTableEditComponent implements OnInit {
  timeTable: FormGroup;
  submitted = false;
  timeTableId:number;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private timeTblSrv: TimeTableService,
    private activatedRoute:ActivatedRoute,
    private location:Location
  ) { }
  

   ngOnInit() {
    this.activatedRoute.params.subscribe((dataInUrl:any)=>{
      this.timeTableId = dataInUrl['id'];
    })

    this.timeTable = this.formBuilder.group({
      fromTime: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      toTime: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      //status: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
    }
    );
    this.getTimeTableDataById(this.timeTableId);
  }

  getTimeTableDataById(id:number){
    this.timeTblSrv.getTimeTableById(id).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.patchData(res.data);
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  patchData(respData:TimeTable){
    this.timeTable.patchValue({
      fromTime : respData.fromTime ? <string>respData.fromTime : "",
      toTime : respData.toTime ? <string>respData.toTime : "",
      //status : respData.status ? respData.status : "",
    })
  }

  get fval() {
    return this.timeTable.controls;
  }

  cancel(){
    this.router.navigate(['/admin/time-table-list'])
    //this.location.back();
  }

   onFormSubmit() {
    if(this.timeTable.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "fromTime" : this.timeTable.value.fromTime,
      "toTime" : this.timeTable.value.toTime,
      //"status" : this.timeTable.value.status,
    }

    this.timeTblSrv.updateTimeTableById(requestObject, this.timeTableId).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data,"Success");
          this.router.navigate(['/admin/time-table-list'])
          this.location.back();
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
