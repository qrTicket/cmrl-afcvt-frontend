import { Component, OnInit } from "@angular/core";
import { GateConfig } from "../_model/gate-config.model";
import { StationService } from "../_services/station.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-history-by-gate',
  templateUrl: './history-by-gate.component.html',
  styleUrls: ['./history-by-gate.component.scss']
})
export class HistoryByGateComponent implements OnInit {

  public temp: Boolean = false;
  data: any;
  successmsg: any;
  errormsg: any;
  subscriptions: Subscription[] = [];
  value: any;
  selectedGateName: [];
  gateNameList: any;
  gateSelectedStatus: any;
  store: any;
  allGate: any;
  selected: any;
  error: any;

  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  searchTerm: any;
  dataRefresher: any;


  constructor(
    private stationService: StationService,
    private toastr: ToastrService,
  ) { }

  dtOptions: DataTables.Settings = {};
  private killTrigger: Subject<void> = new Subject();

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.dtTrigger.next(true); // to rerender the table when next function is called
    this.gateDetails();

  }

  gateDetails() {
    this.gateNameList = this.stationService.getConfiguredEquip();
    // this.gateNameList.subscribe(res => {
    //   if(res['status'] === "1"){
    //     this.gateSelectedStatus = res.data;
         
    //   }
      
    // });

    this.stationService.getConfiguredEquip().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.gateSelectedStatus = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  onSelect() {
    // this.toastr.info("", this.successmsg);
     const displayName = this.selectedGateName;
    // this.gateNameList.subscribe((res) => {
    //   this.store = res.data;
    //   // console.log('this.store', this.store);
    //   const gatename = this.store.filter(
    //     (x) => x.gateName === displayName
    //   )[0].gateName;
    //   this.allGate = this.stationService.getDetailsByGateName(gatename);
    //   this.allGate.subscribe((res2) => {
    //     this.selected = res2.data;
    //     // this.toastr.success("", this.successmsg);

    //   }
    //     //      ,
    //     // (error) => {
    //     //   this.error = error;
    //     //   this.toastr.error("", this.error.data);
    //     // }
    //   );
    // });
    
    this.stationService.getConfiguredEquip().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          
          this.store = res.data;
          const gatename = this.store.filter((x) => x.gateName === displayName)[0].gateName;
          this.getDetailsOfGateByGateName(gatename);
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  getDetailsOfGateByGateName(gatename:any){
    this.stationService.getDetailsByGateName(gatename).subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.selected = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
    
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
    this.killTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(true);
    });
  }

}
