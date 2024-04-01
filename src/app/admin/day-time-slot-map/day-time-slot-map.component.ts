import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DayTypeService } from '../_services/day-type.service';
import { TimeTableService } from '../_services/time-table.service';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-day-time-slot-map',
  templateUrl: './day-time-slot-map.component.html',
  styleUrls: ['./day-time-slot-map.component.scss']
})
export class DayTimeSlotMapComponent implements OnInit {
  mapDayTimeSlot: FormGroup;
  submitted = false;
  dayTypeList:any[]=[];
  timeSlotList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private dayTypeSrv: DayTypeService,
    private timeSlotSrv: TimeTableService,
  ) { }
  

   ngOnInit() {
    this.mapDayTimeSlot = this.formBuilder.group({
      dayTypeIds: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      timeSlotId: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      discount: ['', [RxwebValidators.required({message:"ERROR! This field is required!"}),
      RxwebValidators.maxLength({value:20, message:"ERROR! Maximum length acceptable is 20 digits!"}),
      RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:true, message:'ERROR! Only digits are allowed!' })]],
      
    });

    this.getActiveDayType();
    this.getTimeSlot();
  }

  getActiveDayType() {
    this.dayTypeSrv.getActiveDayTypeList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.dayTypeList = res.data;
          console.log(this.dayTypeList,'this.dayTypeList')
        }
      },
      error:(err)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })    
  }

  getTimeSlot() {
    this.timeSlotSrv.getActiveTimeSlotList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.timeSlotList = res.data;
          console.log(this.timeSlotList,'this.timeSlotList')
        }
      },
      error:(err)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })    
  }

  get fval() {
    return this.mapDayTimeSlot.controls;
  }

  cancel(){
    this.router.navigate(['/admin/admindashboard'])
  }

   onFormSubmit() {
    console.log(this.mapDayTimeSlot.value, 'form values')
    if(this.mapDayTimeSlot.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "timeSlotId" : this.mapDayTimeSlot.value.timeSlotId,
      "discount" : this.mapDayTimeSlot.value.discount,
    }

    this.timeSlotSrv.mapDayTypeToTimeSlot(requestObject, this.mapDayTimeSlot.value.dayTypeIds).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data,"Success");
          this.router.navigate(['/admin/day-type-list'])
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
