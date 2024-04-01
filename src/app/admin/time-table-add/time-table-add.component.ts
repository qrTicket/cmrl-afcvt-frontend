import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimeTableService } from '../_services/time-table.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-time-table-add',
  templateUrl: './time-table-add.component.html',
  styleUrls: ['./time-table-add.component.scss']
})
export class TimeTableAddComponent implements OnInit {
  timeTable: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private timeTblSrv: TimeTableService,
  ) { }
  

   ngOnInit() {
    this.timeTable = this.formBuilder.group({
      fromTime: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      toTime: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
     // status: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
    }
    );

  }
  get fval() {
    return this.timeTable.controls;
  }

  cancel(){
    this.router.navigate(['/admin/time-table-list'])
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

    this.timeTblSrv.addTimeTable(requestObject).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data,"Success");
          this.router.navigate(['/admin/time-table-list'])
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
