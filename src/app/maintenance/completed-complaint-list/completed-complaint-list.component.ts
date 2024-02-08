import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { Subscription } from 'rxjs/Subscription';
import { DataTableDirective } from "angular-datatables";
import { MainService } from '../_mainservices/main.service';

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
    private mainservice: MainService
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.closedComplaintList();
  }

  closedComplaintList() {
    this.mainservice.closedComplaintList().subscribe((res) => {
      this.closedlist = res['data'];
    });
  }

}
