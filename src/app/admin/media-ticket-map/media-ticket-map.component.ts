import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../_services/media.service';
import { TicketService } from '../_services/ticket.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-media-ticket-map',
  templateUrl: './media-ticket-map.component.html',
  styleUrls: ['./media-ticket-map.component.scss']
})
export class MediaTicketMapComponent implements OnInit {
  mapMediaTicket: FormGroup;
  submitted = false;
  mediaTypeList:any[]=[];
  ticketTypeList: any[] = [];
  ticketSubTypeList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private mediaSrv: MediaService,
    private ticketSrv: TicketService
  ) { }
  

   ngOnInit() {
    this.mapMediaTicket = this.formBuilder.group({
      mediaTypeId: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      ticketTypeIds: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
      ticketSubTypeIds: ['', [RxwebValidators.required({message:"ERROR! This field is required!"})]],
    });

    this.getMediaTypeList();
    this.getTicketTypeList();
    this.getTicketSubTypeList();
  }

  getMediaTypeList() {
    this.mediaSrv.getActiveMediaTypeList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.mediaTypeList = res.data;
          console.log(this.mediaTypeList,'this.mediaTypeList')
        }
      },
      error:(err)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })    
  }

  getTicketTypeList() {
    this.ticketSrv.getTicketTypeList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.ticketTypeList = res.data;
          console.log(this.ticketTypeList,'this.ticketTypeList')
        }
      },
      error:(err)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })    
  }

  getTicketSubTypeList() {
    this.ticketSrv.getTicketSubTypeList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.ticketSubTypeList = res.data;
          console.log(this.ticketTypeList,'this.ticketTypeList')
        }
      },
      error:(err)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })    
  }

  get fval() {
    return this.mapMediaTicket.controls;
  }

  cancel(){
    this.router.navigate(['/admin/admindashboard'])
  }

   onFormSubmit() {
    console.log(this.mapMediaTicket.value, 'form values')
    if(this.mapMediaTicket.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "mediaTypeId" : this.mapMediaTicket.value.mediaTypeId,
      "ticketTypeId" : this.mapMediaTicket.value.ticketTypeIds,
      "ticketSubTypeId" : this.mapMediaTicket.value.ticketSubTypeIds,
    }

    this.mediaSrv.mapMediaTicket(requestObject).subscribe({
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
