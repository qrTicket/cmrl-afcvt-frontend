import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { StationService } from "../_services/station.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { GateConfig } from "../_model/gate-config.model";
import Swal from 'sweetalert2';

@Component({
    selector: "app-edit-config",
    templateUrl: "./edit-config.component.html",
    styleUrls: ["./edit-config.component.scss"],
})
export class EditConfigComponent implements OnInit {
    editForm: UntypedFormGroup;
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
    hightSecurity: any;
    mode: any;
    aisleMode: any;
    entryExit: any;
    timeMode: any;
    actionTypeList: any;
    queLengthList: any;
    flapSafetyTimeList: any;
    gateResetTimeList: any;
    buzzerVolumeList: any;
    lightIntensityList: any;
    sensorInactTimeList: any;
    terminalModeList: any;

    error: any;
    successmsg: any;
    isSaving = false;

    data: any;
    terminalData: any;
    formdata: any;
    options: string[] = ["T1", "T2"];
    terminalList: any;

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
            const Iid = +params.get("gcId");
            this.assignId = Iid;
            if (Iid) {
                this.getGateId(Iid);
            }
        });
        this.editForm = this.formbuilder.group({
            terminal: this.formbuilder.array([]),
            gateName: [{ value: "", disabled: true }],
            modeName: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            emergencyModeName: [{ value: "", disabled: true }],

            directionName: [{ value: "", disabled: true }],

            aisleModeName: [{ value: "", disabled: true }],

            directionIndicatorName: [{ value: "", disabled: true }],

            actionType: [{ value: "", disabled: true }],

            version: [{ value: "", disabled: true }],

            activationTime: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            // [{ value: "", disabled: true }],

            deactivationTime: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],

            queLength: [{ value: "", disabled: true }],

            flapTime: [{ value: "", disabled: true }],

            gateResetTime: [{ value: "", disabled: true }],

            buzzerVolume: [{ value: "", disabled: true }],

            lightIntensity: [{ value: "", disabled: true }],
            sit: [{ value: "", disabled: true }],
        });

        this.stationAPI.getDirectionIndicator().subscribe((res) => {
            // console.log(res, "Direction Indicator");
            this.directionIndicators = res["data"];
        });
        this.stationAPI.getEquipmentNumber().subscribe((res) => {
            // console.log(res, "Gate Name List");
            this.equipmentNumber = res["data"];
        });
        this.stationAPI.getDirection().subscribe((res) => {
            // console.log(res, "Direction Name");
            this.direction = res["data"];
        });
        this.stationAPI.getEmergencyMode().subscribe((res) => {
            // console.log(res, "Emergency Mode");
            this.emergency = res["data"];
        });
        this.stationAPI.getModelList().subscribe((res) => {
            // console.log(res, "Modes Name");
            this.mode = res["data"];
        });
        this.stationAPI.getAislesMode().subscribe((res) => {
            // console.log(res, "Aisle Mode");
            this.aisleMode = res["data"];
        });
        this.stationAPI.getActionType().subscribe((res) => {
            // console.log(res, "ActionType");
            this.actionTypeList = res["data"];
        });
        this.stationAPI.getQueLength().subscribe((res) => {
            // console.log(res, "Que Length");
            this.queLengthList = res["data"];
        });
        this.stationAPI.getFlapSafetyTime().subscribe((res) => {
            // console.log(res, "Flap Safety Time");
            this.flapSafetyTimeList = res["data"];
        });
        this.stationAPI.getGateResetTime().subscribe((res) => {
            // console.log(res, "Gate Reset Time");
            this.gateResetTimeList = res["data"];
        });
        this.stationAPI.getBuzzerVolume().subscribe((res) => {
            // console.log(res, "Buzzer Volume");
            this.buzzerVolumeList = res["data"];
        });
        this.stationAPI.getLightIntensity().subscribe((res) => {
            // console.log(res, "Light Intensity");
            this.lightIntensityList = res["data"];
        });
        this.stationAPI.getSensorInactTime().subscribe((res) => {
            // console.log(res, "Sensor Inact Time");
            this.sensorInactTimeList = res["data"];
        });
        this.stationAPI.getTerminalMode().subscribe((res) => {
            this.terminalModeList = res["data"];
            // console.log(res, "Terminal Mode");
        });
        this.stationAPI.assignedTerminal().subscribe((res) => {
            this.terminalList = res["data"];
        });
    }
    getGateId(id: number) {
        this.stationAPI
            .getConfigDataById(id)
            .subscribe((gateConfigData: GateConfig) => {
                this.data = gateConfigData["data"];
                this.updateGateData(this.data);
                this.terminalData = this.data.terminal;
                console.log( this.data)
            }),
            (error) => {
                console.log(error);
            };
    }
    terminal(): UntypedFormArray {
        return this.editForm.get("terminal") as UntypedFormArray;
    }

    newTerminal(): UntypedFormGroup {
        return this.formbuilder.group({
            id:[""],
            terminalId:[null],
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
    updateGateData(gateConfigData: GateConfig) {
        this.editForm.patchValue({
            gcId: gateConfigData.gcId,
            gateName: gateConfigData.gateName,
            modeName: gateConfigData.modeName,
            emergencyModeName: gateConfigData.emergencyModeName,
            directionName: gateConfigData.directionName,
            aisleModeName: gateConfigData.aisleModeName,
            directionIndicatorName: gateConfigData.directionIndicatorName,
            actionType: gateConfigData.actionType,
            activationTime: gateConfigData.activationTime,
            deactivationTime: gateConfigData.deactivationTime,
            queLength: gateConfigData.queLength,
            flapTime: gateConfigData.flapTime,
            gateResetTime: gateConfigData.gateResetTime,
            buzzerVolume: gateConfigData.buzzerVolume,
            lightIntensity: gateConfigData.lightIntensity,
            sit: gateConfigData.sit,
            version: gateConfigData.version,
        });
        this.populateDate();
    }
    populateDate() {
        this.editForm.setControl("terminal", this.setExistingTermVal());
    }
    setExistingTermVal() {
        const terminal = new UntypedFormArray([]);
        if (this.data && this.data.terminal.length > 0) {
            for (let i = 0; i < this.data.terminal.length; i++) {
                terminal.push(
                    this.formbuilder.group({
                        id: this.data.terminal[i].id,
                        terminalId: this.data.terminal[i].terminalId,
                        terminalName: this.data.terminal[i].terminalName,
                        terminalIp: this.data.terminal[i].terminalIp,
                        modeType: this.data.terminal[i].modeType,
                        deviceId: this.data.terminal[i].deviceId,
                    })
                );
            }
        }
        return terminal;
    }

    get fval() {
        return this.editForm.controls;
    }
    onFormSubmit() {
        const formData = this.editForm.getRawValue();
        this.spinner.show();
        this.stationAPI.putconfig(this.assignId, formData).subscribe(
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
                }
                this.spinner.hide();
                this.successmsg = res;
                this.toastr.success("", this.successmsg.data);
                this.router.navigate(["/stationdashboard"]);
            },
            (error) => {
                this.error = error;
                this.toastr.error("", this.error);
                // swal(this.error, "", "error");

            }
        );
        this.submitted = false;
    }

    onChange(data) {
        if (data === "NORMAL_MODE") {
            this.editForm.get("emergencyModeName").disable();
            this.editForm.get("directionIndicatorName").enable();
            this.editForm.get("aisleModeName").enable();
            this.editForm.get("queLength").enable();
            this.editForm.get("directionName").enable();
            this.editForm.get("buzzerVolume").enable();
            this.editForm.get("lightIntensity").enable();
            this.editForm.get("sit").enable();
            this.editForm.get("gateResetTime").enable();
            this.editForm.get("flapTime").enable();
            this.editForm.get("actionType").enable();
            this.editForm.get("deactivationTime").enable();
            this.editForm.get("activationTime").enable();
            this.editForm.get("terminal").enable();
        } else if (data === "EMERGENCY") {
            this.editForm.get("emergencyModeName").enable();
            this.editForm.get("directionIndicatorName").disable();
            this.editForm.get("directionName").disable();
            this.editForm.get("aisleModeName").disable();
            this.editForm.get("queLength").disable();
            this.editForm.get("buzzerVolume").disable();
            this.editForm.get("lightIntensity").disable();
            this.editForm.get("sit").disable();
            this.editForm.get("gateResetTime").disable();
            this.editForm.get("flapTime").disable();
            this.editForm.get("actionType").disable();
            this.editForm.get("deactivationTime").disable();
            this.editForm.get("activationTime").disable();
            this.editForm.get("terminal").disable();
        } else if (
            data === "STATION_CLOSE" ||
            data === "OUT_OF_ORDER" ||
            data === "OUT_OF_SERVICE" ||
            data === "Manual"
        ) {
            this.editForm.get("emergencyModeName").disable();
            this.editForm.get("directionIndicatorName").disable();
            this.editForm.get("aisleModeName").disable();
            this.editForm.get("directionName").disable();
            this.editForm.get("queLength").disable();
            this.editForm.get("buzzerVolume").disable();
            this.editForm.get("lightIntensity").disable();
            this.editForm.get("sit").disable();
            this.editForm.get("gateResetTime").disable();
            this.editForm.get("flapTime").disable();
            this.editForm.get("actionType").disable();
            this.editForm.get("deactivationTime").disable();
            this.editForm.get("activationTime").disable();
            this.editForm.get("terminal").disable();
        }
    }
}
