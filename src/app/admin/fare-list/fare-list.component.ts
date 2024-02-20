import { Component, OnInit, ViewChild } from '@angular/core';
import { FareService } from '../_services/fare.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fare-list',
  templateUrl: './fare-list.component.html',
  styleUrls: ['./fare-list.component.scss']
})
export class FareListComponent implements OnInit {


  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  farelist: any;

  constructor(
    private fareService: FareService,
    private toastr: ToastrService,
  ) { }
  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.fareList();
  }

  fareList() {
    // this.fareService.getFareList().subscribe(res => {
    //   this.farelist = res["data"];
    //   this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 5,
    //     processing: true
    //   };
    //   this.dtTrigger.next(true);
    // });
    this.fareService.getFareList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.farelist = res.data;
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


}
