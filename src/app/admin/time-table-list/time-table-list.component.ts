import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimeTableService } from '../_services/time-table.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-time-table-list',
  templateUrl: './time-table-list.component.html',
  styleUrls: ['./time-table-list.component.scss']
})
export class TimeTableListComponent implements OnInit {
  timeTableList: any[] = [];
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
      private timeTblSrv: TimeTableService,
      private modalSrv:BsModalService
      ) {}

  ngOnInit() {
    this.getTimeTableList();
  }

  getTimeTableList() {
    this.timeTblSrv.getTimeTableList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.timeTableList = res.data;
          this.temp = true;
          console.log(this.timeTableList,'this.timeTableList')
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
  this.timeTblSrv.changeStatus(reqObj, this.Id).subscribe({
    next:(res)=>{
      if(res.status === "0"){
        this.toaster.error(res.data,'Error!')
        this.modalRef.hide();
      }
      else if(res.status === "1"){
       this.toaster.success(res.data)
       this.modalRef.hide();
       this.getTimeTableList();
      }
    },
    error:(err)=>{
      this.toaster.error(err.error.data,'Error!')
      this.modalRef.hide();
      this.getTimeTableList();
    }
  })  
}

decline() {
  this.modalRef.hide();
  this.getTimeTableList();
}

}
