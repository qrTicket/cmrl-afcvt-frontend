import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { FareService } from "../_services/fare.service";
import { MediaService } from "../_services/media.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-media-type-list',
  templateUrl: './media-type-list.component.html',
  styleUrls: ['./media-type-list.component.scss']
})
export class MediaTypeListComponent implements OnInit {
  //@ViewChild('status') status:ElementRef<string>;

  mediaTypeList: any[] = [];
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
      this.getMediaTypeList();
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

  getMediaTypeList() {
    this.mediaSrv.getMediaTypeList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.mediaTypeList = res.data;
          this.temp = true;
          console.log(this.mediaTypeList,'this.mediaTypeList')
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
    this.mediaSrv.changeStatus(reqObj, this.mediaId).subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
          this.modalRef.hide();
        }
        else if(res.status === "1"){
         this.toaster.success(res.data)
         this.modalRef.hide();
         this.getMediaTypeList();
        }
      },
      error:(err)=>{
        this.toaster.error(err.error.data,'Error!')
        this.modalRef.hide();
        this.getMediaTypeList();
      }
    })  
  }

  decline() {
    this.modalRef.hide();
    this.getMediaTypeList();
  }


}
