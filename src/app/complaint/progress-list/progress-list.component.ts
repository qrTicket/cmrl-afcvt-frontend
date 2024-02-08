import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { Subscription } from 'rxjs/Subscription';
import { DataTableDirective } from "angular-datatables";
import { ComplainService } from '../_complainservices/complain.service';

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
    private complainService: ComplainService
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.assignComplaintList();
  }

  assignComplaintList() {
    this.complainService.progressComplaintList().subscribe((res) => {
      this.assignlist = res['data'];
    });
  }


}
