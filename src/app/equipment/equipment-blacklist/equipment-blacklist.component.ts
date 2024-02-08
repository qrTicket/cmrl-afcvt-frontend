import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

import { Equipment } from "../_models/equipment.model";
import { EquipmentService } from "../_services/equipment.service";
@Component({
    selector: "app-equipment-blacklist",
    templateUrl: "./equipment-blacklist.component.html",
    styleUrls: ["./equipment-blacklist.component.scss"],
})
export class EquipmentBlacklistComponent implements OnInit, OnDestroy {
    blacklisted: Equipment[];
    subscription: Subscription = new Subscription();
    temp = false;
    errormsg;
    constructor(
        private equipment_API: EquipmentService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.subscription = this.equipment_API.blacklistEquipment().subscribe(
            (res) => {
                this.spinner.hide();
                this.blacklisted = res;
                this.temp = true;
            },
            (error) => {
                this.spinner.hide();
                this.errormsg = error;
                this.toastr.error("", this.errormsg);
            }
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
