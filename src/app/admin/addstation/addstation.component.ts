import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Station } from "../_models/station.model";
import { StationService } from "../_services/station.service";
import { Line } from "../_models/lines.model";
import { LinesService } from "../_services/lines.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { ZoneService } from "../_services/zone.service";

@Component({
    selector: "app-addstation",
    templateUrl: "./addstation.component.html",
    styleUrls: ["./addstation.component.scss"],
})
export class AddstationComponent implements OnInit {
    stationForm: FormGroup;
    submitted = false;

    zoneList:any[]=[];
    id: number;

    successmsg:any;
    errormsg:any;
    text: any;
    isSaving = false;
    

    constructor(
        private stationservice: StationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private zoneService: ZoneService,
    ) {}

    ngOnInit() {
        this.stationForm = this.formBuilder.group({
            zoneId:['',[RxwebValidators.required({message: "This field is required!"})]],
            stationName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.pattern({
                        expression: {
                            // alpha: /^(?:[0-9]+[a-z_-]|[a-z-_]+[0-9])[a-z0-9]*$/i,
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
            stationCode: ["",
                [
                    RxwebValidators.required({ message: "This field is required!"}),
                    RxwebValidators.pattern({expression: {alpha: /^[a-zA-Z][a-zA-Z0-9\s]*$/, },message:"This accept combination of numbers and alphabets."}),
                    RxwebValidators.minLength({value:3,message: "Minimum length should be 3!"})
                ],
            ],
            stationId:['',[RxwebValidators.required({message: "This field is required!"})]],
            contactNum: ["",
                [
                    RxwebValidators.required({message: "This field is required!",}),
                    RxwebValidators.pattern({expression: { onlyDigit: /^[6-9]\d{9}$/ },message: "Invalid mobile number!",}),
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
                    })
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
            ],
        });

        this.getZoneList();
    }

    getZoneList(){
        this.zoneService.getAllZone().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.zoneList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }
  
    get fval() {
        return this.stationForm.controls;
    }

    onFormSubmit() {

        console.log("controls");
        console.log(this.stationForm.value);

        //this.submitted = true;
        this.isSaving = true;

        if (this.stationForm.invalid){
            this.submitted = true;
            return false;
        }
           
        let reqObj = {
            "zoneId" : this.stationForm.value.zoneId,
            "stationName" : this.stationForm.value.stationName,
            "stationCode" : this.stationForm.value.stationCode,
            "stationId" : this.stationForm.value.stationId,
            "contactNum" : this.stationForm.value.contactNum,
            "latitude" : this.stationForm.value.latitude,
            "longitude" : this.stationForm.value.longitude,
            "address" : this.stationForm.value.address,
        }
       
        this.stationservice.postAddstation(reqObj).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.successmsg = res.data;
                this.toastr.success("", this.successmsg.data);
                this.router.navigate(["admin/stationlist"]);
                this.stationForm.reset();
                this.submitted = false;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })

        // this.toastr.success("", "testing");
    }


}
