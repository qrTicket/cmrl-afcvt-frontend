import { Component, OnInit , ViewChild} from '@angular/core';
import { ComplaintService} from '../_services/complaint.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sentcomplaints',
  templateUrl: './sentcomplaints.component.html',
  styleUrls: ['./sentcomplaints.component.scss']
})
export class SentcomplaintsComponent implements OnInit {

  @ViewChild(DataTableDirective)
 datatableElement: DataTableDirective;
dtElement: DataTableDirective;
dtTrigger: Subject<any> = new Subject();

  complaints: any = [];
    public compData: Object;
    public temp: Object = false;
    searchTerm: any;
    complaintlist:any[];

  constructor(private complaintapi: ComplaintService, private http: HttpClient, private router: Router, private toastr:ToastrService) { }

  dtOptions: DataTables.Settings = {};
  
  ngOnInit()
   { 
     this.sentcomplaintslist();
   }

   sentcomplaintslist()
   {
    // this.complaintapi.getAllComplaints().subscribe(data => {
    //   //this.complaints = data;
    //   this.complaintlist = data;
    //   console.log(this.complaints);
    //   this.dtOptions = {
    //       pagingType: 'full_numbers',
    //       pageLength: 5,
    //       processing: true
    //     };
    //     this.dtTrigger.next(true); // to rerender the table when next function is called 
    // });

    this.complaintapi.getAllComplaints().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.complaintlist = res.data;
          console.log(this.complaints);
          this.dtOptions = {
              pagingType: 'full_numbers',
              pageLength: 5,
              processing: true
            };
            this.dtTrigger.next(true); // to rerender the table when next function is called 
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
