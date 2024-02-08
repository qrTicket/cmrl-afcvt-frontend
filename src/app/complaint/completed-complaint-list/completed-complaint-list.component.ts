import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { Subscription } from 'rxjs/Subscription';
import { DataTableDirective } from "angular-datatables";
import { ComplainService } from '../_complainservices/complain.service';

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

  resolvedlist: any;
  successmsg;
  errormsg;
  subscriptions: Subscription[] = [];


  constructor(
    private complainService: ComplainService
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.resolvedComplaintList();
  }

  resolvedComplaintList() {
    this.complainService.resolvedComplaintList().subscribe((res) => {
      this.resolvedlist = res['data'];
    });
  }

}
