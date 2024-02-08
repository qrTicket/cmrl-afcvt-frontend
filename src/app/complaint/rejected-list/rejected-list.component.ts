import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { Subscription } from 'rxjs/Subscription';
import { DataTableDirective } from "angular-datatables";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ComplainService } from '../_complainservices/complain.service';

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
    private complainService: ComplainService
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.assignComplaintList();
  }

  assignComplaintList() {
    this.complainService.rejectedComplaintList().subscribe((res) => {
      this.rejectedlist = res['data'];
    });
  }


}
