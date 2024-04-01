import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DayTypeService } from '../_services/day-type.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TimeTableService } from '../_services/time-table.service';

@Component({
  selector: 'app-day-type-list',
  templateUrl: './day-type-list.component.html',
  styleUrls: ['./day-type-list.component.scss']
})
export class DayTypeListComponent implements OnInit {
  dayTypeList: any[] = [];
  public temp: Object = false;
  timeTable:boolean = false;
  modalRef: BsModalRef;
    config = {
      animated: true,
      backdrop: true,
      ignoreBackdropClick: false,
      class:'modal-lg'
    };
    Id:number;
    statusValue:any;
    // timeslots:any[]=[];

  constructor(
      private toaster: ToastrService,
      private router: Router,
      private dayTypeSrv:DayTypeService,
      private modalSrv:BsModalService
      ) {}

  ngOnInit() {
      this.getDayTypeList();
  }

  showTimeTable(){
    this.timeTable = true
  }

  getDayTypeList() {
    this.dayTypeSrv.getDayTypeList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.dayTypeList = res.data;
          this.temp = true;
          console.log(this.dayTypeList,'this.dayTypeList')
        }
      },
      error:(err)=>{
        this.toaster.error(err.error.data,'Error!')
      }
    })    
  }

  openModal(templateTimeTable: TemplateRef<any>) {
    this.modalRef = this.modalSrv.show(templateTimeTable, this.config);
  }

  decline() {
    this.modalRef.hide();
    this.getDayTypeList();
  }

  editData(id:number){
    this.modalRef.hide();
    this.router.navigate(['/admin/day-timeSlot-map-update', id])
  }

  openStatusModal(templateActive: TemplateRef<any>, templateDeactivate: TemplateRef<any>,  e:any, id:number) {
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
  this.dayTypeSrv.changeStatus(reqObj, this.Id).subscribe({
    next:(res)=>{
      if(res.status === "0"){
        this.toaster.error(res.data,'Error!')
        this.modalRef.hide();
        this.getDayTypeList();
      }
      else if(res.status === "1"){
       this.toaster.success(res.data)
       this.modalRef.hide();
       this.getDayTypeList();
      }
    },
    error:(err)=>{
      this.toaster.error(err.error.data,'Error!')
      this.modalRef.hide();
      this.getDayTypeList();
    }
  })  
}

}
