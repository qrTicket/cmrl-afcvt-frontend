import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { finalize } from "rxjs/operators";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import {
    RxwebValidators,
    ValidationAlphabetLocale,
} from "@rxweb/reactive-form-validators";

import { ProductService, EquipmentService } from "../_services/index";
import { StationService } from "../../admin/_services/station.service";
import { LinesService } from "src/app/admin/_services/lines.service";
import { SuperService } from "../../super/_superservices/super.service";
import { PTO } from "src/app/auth_models/pto.model";
@Component({
    selector: "app-equipment-add-gate",
    templateUrl: "./equipment-add.component.html",
    styleUrls: ["./equipment-add.component.scss"],
})
export class EquipmentAddGateComponent implements OnInit {
    addEquipmentForm: UntypedFormGroup;
    submitted = false;
    showMyMessage = false;
    successmsg;
    errormsg;
    unamePattern: any;
    isSaving = false;
    productList = [];
    stationList = [];
    statusList: any = [];
    directionList: any = [];
    listList = [];
    vendorlist: PTO[];
    constructor(
        private formBuilder: UntypedFormBuilder,
        private productService: ProductService,
        private lineService: LinesService,
        private superService: SuperService,
        private equipmentService: EquipmentService,
        private stationService: StationService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.addEquipmentForm = this.formBuilder.group({
            status: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            equipmentIpAddress: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.ip({
                        version: 1,
                        message: "This only accept ip v4!",
                    }),
                ],
            ],
            product: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            operatorName: [""],
            station: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            line: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            equipmentName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    
                ],
            ],
            equipmentNumber: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.digit({
                        message: "This accept only numbers!",
                    }),
                ],
            ],
            direction: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
        });

        this.productService.getProductList().subscribe((data) => {
            this.productList = data;
        });
        this.stationService.getStation().subscribe((res) => {
            this.stationList = res;
        });
        this.lineService.getLines().subscribe((res) => {
            this.listList = res;
        });
        this.equipmentService.getStatusList().subscribe((res) => {
            this.statusList = res;
        });
        this.equipmentService.getGateDirection().subscribe((res) => {
            this.directionList = res;
        });
        this.superService.getVendorList().subscribe((res) => {
            this.vendorlist = res;
        });
    }

    get fval() {
        return this.addEquipmentForm.controls;
    }
    onaddinvetFormSubmit() {
        
        this.submitted = true;
        this.isSaving = true;
        if (this.addEquipmentForm.invalid)
            return this.toastr.error("Invalid form", "Error incountered");

        // console.log(this.addEquipmentForm.value);
        this.spinner.show();
        this.equipmentService
            .postEquipment(this.addEquipmentForm.value)
            .subscribe(
                (res) => {
                    this.spinner.hide();
                    this.successmsg = res;
                    this.toastr.success("", this.successmsg.message, {
                        progressBar: true,
                    });
                },
                (error) => {
                    this.spinner.hide();
                    // console.log(error);
                    this.errormsg = error;
                    this.toastr.error("", this.errormsg.mesage, {
                        progressBar: true,
                    });
                }
            );
        this.addEquipmentForm.reset();
        this.submitted = false;
    }
}
