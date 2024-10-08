import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from '../_services/ticket.service';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { TicketSubType } from '../_models/TicketSubType';

@Component({
  selector: 'app-ticket-subtype-edit',
  templateUrl: './ticket-subtype-edit.component.html',
  styleUrls: ['./ticket-subtype-edit.component.scss']
})
export class TicketSubtypeEditComponent implements OnInit {
  updateTicketSubType: FormGroup;
  submitted = false;
  ticketSubTypeId:number;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private ticketSrv: TicketService,
    private activatedRoute:ActivatedRoute
  ) { }
  

   ngOnInit() {
    this.activatedRoute.params.subscribe((dataInUrl:any)=>{
      this.ticketSubTypeId = dataInUrl['id'];
    })

    this.updateTicketSubType = this.formBuilder.group({
      ticketSubTypeName: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!', allowWhiteSpace:true})
      ]],
      ticketSubTypeCode: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!'})
      ]],
      discount: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
      // RxwebValidators.maxLength({value:20, message:"ERROR! Maximum length acceptable is 20 digits!"}),
        RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:true, message:'ERROR! Only numeric values or decimals are allowed' })]],
    });
    this.getTicketSubTypeDataById(this.ticketSubTypeId);
  }
  get fval() {
    return this.updateTicketSubType.controls;
  }

  getTicketSubTypeDataById(id:number){
    this.ticketSrv.getTicketSubTypeById(id).subscribe({
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

  patchData(respData:TicketSubType){
    this.updateTicketSubType.patchValue({
      ticketSubTypeName : respData.ticketSubTypeName ? respData.ticketSubTypeName : "",
      ticketSubTypeCode : respData.ticketSubTypeCode ? respData.ticketSubTypeCode : "",
      discount : respData.discount ? respData.discount : "",
    })
  }

  cancel(){
    this.router.navigate(['/admin/ticket-sub-type-list'])
  }

   onFormSubmit() {
    if(this.updateTicketSubType.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "ticketSubTypeName" : this.updateTicketSubType.value.ticketSubTypeName,
      "ticketSubTypeCode" : this.updateTicketSubType.value.ticketSubTypeCode,
      "discount" : this.updateTicketSubType.value.discount,
    }

    this.ticketSrv.updateTicketSubTypeById(requestObject, this.ticketSubTypeId).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data,"Success");
          this.router.navigate(['/admin/ticket-sub-type-list'])
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
