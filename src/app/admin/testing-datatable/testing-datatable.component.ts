import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdmindashboardService } from '../_services/admindashboard.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTablePayload } from '../_models/custom-datatable.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { formatDate } from '@angular/common';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
  searchValue:any;
}

@Component({
  selector: 'app-testing-datatable',
  templateUrl: './testing-datatable.component.html',
  styleUrls: ['./testing-datatable.component.scss']
})
export class TestingDatatableComponent implements OnInit {
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  txnList:any[]=[];
  Search:FormGroup;
  stationList:any[]=[];
  item:any;
  dataTbl:any;

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
    private toastr:ToastrService,
    private modalSrv:BsModalService
  ) { }

  ngOnInit() {
    this.dataTableAjaxCall();
    this.getStationList();
    this.Search = this.fb.group({
      stationCode:[''],
      dateFrom:[''],
      dateUpto:[''],
      ticketType:[''],
    })
    console.log(this.dtOptions);
  }

  getStationList(){
    this.adminSrv.getStationList().subscribe({
      next:(resp:any)=>{
        if(resp["status"] === "1"){
          this.stationList = resp.data;
          console.log(this.stationList);
          
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data)
      }
    })
  }

  dataTableAjaxCall(){
    this.dtOptions = {
      paging : true,
      pagingType: 'full_numbers',
      pageLength: 10, 
      serverSide:true,
      language:{
        searchPlaceholder:"Type in here..."
      },
      ajax: (dataTablesParameters:DataTablePayload, callback) => 
      {
        
        // const customParams = this.getFilteredResponse();
        const customParams = {
          stationCode : this.Search.value.stationCode ? this.Search.value.stationCode : null,
          fromDate : this.Search.value.dateFrom ? formatDate(this.Search.value.dateFrom,'dd-MM-yyyy','en')  : null,
          toDate : this.Search.value.dateUpto ? formatDate(this.Search.value.dateUpto,'dd-MM-yyyy','en')  : null,
          ticketType : this.Search.value.ticketType ? this.Search.value.ticketType : 'ALL'
        }

        const params = {
          ...dataTablesParameters,
          ...customParams
        }
        this.adminSrv.postTransactionList(params)
        .subscribe((resp:any) => 
        {
          if(resp["status"] === "1"){
            this.txnList = resp.data;  
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

  getFilteredResponse(e:Event){
    
    //this.dtOptions.drawCallback;
    
    // return {
    //   stationCode : this.Search.value.stationCode ? this.Search.value.stationCode : null,
    //   fromDate : this.Search.value.dateFrom ? formatDate(this.Search.value.dateFrom,'dd-MM-yyyy','en')  : null,
    //   toDate : this.Search.value.dateUpto ? formatDate(this.Search.value.dateUpto,'dd-MM-yyyy','en')  : null,
    //   ticketType : this.Search.value.ticketType ? this.Search.value.ticketType : 'ALL'
    // }
  }

}
