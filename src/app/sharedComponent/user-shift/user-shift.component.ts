import { Component, OnInit, ViewChild } from '@angular/core';
import { UsershiftService } from 'src/app/sharedServices/usershift.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';

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
    private usershiftService: UsershiftService,
    private toastr:ToastrService
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.userShift();
  }

  userShift() {
    // this.usershiftService.getUserShift().subscribe(res => {
    //   this.usershift = res["data"];
    //   this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 5,
    //     processing: true
    //   };
    //   this.dtTrigger.next(true); // to rerender the table when next function is called 

    // });
    this.usershiftService.getUserShift().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.usershift = res.data;
          this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true
          };
          this.dtTrigger.next(true);
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
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
