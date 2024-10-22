import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from '../_services/ticket.service';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-ticket-subtype-add',
  templateUrl: './ticket-subtype-add.component.html',
  styleUrls: ['./ticket-subtype-add.component.scss']
})
export class TicketSubtypeAddComponent implements OnInit {
  addTicketSubType: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private ticketService: TicketService,
  ) { }
  

   ngOnInit() {
    this.addTicketSubType = this.formBuilder.group({
      ticketSubTypeName: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!', allowWhiteSpace:true})
      ]],
      ticketSubTypeCode: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        // RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!'})
        RxwebValidators.pattern({expression:{'onlyAlpha': /^[A-Za-z]+(?:_[A-Za-z]+)*$/}, 
          message:'ERROR! Only alphabets and underscore(_) is allowed and underscore(_) is not allowed at start and end of string!' })
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
    return this.addTicketSubType.controls;
  }

  cancel(){
    this.router.navigate(['/admin/ticket-sub-type-list'])
  }

   onFormSubmit() {
    if(this.addTicketSubType.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "ticketSubTypeName" : this.addTicketSubType.value.ticketSubTypeName,
      "ticketSubTypeCode" : this.addTicketSubType.value.ticketSubTypeCode,
      "discount" : this.addTicketSubType.value.discount,
    }

    this.ticketService.addTicketSubType(requestObject).subscribe({
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
