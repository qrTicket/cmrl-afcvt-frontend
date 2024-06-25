import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdmindashboardService } from '../_services/admindashboard.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { formatDate } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-transaction-qr-list',
  templateUrl: './transaction-qr-list.component.html',
  styleUrls: ['./transaction-qr-list.component.scss']
})
export class TransactionQrListComponent implements OnInit {
  @ViewChild('fileExtn') fileExtn:ElementRef<any>;
  //title = 'datatables';
  public temp: Object = false;
  @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isDtInit: boolean = false;

  txnList:any[]=[];
  customFilterForm:FormGroup;
  stationList:any[]=[];
  item:any;
  fileExtension:any[] =[];

  ticketType:any [] = [
    { "ticketCode" : "QR", "ticketValue" : "QR" },
    // { "ticketCode" : "NCMC", "ticketValue" : "NCMC" },
    // { "ticketCode" : "ALL", "ticketValue" : "ALL" },
  ];

  modalRef: BsModalRef;
    config = {
      animated: true,
      backdrop: true,
      ignoreBackdropClick: false,
      class: 'modal-lg'
    };

   

  constructor(
    private adminSrv:AdmindashboardService,
    private fb:FormBuilder,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.customFilterForm = this.fb.group({
      stationCode:[''],
      dateFrom:[''],
      dateUpto:['']
    })
    this.getStationList();
    this.getFileExtensionList();
   // this.dataTableAjaxCall();
   this.getFilteredResponse();
  }

  // calling server side API through ajax
  dataTableAjaxCall(){
    console.log(`in log`);
    this.dtOptions = {
      paging : true,
      pagingType: 'full_numbers',
      pageLength: 10, 
      serverSide:true,
      // processing: true,
      language:{
        searchPlaceholder:"Type in here..."
      },
      ajax: (dataTablesParameters:any, callback) => 
      {
        
        let reqObj = {
          "customFilters": [
              {
                  "attributeName": "sourceStation",
                  "searchValue": this.customFilterForm.value.stationCode ? this.customFilterForm.value.stationCode : null
              },
              {
                  "attributeName": "transactionAfter",
                  "searchValue": this.customFilterForm.value.dateFrom ? formatDate(this.customFilterForm.value.dateFrom,'dd-MM-yyyy','en')  : null
              },
              {
                  "attributeName": "transactionBefore",
                  "searchValue": this.customFilterForm.value.dateUpto ? formatDate(this.customFilterForm.value.dateUpto,'dd-MM-yyyy','en')  : null
              }
          ],
          "paginationRequest": dataTablesParameters
        }
        this.adminSrv.postTransactionList(reqObj)
        .subscribe((resp:any) => 
        {
          if(resp["status"] === "1"){
            this.txnList = resp.data; 
            this.temp  = true; 
            console.log(this.txnList,'txn list'); 
            callback({
              recordsTotal: resp.totalSize,  
              recordsFiltered: resp.totalSize, 
              data: []
            })            
          }
        })
      },
      ordering:true,
      lengthMenu:['5','10','20','50','100']
    }
  }

  // get file extension for custom filter
  getFileExtensionList(){
    this.adminSrv.getFileExtensionForTransactions().subscribe({
      next:(resp:any)=>{
        if(resp["status"] === "1"){
          this.fileExtension = resp.data;
          console.log(this.fileExtension);
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'ERROR')
      }
    })
  }

  // get station list for custom filter
  getStationList(){
    this.adminSrv.getStationList().subscribe({
      next:(resp:any)=>{
        if(resp["status"] === "1"){
          this.stationList = resp.data;
          console.log(this.stationList);
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'ERROR')
      }
    })
  }

  //method to get list of all transactions
  getFilteredResponse(){
    this.dtOptions = {
      paging : true,
      pagingType: 'full_numbers',
      pageLength: 10, 
      processing: true,
      language:{
        searchPlaceholder:"Type in here..."
      },
      ordering:true,
      lengthMenu:['5','10','20','50','100']
    }

    let reqObj = {
      "stationCode":this.customFilterForm.value.stationCode ? this.customFilterForm.value.stationCode : null,
      "fromDate":this.customFilterForm.value.dateFrom ? formatDate(this.customFilterForm.value.dateFrom,'dd-MM-yyyy','en')  : null,
      "toDate" : this.customFilterForm.value.dateUpto ? formatDate(this.customFilterForm.value.dateUpto,'dd-MM-yyyy','en')  : null,
      // "ticketType" : this.Search.value.ticketType ? this.Search.value.ticketType : 'ALL',
    }

    this.adminSrv.customFilterPostRequestForQR(reqObj).subscribe({
      next:(resp:any)=>{
        if(resp["status"] === "1"){
          this.txnList = [];
          this.temp  = true;
          this.txnList = resp.data;
          // this.item = this.txnList;
          console.log(this.txnList);
          //this.rerender();
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'ERROR')
      }
    })
  }

  //download file in prescribed format
  onFileExtensionChange(e:any){
    let fileExt = e.target.value;
    console.log(fileExt,'file ext')

    let reqObj = {
      "stationCode":this.customFilterForm.value.stationCode ? this.customFilterForm.value.stationCode : null,
      "fromDate":this.customFilterForm.value.dateFrom ? formatDate(this.customFilterForm.value.dateFrom,'dd-MM-yyyy','en')  : null,
      "toDate" : this.customFilterForm.value.dateUpto ? formatDate(this.customFilterForm.value.dateUpto,'dd-MM-yyyy','en')  : null,
      "ticketType" : this.customFilterForm.value.ticketType ? this.customFilterForm.value.ticketType : 'ALL',
    }

    this.adminSrv.downloadQrTxnFile(reqObj, fileExt).subscribe({
      next:(resp:any)=>{
        const blob = new Blob([resp], {type:'*/*'});
        saveAs(blob,`QrTransaction.${fileExt}`);
        this.fileExtn.nativeElement.value = "";
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'ERROR')
      }
    })

  }

  // This code will run after the component's view has been initialized i.e datatable has been initialized
  ngAfterViewInit(): void {
    // load data-table first time and then re-render from every time
    this.dtTrigger.next(true);
  }

  // will destroy datatable trigger
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // this will rerender/reload datatable after unsubscribing/destroring dtTrigger
  // reRenderDatatable() {
  //   this.datatableElement.dtInstance.then((instance:DataTables.Api)=>{
  //     instance.ajax.reload(null, false);
  //     this.dataTableAjaxCall()
  //   })
  // }
  reRenderDatatable() {
    this.temp = false;
    this.datatableElement.dtInstance.then((instance:DataTables.Api)=>{
      instance.clear();
      this.getFilteredResponse();
      instance.draw();
    })
  }

}
