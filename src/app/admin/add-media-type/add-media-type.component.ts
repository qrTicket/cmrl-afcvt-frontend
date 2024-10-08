import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { MediaService } from '../_services/media.service';
import { TicketService } from '../_services/ticket.service';


@Component({
  selector: 'app-add-media-type',
  templateUrl: './add-media-type.component.html',
  styleUrls: ['./add-media-type.component.scss']
})
export class AddMediaTypeComponent implements OnInit {
  addMedia: FormGroup;
  submitted = false;
  ticketTypeList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private MediaSrv: MediaService,
    private ticketSrv: TicketService
  ) { }
  

   ngOnInit() {
    this.addMedia = this.formBuilder.group({
      mediaTypeName: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!', allowWhiteSpace:true})
      ]],
      mediaTypeCode: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!'})
      ]],
      discount: ['', [ 
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        // RxwebValidators.maxLength({value:32, message:"ERROR! Maximum length acceptable is 20 digits!"}),
        RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber ,allowDecimal:true, message:'ERROR! Only numeric values or decimals are allowed' })

      ]],
      //ticketTypeIds: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
    }
    );
    //this.getTicketTypeList();
  }

  // getTicketTypeList() {
  //   this.ticketSrv.getTicketTypeList().subscribe({
  //     next:(res)=>{
  //       if(res.status === "0"){
  //         this.toastr.error(res.data,'Error!')
  //       }
  //       else if(res.status === "1"){
  //         this.ticketTypeList = res.data;
  //         console.log(this.ticketTypeList,'this.ticketTypeList')
  //       }
  //     },
  //     error:(err)=>{
  //       this.toastr.error(err.error.data,'Error!')
  //     }
  //   })    
  // }

  get fval() {
    return this.addMedia.controls;
  }

  cancel(){
    this.router.navigate(['/admin/media-type-list'])
  }

   onFormSubmit() {
    if(this.addMedia.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "mediaTypeName" : this.addMedia.value.mediaTypeName,
      "mediaTypeCode" : this.addMedia.value.mediaTypeCode,
      "discount" : this.addMedia.value.discount,
      //"ticketTypeId" : this.addMedia.value.ticketTypeIds
    }
    console.log(requestObject,'request Object')

    this.MediaSrv.addMedia(requestObject).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data,"Success");
          this.router.navigate(['/admin/media-type-list'])
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
