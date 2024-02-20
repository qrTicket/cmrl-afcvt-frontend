import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject, Subscription } from "rxjs";

import { DataTableDirective } from "angular-datatables";
import { ComplainService } from '../_complainservices/complain.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.scss']
})
export class ProgressListComponent implements OnInit {

  
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  assignlist: any;
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
    // this.complainService.progressComplaintList().subscribe((res) => {
    //   this.assignlist = res['data'];
    // });
    this.complainService.progressComplaintList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.assignlist = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }


}
