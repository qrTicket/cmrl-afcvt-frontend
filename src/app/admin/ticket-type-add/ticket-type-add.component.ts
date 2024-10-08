import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { TicketService } from '../_services/ticket.service';

@Component({
  selector: 'app-ticket-type-add',
  templateUrl: './ticket-type-add.component.html',
  styleUrls: ['./ticket-type-add.component.scss']
})
export class TicketTypeAddComponent implements OnInit {
  addTicket: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private ticketService: TicketService,
  ) { }
  

   ngOnInit() {
    this.addTicket = this.formBuilder.group({
      ticketTypeName: ['', [RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!', allowWhiteSpace:true})]],
      ticketTypeCode: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!'})
      ]],
      discount: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        // RxwebValidators.maxLength({value:20, message:"ERROR! Maximum length acceptable is 20 digits!"}),
        RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:true, message:'ERROR! Only numeric values or decimals are allowed' })
      ]],
    }
    );

  }
  get fval() {
    return this.addTicket.controls;
  }

  cancel(){
    this.router.navigate(['/admin/ticket-type-list'])
  }

   onFormSubmit() {
    if(this.addTicket.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "ticketTypeName" : this.addTicket.value.ticketTypeName,
      "ticketTypeCode" : this.addTicket.value.ticketTypeCode,
      "discount" : this.addTicket.value.discount,
    }

    this.ticketService.addTicket(requestObject).subscribe({
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
