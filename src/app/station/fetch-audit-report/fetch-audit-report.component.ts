import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StationService } from '../_services/station.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdmindashboardService } from 'src/app/admin/_services/admindashboard.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-fetch-audit-report',
  templateUrl: './fetch-audit-report.component.html',
  styleUrls: ['./fetch-audit-report.component.scss']
})
export class FetchAuditReportComponent implements OnInit {

// auditFileData: any[] = [];
//   public stationData: Object;
//   public temp: Object = false;

//   constructor(
//     private toaster: ToastrService,
//     private stationSrv: StationService,
//   ) { }

//   ngOnInit() {
//     this.getAuditFile();
//   }

//   getAuditFile() {
//     this.stationSrv.getAuditFile().subscribe({
//       next: (res) => {
//         if (res.status === "0") {
//           this.toaster.error(res.data, 'Error!')
//         }
//         else if (res.status === "1") {
//           this.auditFileData = res.data;
//           this.temp = true;
//         }
//       },
//       error: (err) => {
//         this.toaster.error(err.error.data, 'Error!')
//       }
//     })
//   }


@ViewChild('fileExtn') fileExtn:ElementRef<any>;

  public temp: Object = true;
  @ViewChild(DataTableDirective, { static: false }) datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  auditFileData: any[] = [];
  public stationData: Object;
  customFilterForm: FormGroup;
  stationList: any[] = [];
  fileExtension:any[] =[
    { 'name':'CSV', 'extension':'csv' },
    { 'name':'XLSX', 'extension':'xlsx' },
  ];

  constructor(
    private toastr: ToastrService,
    private adminSrv: AdmindashboardService,
    private fb: FormBuilder
  ) { }



  ngOnInit() {
    this.initializeFilterForm();
    this.dataTableAjaxCall();
    this.getStationList();
    // this.getFilteredResponse();
    // this.getAuditFile();    
  }

  initializeFilterForm() {
    this.customFilterForm = this.fb.group({
      stationCode: [''],
      dateFrom: [''],
      dateUpto: ['']
    })
  }

  // getAuditFile() {
  //   this.adminSrv.getAuditFile().subscribe({
  //     next: (res) => {
  //       if (res.status === "0") {
  //         this.toaster.error(res.data, 'Error!')
  //       }
  //       else if (res.status === "1") {
  //         this.auditFileData = res.data;
  //         this.temp = true;
  //       }
  //     },
  //     error: (err) => {
  //       this.toaster.error(err.error.data, 'Error!')
  //     }
  //   })
  // }

  // get station list for custom filter
  getStationList() {
    this.adminSrv.getStationList().subscribe({
      next: (resp: any) => {
        if (resp["status"] === "1") {
          this.stationList = resp.data;
          // console.log(this.stationList);
        }
      },
      error: (err: any) => {
        this.toastr.error(err.error.data, 'ERROR')
      }
    })
  }

  dataTableAjaxCall() {
    // console.log(`in log`);
    this.dtOptions = {
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      // processing: true,
      language: {
        searchPlaceholder: "Type in here..."
      },
      ajax: (dataTablesParameters: any, callback) => {
        let reqObj = {
          "filters": {
            "stationName": null,
            "fromDate": this.customFilterForm.value.dateFrom ? formatDate(this.customFilterForm.value.dateFrom, 'dd-MM-yyyy', 'en') : null,
            "toDate": this.customFilterForm.value.dateUpto ? formatDate(this.customFilterForm.value.dateUpto, 'dd-MM-yyyy', 'en') : null
          },
          "pageRequest": dataTablesParameters
        }
        this.adminSrv.postAuditFileList(reqObj)
          .subscribe((resp: any) => {
            if (resp["status"] === "1") {
              this.temp = true;
              this.auditFileData = resp.data;
              
              // console.log(this.auditFileData, 'audit list list');
              callback({ 
                recordsTotal: resp.totalSize,
                recordsFiltered: resp.totalSize,
                data: []
              })
            }
          })
      },
      ordering: true,
      lengthMenu: ['5', '10', '20', '50', '100']
    }
  }

  reRenderDatatable() {
    this.temp = false;
    this.datatableElement.dtInstance.then((instance: DataTables.Api) => {
      instance.clear();
      this.dataTableAjaxCall();
      instance.draw();
    })
  }

  //download file in prescribed format
  onFileExtensionChange(e:any){
    let fileExt = e.target.value;

    let reqObj = {
      "stationName": this.customFilterForm.value.stationCode ? this.customFilterForm.value.stationCode : null,
      "fromDate": this.customFilterForm.value.dateFrom ? formatDate(this.customFilterForm.value.dateFrom, 'dd-MM-yyyy', 'en') : null,
      "toDate": this.customFilterForm.value.dateUpto ? formatDate(this.customFilterForm.value.dateUpto, 'dd-MM-yyyy', 'en') : null
  }

    this.adminSrv.downloadAuditFile(reqObj, fileExt).subscribe({
      next:(resp:any)=>{
        const blob = new Blob([resp], {type:'*/*'});
        console.log(resp.header, blob)
        saveAs(blob,`AuditFile.${fileExt}`);
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


}
function saveAs(blob: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}

