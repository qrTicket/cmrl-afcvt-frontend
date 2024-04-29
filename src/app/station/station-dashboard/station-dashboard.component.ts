import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GateConfig } from "../_model/gate-config.model";
import { StationService } from "../_services/station.service";
//import { GateModel } from 'src/app/equipment/_models/gate.model';
import Swal from "sweetalert2";


@Component({
    selector: "app-station-dashboard",
    templateUrl: "./station-dashboard.component.html",
    styleUrls: ["./station-dashboard.component.scss"],
    animations: [],
})
export class StationDashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;
    dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject();

    public temp: Object = false;
    equipmentList: any;
    configuredList: GateConfig[] = [];

    public showmode: boolean = false;
    public mode: any = "Mode";

    public showlog: boolean = false;
    public log: any = "Log";

    North: String = 'North';
    South: String = 'South';

    alarmsList: any;

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private modalService: NgbModal,
        private stationAPI: StationService
    ) { }

    openScrollableContent(longContent) {
        this.modalService.open(longContent, { scrollable: true });
    }

    dtOptions: DataTables.Settings = {};

    ngOnInit() {
        // this.stationAPI.getHoverdataEquip().subscribe((res) => {
        //     (res) => (this.North = res.North);
        //     (res) => (this.South = res.South);
            
        //           if(res.status === "0"){
        //             //   this.spinner.hide();
        //             //   return this.toastr.error(res.data, "No data available!")
        //               //return Swal(res.data, "", "error");
        //               return Swal.fire({
        //                 text: res.data,
        //                 icon: "error"
        //               });

        //           }
        //           this.configuredList = res["data"];
        //           this.temp = true;
        //     // this.configuredList = res["data"];
        //     // this.temp = true;
        // });

        this.stationAPI.getHoverdataEquip().subscribe({
            next:(res)=>{
                if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                }
                else if(res.status === "1"){
                    this.North = res.North;
                    this.South = res.South;
                    
                    this.configuredList = res.data;
                    this.temp = true;
                }
            },
            error:(err)=>{
                this.toastr.error(err.error.data)
            }
        })

        this.alarmlist();
    }

    editConfig(item) {
        this.router.navigate(["/edit-config", item.gcId]);
    }

    alarmlist() {
    // this.stationAPI.getallAlarms().subscribe((res) => {
    //     this.alarmsList = res["data"];
    //     this.temp = true;
    // });
    this.stationAPI.getallAlarms().subscribe({
        next:(res)=>{
            if(res.status === "1"){
                this.temp = true;
                this.alarmsList = res.data;
            }
            else if(res.status === "0"){
                this.toastr.error(res.data)
            }
        },
        error:(err)=>{
            this.toastr.error(err.error.data)
        }
    })
}

}
