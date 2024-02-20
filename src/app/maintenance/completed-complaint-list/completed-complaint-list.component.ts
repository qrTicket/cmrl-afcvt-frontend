import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { Subscription } from 'rxjs';
import { DataTableDirective } from "angular-datatables";
import { MainService } from '../_mainservices/main.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-completed-complaint-list',
  templateUrl: './completed-complaint-list.component.html',
  styleUrls: ['./completed-complaint-list.component.scss']
})
export class CompletedComplaintListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  closedlist: any;
  successmsg;
  errormsg;
  subscriptions: Subscription[] = [];


  constructor(
    private mainservice: MainService,
    private toastr : ToastrService
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.closedComplaintList();
  }

  closedComplaintList() {
    // this.mainservice.closedComplaintList().subscribe((res) => {
    //   this.closedlist = res['data'];
    // });
    this.mainservice.closedComplaintList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.closedlist = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
