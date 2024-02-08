import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { StationService } from "../_services/station.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { NgbPanelChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";


@Component({
    selector: "app-configuration-equipment",
    templateUrl: "./configuration-equipment.component.html",
    styleUrls: ["./configuration-equipment.component.scss"],
})
export class ConfigurationEquipmentComponent implements OnInit {
    configForm: UntypedFormGroup;
    submitted: boolean = false;
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    public temp: Boolean = false;
    assignId: any;

    directionIndicators: any;
    equipmentNumber: any;
    direction: any;
    emergency: any;
    mode: any;
    aisleMode: any;
    actionTypeList: any;
    queLengthList: any;
    flapSafetyTimeList: any;
    gateResetTimeList: any;
    buzzerVolumeList: any;
    lightIntensityList: any;
    sensorInactTimeList: any;
    terminalModeList: any;
    terminalList: any;

    error: any;
    successmsg: any;
    isSaving = false;

    constructor(
        private formbuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private stationAPI: StationService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const Iid = +params.get("id");
            this.assignId = Iid;
        });
        this.configForm = this.formbuilder.group({
            terminal: this.formbuilder.array([]),
            gateName: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            modeName: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            emergencyModeName: [
                "CLOSE",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            directionName: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            aisleModeName: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            directionIndicatorName: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            actionType: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            activationTime: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            deactivationTime: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            queLength: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            flapTime: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            gateResetTime: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            buzzerVolume: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            lightIntensity: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            sit: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
        });

        this.stationAPI.getDirectionIndicator().subscribe((res) => {
            this.directionIndicators = res["data"];
        });
        this.stationAPI.getEquipmentNumber().subscribe((res) => {
            this.equipmentNumber = res["data"];
        });
        this.stationAPI.getDirection().subscribe((res) => {
            this.direction = res["data"];
        });
        this.stationAPI.getEmergencyMode().subscribe((res) => {
            this.emergency = res["data"];
        });
        this.stationAPI.getModelList().subscribe((res) => {
            this.mode = res["data"];
        });
        this.stationAPI.getAislesMode().subscribe((res) => {
            this.aisleMode = res["data"];
        });
        this.stationAPI.getActionType().subscribe((res) => {
            this.actionTypeList = res["data"];
        });
        this.stationAPI.getQueLength().subscribe((res) => {
            this.queLengthList = res["data"];
        });
        this.stationAPI.getFlapSafetyTime().subscribe((res) => {
            this.flapSafetyTimeList = res["data"];
        });
        this.stationAPI.getGateResetTime().subscribe((res) => {
            this.gateResetTimeList = res["data"];
        });
        this.stationAPI.getBuzzerVolume().subscribe((res) => {
            this.buzzerVolumeList = res["data"];
        });
        this.stationAPI.getLightIntensity().subscribe((res) => {
            this.lightIntensityList = res["data"];
        });
        this.stationAPI.getSensorInactTime().subscribe((res) => {
            this.sensorInactTimeList = res["data"];
        });
        this.stationAPI.getTerminalMode().subscribe((res) => {
            this.terminalModeList = res["data"];
        });
        this.stationAPI.assignedTerminal().subscribe((res) => {
            this.terminalList = res["data"];
        });
    }
    terminal(): UntypedFormArray {
        return this.configForm.get("terminal") as UntypedFormArray;
    }

    newTerminal(): UntypedFormGroup {
        return this.formbuilder.group({
            terminalName: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            terminalIp: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            modeType: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            deviceId: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
        });
    }

    addTerminal() {
        this.terminal().push(this.newTerminal());
    }

    removeTerminal(i) {
        this.terminal().removeAt(i);
    }

    get fval() {
        return this.configForm.controls;
    }
    get item() { return this.fval.terminal as UntypedFormArray; }
    
    onFormSubmit() {
        this.submitted = true;
        this.isSaving = true;
        if (this.configForm.invalid)
            // return this.toastr.error("Please fill the details.");
            // return alert("Please fill the details.");
            //return swal("Please fill the details.", "", "error");
            return Swal.fire({
                title: "ERROR!",
                text:"Please fill the details",
                icon: "error"
              });
        this.spinner.show();
        this.stationAPI
            .gateTerminalConfig(this.configForm.value, this.assignId)
            .subscribe(
                (res) => {
                    if (res.status === "0") {
                        this.spinner.hide();
                        // return this.toastr.error(res.data);
                        //return swal(res.data, "", "error");
                        return Swal.fire({
                            title: "ERROR!",
                            text:res.data,
                            icon: "error"
                          });
                        // this.configForm.reset();
                    }
                    this.spinner.hide();
                    this.successmsg = res;
                    this.toastr.success("", this.successmsg.data);
                    this.router.navigate(["/stationdashboard"]);
                    
                },
                (error) => {
                    this.spinner.hide();
                    this.error = error;
                    //swal("", this.error.error, "error");
                    Swal.fire({
                        title: "ERROR!",
                        text:this.error.error,
                        icon: "error"
                      });
                    // this.toastr.error("", this.error.error, {
                    //     progressBar: true,
                    // });
                }
            );
        // this.configForm.reset();
        // this.submitted = false;
    }

    onReset() {
        // reset whole form back to initial state
        this.submitted = false;
        this.configForm.reset();
        this.item.clear();
    }
    onClear() {
        // clear errors and reset ticket fields
        this.submitted = false;
        this.item.reset();
    }
}
