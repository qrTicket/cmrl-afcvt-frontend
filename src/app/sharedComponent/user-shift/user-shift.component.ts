import { Component, OnInit, ViewChild } from '@angular/core';
import { UsershiftService } from 'src/app/sharedServices/usershift.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-user-shift',
  templateUrl: './user-shift.component.html',
  styleUrls: ['./user-shift.component.scss']
})
export class UserShiftComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  searchTerm: any;
  usershift: any = [];
  constructor(
    private usershiftService: UsershiftService
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.userShift();
  }

  userShift() {
    this.usershiftService.getUserShift().subscribe(res => {
      this.usershift = res["data"];
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
      this.dtTrigger.next(true); // to rerender the table when next function is called 

    });
  }
  // to reload the data from datable when sorting or filtering function is called 

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(true);
    });
  }

}
