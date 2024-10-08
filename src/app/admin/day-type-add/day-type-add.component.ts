import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DayTypeService } from '../_services/day-type.service';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-day-type-add',
  templateUrl: './day-type-add.component.html',
  styleUrls: ['./day-type-add.component.scss']
})
export class DayTypeAddComponent implements OnInit {
  dayType: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private dayTypeSrv: DayTypeService,
    
  ) { }
  

   ngOnInit() {
    this.dayType = this.formBuilder.group({
      dayTypeName: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!', allowWhiteSpace:true})
      ]],
      status: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      timeSlots: this.formBuilder.array([this.defaultFields()])
    }
    );

  }
  get fval() {
    return this.dayType.controls;
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
        RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:true, message:'ERROR! Only numeric values or decimals are allowed' })
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
        RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:true, message:'ERROR! Only numeric values or decimals are allowed' })
      ]],
    })
    control.push(moreFields);
  }

  deleteTimeSlotField(i:any){
    this.timeSlotArray.removeAt(i);
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
      "status" : this.dayType.value.status,
      "timeSlotMap" : this.dayType.value.timeSlots
    }

    this.dayTypeSrv.addDayType(requestObject).subscribe({
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
