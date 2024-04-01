import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from '../_services/ticket.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ticket-subtype-list',
  templateUrl: './ticket-subtype-list.component.html',
  styleUrls: ['./ticket-subtype-list.component.scss']
})
export class TicketSubtypeListComponent implements OnInit {
  ticketSubTypeList: any[] = [];
  public temp: Object = false;
  modalRef: BsModalRef;
    config = {
      animated: true,
      backdrop: true,
      ignoreBackdropClick: false,
    };
  Id:number;
  statusValue:any;

  constructor(
      private toaster: ToastrService,
      private router: Router,
      private ticketSrv: TicketService,
      private modalSrv:BsModalService
      ) {}

  ngOnInit() {
    this.getTicketSubTypeList();
  }

  getTicketSubTypeList() {
    this.ticketSrv.getTicketSubTypeList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.ticketSubTypeList = res.data;
          this.temp = true;
          console.log(this.ticketSubTypeList,'this.ticketSubTypeList')
        }
      },
      error:(err)=>{
        this.toaster.error(err.error.data,'Error!')
      }
    })    
  }

  openModal(templateActive: TemplateRef<any>, templateDeactivate: TemplateRef<any>,  e:any, id:number) {
    console.log("checked value => ", e.target.value);
    //incoming false
    if(e.target.value === 'false' ){
      this.modalRef = this.modalSrv.show(templateDeactivate, this.config);
      this.Id = id;
      this.statusValue = e.target.value
    }
    //incoming true
    else if(e.target.value === 'true'){
      this.modalRef = this.modalSrv.show(templateActive, this.config);
      this.Id = id;
      this.statusValue = e.target.value
    }
}

confirm(){
  let reqObj = {
    "status" : this.statusValue
  }
  this.ticketSrv.changeStatus(reqObj, this.Id).subscribe({
    next:(res)=>{
      if(res.status === "0"){
        this.toaster.error(res.data,'Error!')
        this.modalRef.hide();
      }
      else if(res.status === "1"){
       this.toaster.success(res.data)
       this.modalRef.hide();
       this.getTicketSubTypeList();
      }
    },
    error:(err)=>{
      this.toaster.error(err.error.data,'Error!')
      this.modalRef.hide();
      this.getTicketSubTypeList();
    }
  })  
}

decline() {
  this.modalRef.hide();
  this.getTicketSubTypeList();
}

}
