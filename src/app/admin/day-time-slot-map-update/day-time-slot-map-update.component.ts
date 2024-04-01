import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DayTypeService } from '../_services/day-type.service';
import { TimeTableService } from '../_services/time-table.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-day-time-slot-map-update',
  templateUrl: './day-time-slot-map-update.component.html',
  styleUrls: ['./day-time-slot-map-update.component.scss']
})
export class DayTimeSlotMapUpdateComponent implements OnInit {
  mapDayTimeSlot: FormGroup;
  submitted = false;
  dayTypeList:any[]=[];
  timeSlotList: any[] = [];
  id:number;
  dayTypeId:number;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private dayTypeSrv: DayTypeService,
    private timeSlotSrv: TimeTableService,
    private activatedRoute:ActivatedRoute,
    private location:Location
  ) { }
  

   ngOnInit() {
    this.activatedRoute.params.subscribe((dataInUrl:any)=>{
      this.id = dataInUrl['id'];
    })

    this.mapDayTimeSlot = this.formBuilder.group({
      dayTypeIds: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      timeSlotId: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      discount: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      
    });

    this.getActiveDayType();
    this.getTimeSlot();
    this.getDayTypeToTimeSlotDataById(this.id)
    this.mapDayTimeSlot.get('dayTypeIds').disable();
    this.mapDayTimeSlot.get('timeSlotId').disable();
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

  getDayTypeToTimeSlotDataById(id:number){
    this.timeSlotSrv.getDayTypeToTimeSlotMappingDataById(id).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.dayTypeId = res.data.dayTypeId;
          this.patchData(res.data);
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  patchData(respData:any){
    console.log(respData,'resp data')
    
    this.mapDayTimeSlot.patchValue({
      dayTypeIds : respData.dayTypeId ? respData.dayTypeId : "",
      timeSlotId : respData.timeSlotId ? respData.timeSlotId : "",
      discount : respData.discount ? respData.discount : "",
    })
  }

  get fval() {
    return this.mapDayTimeSlot.controls;
  }

  cancel(){
    this.router.navigate(['/admin/day-type-list'])
    //this.location.back();
  }

   onFormSubmit() {
    console.log(this.mapDayTimeSlot.value, 'form values')
    if(this.mapDayTimeSlot.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "timeTableId" : this.id,
      "discount" : this.mapDayTimeSlot.value.discount,
    }

    this.timeSlotSrv.updateDayTypeToTimeSlotMappingById(requestObject, this.dayTypeId).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data,"Success");
          //this.router.navigate(['/admin/day-type-list'])
          this.location.back();
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
