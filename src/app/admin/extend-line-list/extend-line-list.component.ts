import { Component, OnInit, ViewChild } from '@angular/core';
import { ExtendlineService } from '../_services/extendline.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Extend } from '../_models/extendline.model';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-extend-line-list',
  templateUrl: './extend-line-list.component.html',
  styleUrls: ['./extend-line-list.component.scss']
})
export class ExtendLineListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  //extend: Extend [] = [];
  extend: any [] = [];
  public extendData: Object;
  public temp: Object = false;
  searchTerm: any;

  constructor(
    private extendlineService: ExtendlineService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  dtOptions: DataTables.Settings = {};


  ngOnInit() {
    this.extendlinelist();
  }

  extendlinelist() {
    // this.extendlineService.getExtendlist().subscribe(data => {
    //   this.extend = data;
    //   console.log(this.extend);
    //   this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 5,
    //     processing: true
    //   };
    //   this.dtTrigger.next(true);
    // });
    this.extendlineService.getExtendlist().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.extend = res.data;
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
