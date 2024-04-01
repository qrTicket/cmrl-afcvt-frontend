import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { SpecialDayService } from '../_services/special-day.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { formatDate } from '@angular/common';
import { SpecialDay } from '../_models/SpecialDay';

@Component({
  selector: 'app-special-days-edit',
  templateUrl: './special-days-edit.component.html',
  styleUrls: ['./special-days-edit.component.scss']
})
export class SpecialDaysEditComponent implements OnInit {
  updateSpecialDay: FormGroup;
  submitted = false;
  maxDate: Date;
  datePickerConfigSpecialDay: Partial<BsDatepickerConfig>;
  datePickerYearStartingDay: Partial<BsDatepickerConfig>;
  specialDayId:any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private specialDaySrv: SpecialDayService,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.datePickerConfigSpecialDay = Object.assign(
      {},
      {
          adaptivePosition: true,
          dateInputFormat: "DD-MM-YYYY",
          containerClass: "theme-dark-blue",
          minDate: (this.maxDate = new Date()),
      }
    );
    this.datePickerYearStartingDay = Object.assign(
      {},
      {
          adaptivePosition: true,
          dateInputFormat: "DD-MM-YYYY",
          containerClass: "theme-dark-blue",
          //minDate: (this.maxDate = new Date()),
      }
    );
  }
  

   ngOnInit() {
    this.activatedRoute.params.subscribe((dataInUrl:any)=>{
      this.specialDayId = dataInUrl['id'];
    })

    this.updateSpecialDay = this.formBuilder.group({
      specialDayName: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!', allowWhiteSpace:true})
      ]],
      specialDayDate: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      //yearStartingDayDate: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      // numberOfDays: ['', [
      //   RxwebValidators.required({message:"ERROR! This field is required!"}),
      //   RxwebValidators.numeric({message:"ERROR! This digits are allowed!"}),
      // ]],
    });

    this.getSpecialDayById(this.specialDayId)
  }
  get fval() {
    return this.updateSpecialDay.controls;
  }

  cancel(){
    this.router.navigate(['/admin/special-days-list'])
  }

  getSpecialDayById(id:number){
    this.specialDaySrv.getSpecialDayById(id).subscribe({
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
    this.updateSpecialDay.patchValue({
      specialDayName : respData.specialDayName ? respData.specialDayName : "",
      specialDayDate : respData.specialDayDate ? respData.specialDayDate : "",
      // yearStartingDayDate : respData.yearStartingDayDate ? respData.yearStartingDayDate : "",
      // numberOfDays : respData.numberOfDays ? respData.numberOfDays : "",
    })
  }

  onValueSpecialDayChange(value:any){
    const dateData = new Date(value);
    this.updateSpecialDay.get("specialDayDate").setValue(formatDate(dateData,'dd-MM-yyyy','en'));
  }

  // onValueYearStartChange(val:any){
  //   const dateData = new Date(val);
  //   this.updateSpecialDay.get("yearStartingDayDate").setValue(formatDate(dateData,'dd-MM-yyyy','en'));
  // }

   onFormSubmit() {
    if(this.updateSpecialDay.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "specialDayName" : this.updateSpecialDay.value.specialDayName,
      "specialDayDate" : this.updateSpecialDay.value.specialDayDate,
      //"yearStartingDayDate" : this.updateSpecialDay.value.yearStartingDayDate,
      //"numberOfDays" : this.updateSpecialDay.value.numberOfDays,
    }

    this.specialDaySrv.updateSpecialDayById(requestObject, this.specialDayId).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data,"Success");
          this.router.navigate(['/admin/special-days-list'])
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
