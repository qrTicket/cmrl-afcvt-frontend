import { Component, OnInit, ViewChild } from '@angular/core';
import { ZoneService } from '../_services/zone.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Zone } from '../_models/zone.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-zonelist',
  templateUrl: './zonelist.component.html',
  styleUrls: ['./zonelist.component.scss']
})
export class ZonelistComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  
  zone: Zone[] = [];
  
  constructor(
    private zoneservice: ZoneService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  dtOptions: DataTables.Settings = {};  

  ngOnInit() {
    this.zonelist();
  }

  zonelist() {
    // this.zoneservice.zoneList().subscribe(data => {
    //   this.zone = data;
    //   console.log(this.zone);
    //   this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 5,
    //     processing: true
    //   };
    //   this.dtTrigger.next(true);
    // });
    this.zoneservice.zoneList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.zone = res.data;
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
