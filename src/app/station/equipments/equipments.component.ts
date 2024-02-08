import { Component, OnInit, TemplateRef } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { StationService } from "../_services/station.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GateConfig } from '../_model/gate-config.model';

@Component({
    selector: "app-equipments",
    templateUrl: "./equipments.component.html",
    styleUrls: ["./equipments.component.scss"],
})
export class EquipmentsComponent implements OnInit {
    modalRef: BsModalRef;
    configForm: UntypedFormGroup;
    submitted: boolean = false;
    button = {};
    disabled = true;
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    equipmentList: any;
    directionIndicators: any;
    equipmentNumber: any;
    direction: any;
    public temp: Boolean = false;
    emergency: any;
    hightSecurity: any;
    mode: any;
    aisleMode: any;
    successmsg: any;
    error: any;
    constructor(
        private router: Router,
        private formbuilder: UntypedFormBuilder,
        private stationAPI: StationService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private modalService: BsModalService
    ) { }

    ngOnInit() {
        

        this.stationAPI.assignedGates().subscribe((res) => {
            this.equipmentList = res["data"];
            this.temp = true;
        });
    }

    openCongif(list) {
        if (list.deviceName == null) {
            this.router.navigate(["equipment/configuration", list.id]);
        }
        else {
            this.toastr.error("Equipment already configured.");

        }

    }

    //navigate to raise complain page with device id
    raiseComplain(device_id){
        this.router.navigate(["/raisecomplaint", device_id]);
    }


}
