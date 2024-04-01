import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { FareService } from '../_services/fare.service';
import { AddMedia } from '../_models/addMediaType';
import { MediaService } from '../_services/media.service';
import { TicketService } from '../_services/ticket.service';


@Component({
  selector: 'app-media-type-edit',
  templateUrl: './media-type-edit.component.html',
  styleUrls: ['./media-type-edit.component.scss']
})
export class MediaTypeEditComponent implements OnInit {
  updateMedia: FormGroup;
  submitted = false;
  mediaTypeId:number;
  ticketTypeList: any[] = [];
  ticketIds:any[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private mediaSrv: MediaService,
    private activatedRoute:ActivatedRoute,
    private ticketSrv: TicketService
  ) { }
  

   ngOnInit() {
    this.activatedRoute.params.subscribe((dataInUrl:any)=>{
      this.mediaTypeId = dataInUrl['id'];
    })

    this.updateMedia = this.formBuilder.group({
      mediaTypeName: ['', [RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.alpha({message:'ERROR! Only alphabets are allowed!', allowWhiteSpace:true})]],
      mediaTypeCode: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      discount: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:true, message:'ERROR! Only digits are allowed!' })
      ]],
      //ticketTypeIds: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]]
    });
    this.getMediaTypeDataById(this.mediaTypeId);
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
    return this.updateMedia.controls;
  }

  getMediaTypeDataById(id:number){
    this.mediaSrv.getMediaTypeById(id).subscribe({
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
    // for(let i=0;i<respData.ticketType.length;i++){
    //   this.ticketIds.push(<string>respData.ticketType[i].id);
    // }
    // console.log(this.ticketIds,'this.ticketIds')
    this.updateMedia.patchValue({
      mediaTypeName : respData.mediaTypeName ? respData.mediaTypeName : "",
      mediaTypeCode : respData.mediaTypeCode ? respData.mediaTypeCode : "",
      discount : respData.discount ? respData.discount : "",
      //ticketTypeIds : this.ticketIds,
    })
   

  }

  cancel(){
    this.router.navigate(['/admin/media-type-list'])
  }

   onFormSubmit() {
    if(this.updateMedia.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "mediaTypeName" : this.updateMedia.value.mediaTypeName,
      "mediaTypeCode" : this.updateMedia.value.mediaTypeCode,
      "discount" : this.updateMedia.value.discount,
      //"ticketTypeId" : this.updateMedia.value.ticketTypeIds
    }

    this.mediaSrv.updateMediaTypeById(requestObject, this.mediaTypeId).subscribe({
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
