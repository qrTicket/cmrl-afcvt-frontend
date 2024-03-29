import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../_services/transaction.service';

// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-transactionreports',
  templateUrl: './transactionreports.component.html',
  styleUrls: ['./transactionreports.component.scss'],
  // animations: [routerTransition()]
})
export class TransactionreportsComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  searchTerm: any;
  transaction: any = [];

  constructor(
    private transactservice: TransactionService,
    // private http: HttpClient,
    // private router: Router
    private toastr:ToastrService
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.transactionlist();
  }

  transactionlist() {
    this.transactservice.gettransaction().subscribe(res => {
      this.transaction = res["data"];
      // console.log(this.transaction, "Transactions");
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
      this.dtTrigger.next(true); // to rerender the table when next function is called 

    });

    this.transactservice.gettransaction().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.transaction = res.data;
          console.log(this.transaction);
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
