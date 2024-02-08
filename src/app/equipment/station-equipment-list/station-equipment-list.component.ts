import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { EquipmentService } from "../_services/equipment.service";
import { Equipment } from "../_models/equipment.model";

@Component({
    selector: "app-station-equipment-list",
    templateUrl: "./station-equipment-list.component.html",
    styleUrls: ["./station-equipment-list.component.scss"],
})
export class StationEquipmentListComponent implements OnInit {
    successmsg;
    errormsg;
    modalRef: BsModalRef;
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    equipmentList: Equipment[];
    public temp: Object = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private equipmentService: EquipmentService,
        private modalService: BsModalService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {}
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.config);
    }
    confirm(id) {
        this.equipmentService.deleteEquipment(id).subscribe((res) => {
            // console.log(res, "Record Deleted");
            this.equipmentService.getEquipment();
        });
        this.modalRef.hide();
    }

    decline(): void {
        // console.log("Declined");

        this.modalRef.hide();
    }
    ngOnInit() {
        this.spinner.show();
        this.equipmentService.getEquipment().subscribe(
            (data) => {
                this.spinner.hide();
                this.equipmentList = data.filter(
                    (equipment) => equipment.blacklist === false
                );

                this.temp = true;
                // console.log(data);
            },
            (error) => {
                // console.log(error);
                this.spinner.hide();
            }
        );
    }

    editEquipment(id) {
        this.router.navigate(["equipment/equipment-update", id]);
        console.log(id);
    }

    openBlacklistModel(blacklist: TemplateRef<any>) {
        this.modalRef = this.modalService.show(blacklist, this.config);
    }
    blacklist_confirm(id) {
        this.spinner.show();
        console.log(id, "Blacklist Successfully");
        this.equipmentService.blacklist_true(id).subscribe(
            (res) => {
                this.spinner.hide();
                this.successmsg = res;
                this.toastr.success("", this.successmsg.message);
                this.ngOnInit();
            },
            (error) => {
                this.spinner.hide();
                this.errormsg = error;
                this.toastr.error("", this.errormsg);
            }
        );
        this.modalRef.hide();
    }

    blacklist_decline(): void {
        console.log("Declined");

        this.modalRef.hide();
    }
}
