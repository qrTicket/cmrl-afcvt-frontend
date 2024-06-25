import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { Station } from "../_models/station.model";
import { StationService } from "../_services/station.service";
import { NumericValueType, RxwebValidators } from "@rxweb/reactive-form-validators";
import { Line } from "../_models/lines.model";
import { LinesService } from "../_services/lines.service";
import { ZoneService } from "../_services/zone.service";

@Component({
    selector: "app-edit-station",
    templateUrl: "./edit-station.component.html",
    styleUrls: ["./edit-station.component.scss"],
})
export class EditStationComponent implements OnInit {
    editstationForm: FormGroup;
    submitted = false;
    isDisabled: boolean = true;
    stationId: number;
    successmsg;
    errormsg;
    zoneList:any[]=[];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activeRouter: ActivatedRoute,
        private toastr: ToastrService,
        private stationService: StationService,
        private zoneService: ZoneService,
    ) {}

    ngOnInit() {
        this.editstationForm = this.formBuilder.group({
            zoneId:['',[RxwebValidators.required({message: "This field is required!"})]],
            stationCode: ["",[
                RxwebValidators.required({ message: "This field is required!"}),
                RxwebValidators.pattern({expression: {alpha: /^[a-zA-Z][a-zA-Z0-9\s]*$/, },message:"This accept combination of numbers and alphabets."}),
                RxwebValidators.minLength({value:3,message: "Minimum length should be 3!"})   
            ]],
            stationName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.pattern({
                        expression: {
                            alpha: /^[a-zA-Z][a-zA-Z0-9\s]*$/,
                        },
                        message:
                            "This accept combination of numbers and alphabets.",
                    }),
                    RxwebValidators.minLength({
                        value:3,
                        message: "Minimum length should be 3!",
                    }),
                ],
            ],
            stationId:['',[
                RxwebValidators.required({ message: "This field is required!"}),
                RxwebValidators.numeric({ acceptValue:NumericValueType.PositiveNumber, message: "Only numbers are allowed!"})
            ]],
            contactNum: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.pattern({
                        expression: { onlyDigit: /^[6-9]\d{9}$/ },
                        message: "Invalid mobile number!",
                    }),
                ],
            ],
            latitude: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.latitude({
                        message : "Invalid Latitude"
                    }),
                    
                ],
            ],
            longitude: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.longitude({
                        message: "Invalid Longitude"
                    })
                ],
            ],
            address: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),

                ],
            ]
        });

        this.activeRouter.paramMap.subscribe((params) => {
            this.stationId = +params.get("id");
            console.log(this.stationId);
            if (this.stationId) {
                this.getDetail(this.stationId);
            }
        });
        this.getZoneList();

    }

    getZoneList(){
        this.zoneService.getAllZone().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data)
              }
              else if(res.status === "1"){
                this.zoneList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data)
            }
        })
    }

    get fval() {
        return this.editstationForm.controls;
    }

    getDetail(id: number) {
        this.stationService.getStationById(id).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data)
              }
              else if(res.status === "1"){
                this.updateStation(res.data);
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data)
            }
          })
    }

    updateStation(station: Station) {
        this.editstationForm.patchValue({
            //id: station.id,
            zoneId: station && station.zoneId ? station.zoneId : '',
            stationCode: station && station.stationCode ? station.stationCode : '',
            stationName: station && station.stationName ? station.stationName : '',
            stationId: station && station.stationId ? station.stationId : '',
            latitude: station && station.latitude ? station.latitude : '',
            longitude: station && station.longitude ? station.longitude : '',
            contactNum: station && station.contactNum ? station.contactNum : '',
            address: station && station.address ? station.address : '',

        });
    }

    onFormSubmit() {
        this.submitted = true;

        if (this.editstationForm.invalid)
            return Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Please fill all fields!",
            });

            let reqObj = {
                "zoneId" : this.editstationForm.value.zoneId,
                "stationName" : this.editstationForm.value.stationName,
                "stationCode" : this.editstationForm.value.stationCode,
                "stationId" : +this.editstationForm.value.stationId,
                "contactNum" : this.editstationForm.value.contactNum,
                "latitude" : this.editstationForm.value.latitude,
                "longitude" : this.editstationForm.value.longitude,
                "address" : this.editstationForm.value.address,
            }

        this.stationService.putStation(this.stationId, reqObj).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data)
              }
              else if(res.status === "1"){
                this.successmsg = res.data;
                this.toastr.success(res.data);
                this.router.navigate(["/admin/stationlist"]);
                this.editstationForm.reset();
                this.submitted = false;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data)
            }
          })
    }

    cancel(){
        this.router.navigate(["/admin/stationlist"]);
    }
}
