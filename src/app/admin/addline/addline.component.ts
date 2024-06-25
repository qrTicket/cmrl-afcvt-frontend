import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Line } from "../_models/lines.model";
import { LinesService } from "../_services/lines.service";
import { Station } from "../_models/station.model";
import { StationService } from "../_services/station.service";
import { NumericValueType, RxwebValidators } from "@rxweb/reactive-form-validators";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { formatDate } from "@angular/common";

@Component({
    selector: "app-addline",
    templateUrl: "./addline.component.html",
    styleUrls: ["./addline.component.scss"],
})
export class AddlineComponent implements OnInit {
    lineForm: FormGroup;
    submitted = false;

    id: number;
    line: Line[] = [];

    station: Station[] = [];
    public stationObject: Object;
    stationName: string;

    successmsg:any;
    errormsg:any;
    isSaving = false;
    activationStatusList:any = [
        {"key":true,"value": "Active"},
        {"key":false,"value": "InActive"},
    ] 

    datePickerConfigOperationFrom: Partial<BsDatepickerConfig>;
    maxDate: Date;

    constructor(
        private linesService: LinesService,
        private stationService: StationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService
    ) {
        this.datePickerConfigOperationFrom = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "DD-MM-YYYY",
                containerClass: "theme-dark-blue",
                maxDate: (this.maxDate = new Date()),
            }
          );
    }

    ngOnInit() {
        this.lineForm = this.formBuilder.group({
            lineName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.alpha({
                        message: "This will accept only alphabet!",
                        allowWhiteSpace: true,
                    }),
                    RxwebValidators.minLength({
                        value: 3,
                        message: "Minimum length should be 3!",
                    }),
                ],
            ],
            lineCode: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    //RxwebValidators.numeric({ acceptValue:NumericValueType.PositiveNumber,  message: "Only numbers are allowed!"}),
                    RxwebValidators.pattern({
                        expression: {
                            // alpha: /^(?:[0-9]+[a-z_-]|[a-z-_]+[0-9])[a-z0-9]*$/i,
                            alpha: /^[a-zA-Z0-9][a-zA-Z0-9\s]*$/,
                        },
                        message:
                            "This will accept numbers or combination of numbers and alphabets.",
                    }),
                    // RxwebValidators.minLength({
                    //     value: 3,
                    //     message: "Minimum length should be 3!",
                    // }),
                ],
            ],
            lineColour:['',[ 
                RxwebValidators.required({message: "This field is required!"}),
                RxwebValidators.pattern({ expression: {pass: /[a-zA-Z0-9]/,},
                    message: "Only special symbols are NOT allowed!"})
            ]],
            activationStatus:['',[ RxwebValidators.required({message: "This field is required!"})]],
            length:['',[ 
                RxwebValidators.required({message: "This field is required!"}),
                RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:true, message:"Only numbers are allowed!" })
            ]],
            operationFrom:['',[ RxwebValidators.required({message: "This field is required!"})]],
            terminusA: ["",
                [
                    RxwebValidators.required({message: "This field is required!"}),
                    RxwebValidators.pattern({expression: {alpha: /^[a-zA-Z][a-zA-Z0-9\s]*$/,},message:"This accept combination of numbers and alphabets.",}),
                ],
            ],
            terminusB: ["",
                [
                    RxwebValidators.required({message: "This field is required!",}),
                    RxwebValidators.pattern({expression: {alpha: /^[a-zA-Z][a-zA-Z0-9\s]*$/,},message:"This accept combination of numbers and alphabets.",}),
                ],
            ],

        });
        //this.getStation()
        
    }

    getStation(){
        this.stationService.getStation().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data)
              }
              else if(res.status === "1"){
                this.station = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data)
            }
        })
    }

    get fval() {
        return this.lineForm.controls;
    }

    onFormSubmit() {
        this.submitted = true;
        this.isSaving = true;
        if (this.lineForm.invalid)
            return Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Please fill all fields!",
            });
        
        let reqObj = {
            "lineName" : this.lineForm.value.lineName,
            "lineCode" : this.lineForm.value.lineCode,
            "lineColor" : this.lineForm.value.lineColour,
            "active" : JSON.parse(this.lineForm.value.activationStatus) ,
            "lengthInKm" : +this.lineForm.value.length,
            "operationalFrom" : formatDate(this.lineForm.value.operationFrom,'dd-MM-yyyy','en') ,
            "terminusA" : this.lineForm.value.terminusA,
            "terminusB" : this.lineForm.value.terminusB,
        }

        console.log(reqObj,' reqobj');
        
        this.linesService.postAddline(reqObj).subscribe({
            next:(res)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data)
              }
              else if(res.status === "1"){
                this.successmsg = res.data;
                this.toastr.success(res.data);
                this.lineForm.reset();
                this.submitted = false;
                this.router.navigate(["admin/linelist"]);
              }
            },
            error:(err)=>{
                this.errormsg = err.error.data;
                this.toastr.error(err.error.data)
            }
          })
    }
}
