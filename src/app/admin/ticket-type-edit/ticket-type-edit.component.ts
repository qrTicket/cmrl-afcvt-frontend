import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from '../_services/ticket.service';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { TicketType } from '../_models/TicketType';

@Component({
  selector: 'app-ticket-type-edit',
  templateUrl: './ticket-type-edit.component.html',
  styleUrls: ['./ticket-type-edit.component.scss']
})
export class TicketTypeEditComponent implements OnInit {
  updateTicket: FormGroup;
  submitted = false;
  ticketTypeId:number;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private ticketSrv: TicketService,
    private activatedRoute:ActivatedRoute
  ) { }
  

   ngOnInit() {
    this.activatedRoute.params.subscribe((dataInUrl:any)=>{
      this.ticketTypeId = dataInUrl['id'];
    })

    this.updateTicket = this.formBuilder.group({
      ticketTypeName: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!', allowWhiteSpace:true})
      ]],
      ticketTypeCode: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!'})
      ]],
      discount: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:true, message:'ERROR! Only numeric values or decimals are allowed' })
      ]],
    });
    this.getTicketTypeDataById(this.ticketTypeId);
  }
  get fval() {
    return this.updateTicket.controls;
  }

  getTicketTypeDataById(id:number){
    this.ticketSrv.getTicketTypeById(id).subscribe({
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

  patchData(respData:TicketType){
    this.updateTicket.patchValue({
      ticketTypeName : respData.ticketTypeName ? respData.ticketTypeName : "",
      ticketTypeCode : respData.ticketTypeCode ? respData.ticketTypeCode : "",
      discount : respData.discount ? respData.discount : "",
    })
  }

  cancel(){
    this.router.navigate(['/admin/ticket-type-list'])
  }

   onFormSubmit() {
    if(this.updateTicket.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "ticketTypeName" : this.updateTicket.value.ticketTypeName,
      "ticketTypeCode" : this.updateTicket.value.ticketTypeCode,
      "discount" : this.updateTicket.value.discount,
    }

    this.ticketSrv.updateTicketTypeById(requestObject, this.ticketTypeId).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data,"Success");
          this.router.navigate(['/admin/ticket-type-list'])
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
