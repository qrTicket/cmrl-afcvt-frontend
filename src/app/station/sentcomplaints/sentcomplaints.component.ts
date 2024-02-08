import { Component, OnInit , ViewChild} from '@angular/core';
import { ComplaintService} from '../_services/complaint.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';

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

  constructor(private complaintapi: ComplaintService, private http: HttpClient, private router: Router) { }

  dtOptions: DataTables.Settings = {};
  
  ngOnInit()
   { 
     this.sentcomplaintslist();
   }

   sentcomplaintslist()
   {
    this.complaintapi.getAllComplaints().subscribe(data => {
      //this.complaints = data;
      this.complaintlist = data;
      console.log(this.complaints);
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
