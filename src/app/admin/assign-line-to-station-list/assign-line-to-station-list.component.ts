import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LineToStation } from '../_models/linetostation.model';
import { LineToStationService } from '../_services/linetostation.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-assign-line-to-station-list',
  templateUrl: './assign-line-to-station-list.component.html',
  styleUrls: ['./assign-line-to-station-list.component.scss']
})
export class AssignLineToStationListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  linetostation: LineToStation [] = [];
  public linetostationData: Object;
  public temp: Object = false;
  searchTerm: any;

  constructor(
    private linetostationapi: LineToStationService,
    private toastr:ToastrService
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.linetostationlist();
  }

  linetostationlist() {
    this.linetostationapi.getLineToStation().subscribe(data => {
      this.linetostation = data;
      console.log(this.linetostation);
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
      this.dtTrigger.next(true);
    });
    this.linetostationapi.getLineToStation().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.linetostation = res.data;
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
