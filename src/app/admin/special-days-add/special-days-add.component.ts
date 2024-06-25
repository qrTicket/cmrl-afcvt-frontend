import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpecialDayService } from '../_services/special-day.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { formatDate } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-special-days-add',
  templateUrl: './special-days-add.component.html',
  styleUrls: ['./special-days-add.component.scss']
})
export class SpecialDaysAddComponent implements OnInit {
  addSpecialDay: FormGroup;
  yearStartDate: FormGroup;
  submitted = false;
  submittedYearStartDate = false;
  maxDate: Date;
  datePickerConfigSpecialDay: Partial<BsDatepickerConfig>;
  datePickerYearStartingDay: Partial<BsDatepickerConfig>;
  calenderInfo:any = "";

  modalRef: BsModalRef;
    statusValue: number;
    config = {
      animated: true,
      backdrop: true,
      ignoreBackdropClick: false,
    };

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private specialDaySrv: SpecialDayService,
    private modalSrv:BsModalService
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
          minDate: (this.maxDate = new Date()),
      }
    );
  }
  

   ngOnInit() {
    this.addSpecialDay = this.formBuilder.group({
      specialDayName: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!', allowWhiteSpace:true})
      ]],
      specialDayDate: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]]
      });

    this.yearStartDate = this.formBuilder.group({
      yearStartingDayDate: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      numberOfDays: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.numeric({message:"ERROR! This digits are allowed!"}),
      ]],
    })

    this.getYearStartingDate();
  }

  getYearStartingDate(){
    this.specialDaySrv.getYearStartingDate().subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.calenderInfo = res.data;
          //this.calenderInfo = "";
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  get fval() {
    return this.addSpecialDay.controls;
  }

  get fvalYearStartDate() {
    return this.yearStartDate.controls;
  }

  cancel(){
    this.router.navigate(['/admin/special-days-list'])
  }

   onFormSubmit() {
    if(this.addSpecialDay.invalid){
      this.submitted = true;
      this.submittedYearStartDate = false;
      return false;
    }
    
    let requestObject = {
      "specialDayName" : this.addSpecialDay.value.specialDayName,
      "specialDayDate" : formatDate(this.addSpecialDay.value.specialDayDate,'dd-MM-yyyy','en')
    }

    this.specialDaySrv.addSpecialDay(requestObject).subscribe({
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

  openModal(templateYearStartDate: TemplateRef<any>) {
    this.submittedYearStartDate = false;
    this.modalRef = this.modalSrv.show(templateYearStartDate, this.config);
  }

  decline() {
    this.modalRef.hide();
    this.yearStartDate.reset();
    this.submittedYearStartDate = false;
  }

  //this method will add year starting date
  submitOnYearStartDateForm(){
    if(this.yearStartDate.invalid){
      this.submittedYearStartDate = true;
      this.submitted = false;
      return false;
    }

    let reqObj = {
      "startOfCalender" : this.yearStartDate.value.yearStartingDayDate,
      "totalDays" : this.yearStartDate.value.numberOfDays
    }

    this.specialDaySrv.addYearStartingDate(reqObj).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data,"Success");
          this.decline();
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  onValueYearStartChange(val:any){
    const dateData = new Date(val);
    this.yearStartDate.get("yearStartingDayDate").setValue(formatDate(dateData,'dd-MM-yyyy','en'));
  }

  patchCalanderData(templateYearStartDate: TemplateRef<any>){
    this.openModal(templateYearStartDate);
    this.yearStartDate.controls['yearStartingDayDate'].patchValue(this.calenderInfo.startOfCalender);
    this.yearStartDate.controls['numberOfDays'].patchValue(this.calenderInfo.totalDays);
  }

  //this method will update year starting date
  updateStartOfYear(){
    if(this.yearStartDate.invalid){
      this.submittedYearStartDate = true;
      this.submitted = false;
      return false;
    }

    let reqObj = {
      "startOfCalender" : this.yearStartDate.value.yearStartingDayDate,
      "totalDays" : this.yearStartDate.value.numberOfDays
    }

    this.specialDaySrv.updateStartOfCalander(reqObj).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data,"Success");
          this.decline();
          this.getYearStartingDate();
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
