import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { DataTableDirective } from 'angular-datatables';
import { GateModel } from "../_models/gate.model";
import { GateService } from "../_services/gate.service";
import { Subject } from 'rxjs';
import { ToastrService } from "ngx-toastr";


@Component({
    selector: "app-configure-gate",
    templateUrl: "./configure-gate.component.html",
    styleUrls: ["./configure-gate.component.scss"],
})
export class ConfigureGateComponent implements OnInit, OnDestroy {

    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;
    dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject();
    subscription: Subscription = new Subscription();
    gateList: any = [];
    public gateData: Object;
    public temp: Object = false;

    constructor(
        private gateService: GateService,
        private router: Router,
        private toastr:ToastrService
    ) { }
    dtOptions: DataTables.Settings = {};

    ngOnInit() {
        this.gateterminallist();
    }

    gateterminallist() {
        // this.gateService.getAllGate().subscribe((res) => {
        //     this.gateList = res;
        //     this.temp = true;
        //     console.log(res);
        //     this.dtOptions = {
        //         pagingType: 'full_numbers',
        //         pageLength: 5,
        //         processing: true
        //     };
        //     this.dtTrigger.next(true);
        // });
        this.gateService.getAllGate().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.gateList = res.data;
                this.temp = true;
                console.log(res);
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
