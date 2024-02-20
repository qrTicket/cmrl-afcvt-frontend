import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import {
    RxwebValidators,
    ValidationAlphabetLocale,
} from "@rxweb/reactive-form-validators";
import { LinesService } from "../../admin/_services/lines.service";
import { StationService } from "../../admin/_services/station.service";
import { GateService } from "../_services/gate.service";
import { EquipmentService } from "../_services/equipment.service";
import { Terminal } from "../_models/terminal.model";
import { ProductService } from "../_services";
import { Product } from "../_models/product.model";
import { GateDirection } from "../_models/gate-direction.model";
import { TerminalService } from "../_services/terminal.service";
@Component({
    selector: "app-addgate",
    templateUrl: "./addgate.component.html",
    styleUrls: ["./addgate.component.scss"],
})
export class AddgateComponent implements OnInit {
    gateForm: FormGroup;
    gateList: Terminal[];
    blank = {};
    submitted = false;
    tervalue = null;
    successmsg;
    errormsg;
    gateDir: any;
    gateUin: any;
    show: boolean = false;
    lineList: any;
    stationList: any;
    directionList: GateDirection[];
    gateDirection: any;
    showSpinners = false;
    terminalList: Terminal[];
    constructor(
        private lineService: LinesService,
        private stationService: StationService,
        private productService: ProductService,
        private equipmentService: EquipmentService,
        private gateService: GateService,
        private terminalService: TerminalService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.gateForm = this.formBuilder.group({
            line: [
                "",

                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            station: [
                "",

                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            termID1: [
                "",

                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            termID2: [
                "",

                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            direction1: [
                "",
                RxwebValidators.required({
                    message: "select any one checkbox",
                }),
            ],
            direction2: [
                "",
                RxwebValidators.required({
                    message: "select any one checkbox",
                }),
            ],
            direction: [""],
            actionType: [""],
            version: [""],
            gateDirection: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            productId: [
                "",
                RxwebValidators.required({
                    message: "This field is required",
                }),
            ],
            gateName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            aisleMode: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            emergencyMode: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            queLength: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            flapSafetyTime: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            gateResetTime: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            buzzerVolume: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            lightIntensity: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            sensorInactTime: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            terminalIpAddress1: [""],
            activationTime1: [""],
            deactivationTime1: [""],
            editable1: [""],
            entryExitOverride1: [""],
            timeModeOverride1: [""],
            highSecurityMode1: [""],
            terminalIpAddress2: [""],
            activationTime2: [""],
            deactivationTime2: [""],
            editable2: [""],
            entryExitOverride2: [""],
            timeModeOverride2: [""],
            highSecurityMode2: [""],
        });
        this.valueChange();
        // this.changeDect();
        // this.lineService.getLines().subscribe((res) => {
        //     this.lineList = res;
        //     console.log(res);
        // });
        this.lineService.getLines().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.lineList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })



        // this.stationService.getStation().subscribe((res) => {
        //     this.stationList = res;
        //     console.log(res);
        // });
        this.stationService.getStation().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.stationList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })


        // this.productService.getProductList().subscribe((res) => {
        //     this.gateList = res;
        //     console.log(res);
        // });
        this.productService.getProductList().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.gateList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })

        // this.gateService.getGateDirection().subscribe((res) => {
        //     this.directionList = res;
        //     console.log(res);
        // });
        this.gateService.getGateDirection().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.directionList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })


        // this.equipmentService.getGateDirection().subscribe((res) => {
        //     this.gateDirection = res;
        //     console.log("Gate Direction", this.gateDirection);
        // });
        this.equipmentService.getGateDirection().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.gateDirection = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })


        // this.terminalService.getTerminalList().subscribe((res) => {
        //     console.log(res, "Terminal");
        //     this.terminalList = res;
        // });
        this.terminalService.getTerminalList().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.terminalList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }

    get fval() {
        return this.gateForm.controls;
    }
    valueChange() {
        this.gateForm.get("productId").valueChanges.subscribe((val) => {
            this.gateDir = val.productType.productName;
        });
    }
    changeDect() {
        this.gateForm.get("termID2").valueChanges.subscribe((val) => {
            console.log(val, "Terminal ID");
        });
    }

    onFormSubmit() {
        this.submitted = true;
        console.log(this.gateForm.value);

        if (this.gateForm.invalid)
            return this.toastr.error("Invalid form", "Error incountered");
        this.spinner.show();
        // this.gateService.postGate(this.gateForm.value).subscribe(
        //     (data) => {
        //         this.spinner.hide();
        //         console.log(data);
        //         this.successmsg = data;
        //         this.toastr.success("", "Terminal assign successfully!", {
        //             progressBar: true,
        //         });
        //     },
        //     (error) => {
        //         this.spinner.hide();
        //         console.log(error);
        //         this.errormsg = error;
        //         // this.toastr.error("", this.errormsg, {
        //         //     progressBar: true,
        //         // });
        //     }
        // );
        // this.gateForm.reset();
        // this.submitted = false;

        this.gateService.postGate(this.gateForm.value).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.spinner.hide();
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.spinner.hide();
                this.successmsg = res.data;
                this.toastr.success("", "Terminal assign successfully!", {
                    progressBar: true,
                });
                this.gateForm.reset();
                this.submitted = false;
              }
            },
            error:(err)=>{
                //this.toastr.error(err.error.data,'Error!')
                this.spinner.hide();
                console.log(err.error.data);
                this.errormsg = err.error.data;
            }
          })
    }
}
