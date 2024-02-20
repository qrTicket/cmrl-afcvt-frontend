import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { Subscription } from 'rxjs';
import { DataTableDirective } from "angular-datatables";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ComplainService } from '../_complainservices/complain.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.scss']
})
export class RejectedListComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    animated: true,
    backdrop: true,
    ignoreBackdropClick: false,
  };
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  rejectedlist: any;
  successmsg;
  errormsg;
  subscriptions: Subscription[] = [];


  constructor(
    private complainService: ComplainService,
    private toastr:ToastrService
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.assignComplaintList();
  }

  assignComplaintList() {
    // this.complainService.rejectedComplaintList().subscribe((res) => {
    //   this.rejectedlist = res['data'];
    // });
    this.complainService.rejectedComplaintList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.rejectedlist = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }


}
