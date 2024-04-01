import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DayTypeService } from '../_services/day-type.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-day-type-edit',
  templateUrl: './day-type-edit.component.html',
  styleUrls: ['./day-type-edit.component.scss']
})
export class DayTypeEditComponent implements OnInit {
  dayType: FormGroup;
  submitted = false;
  dayTypeId:number;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private dayTypeSrv: DayTypeService,
    private activatedRoute:ActivatedRoute
  ) { }
  

   ngOnInit() {
    this.activatedRoute.params.subscribe((dataInUrl:any)=>{
      this.dayTypeId = dataInUrl['id'];
    })

    this.dayType = this.formBuilder.group({
      dayTypeName: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      //status: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]]
      timeSlots: this.formBuilder.array([this.defaultFields()])
    }
    );
    this.getDayTypeDataById(this.dayTypeId)
  }

  getDayTypeDataById(id:number){
    this.dayTypeSrv.getDayTypeById(id).subscribe({
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

  patchData(respData:any){
    this.dayType.patchValue({
      dayTypeName : respData && respData.dayTypeName ? respData.dayTypeName : ""
    })
    for(let i=1; i<respData.timeTable.length;++i){
      this.newTimeSlotField();
    }
    this.dayType.controls['timeSlots'].patchValue(respData.timeTable)
  }

  get timeSlotArray():FormArray{
    return this.dayType.get('timeSlots') as FormArray;
  }

  defaultFields():FormGroup{
    return this.formBuilder.group({
      fromTime: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      toTime: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      discount: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.numeric({message:"ERROR! Only digits are allowed!", allowDecimal:true})
    ]]
    })
  }

  newTimeSlotField(){
    let control = <FormArray>this.dayType.controls['timeSlots'];
    let moreFields = this.formBuilder.group({
      fromTime: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      toTime: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      discount: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.numeric({message:"ERROR! Only digits are allowed!", allowDecimal:true})
      ]],
    })
    control.push(moreFields);
  }

  deleteTimeSlotField(i:any){
    this.timeSlotArray.removeAt(i);
  }

  get fval() {
    return this.dayType.controls;
  }

  cancel(){
    this.router.navigate(['/admin/day-type-list'])
  }

   onFormSubmit() {
    if(this.dayType.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "dayTypeName" : this.dayType.value.dayTypeName,
      //"status" : this.dayType.value.status,
      "timeSlotMap" : this.dayType.value.timeSlots
    }

    this.dayTypeSrv.updateDayTypeById(requestObject, this.dayTypeId).subscribe({
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
