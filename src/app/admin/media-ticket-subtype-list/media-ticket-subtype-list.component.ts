import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from '../_services/media.service';

@Component({
  selector: 'app-media-ticket-subtype-list',
  templateUrl: './media-ticket-subtype-list.component.html',
  styleUrls: ['./media-ticket-subtype-list.component.scss']
})
export class MediaTicketSubtypeListComponent implements OnInit {
  mediaTicketList: any[] = [];
  public temp: Object = false;
  modalRef: BsModalRef;
    statusValue: number;
    config = {
      animated: true,
      backdrop: true,
      ignoreBackdropClick: false,
    };
  mediaId:number;
  mediaStatusValue:any;

  constructor(
      private toaster: ToastrService,
      private router: Router,
      private mediaSrv:MediaService,
      private modalSrv:BsModalService
      ) {}

  ngOnInit() {
      this.getMediaTicketToTicketSubTypeList();
  }

  openModal(templateActive: TemplateRef<any>, templateDeactivate: TemplateRef<any>,  e:any, id:number) {
    console.log("checked value => ", e.target.value);
    //incoming false
    if(e.target.value === 'false' ){
      this.modalRef = this.modalSrv.show(templateDeactivate, this.config);
      this.mediaId = id;
      this.mediaStatusValue = e.target.value
    }
    //incoming true
    else if(e.target.value === 'true'){
      this.modalRef = this.modalSrv.show(templateActive, this.config);
      this.mediaId = id;
      this.mediaStatusValue = e.target.value
    }
}

getMediaTicketToTicketSubTypeList() {
    this.mediaSrv.getMediaTicketToTicketSubTypeList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.mediaTicketList = res.data.mappingData;
          this.temp = true;
          console.log(this.mediaTicketList,'this.mediaTicketList')
        }
      },
      error:(err)=>{
        this.toaster.error(err.error.data,'Error!')
      }
    })    
  }

  confirm(){
    let reqObj = {
      "status" : this.mediaStatusValue
    }
    this.mediaSrv.changeMediatypeMapStatus(reqObj, this.mediaId).subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
          this.modalRef.hide();
        }
        else if(res.status === "1"){
         this.toaster.success(res.data)
         this.modalRef.hide();
         this.getMediaTicketToTicketSubTypeList();
        }
      },
      error:(err)=>{
        this.toaster.error(err.error.data,'Error!')
        this.modalRef.hide();
        this.getMediaTicketToTicketSubTypeList();
      }
    })  
  }

  decline() {
    this.modalRef.hide();
    this.getMediaTicketToTicketSubTypeList();
  }

}
