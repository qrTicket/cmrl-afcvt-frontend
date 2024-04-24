import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { Line } from "../_models/lines.model";
import { LinesService } from "../_services/lines.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NumericValueType, RxwebValidators } from "@rxweb/reactive-form-validators";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { formatDate } from "@angular/common";

@Component({
    selector: "app-edit-line",
    templateUrl: "./edit-line.component.html",
    styleUrls: ["./edit-line.component.scss"],
})
export class EditLineComponent implements OnInit {
    line: Line;
    lineForm: FormGroup;
    submitted = false;
    isDisabled: boolean = true;
    successmsg;
    errormsg;
    spinners = false;
    lineId: number;
    activationStatusList:any = [
        {"key":true,"value": "Active"},
        {"key":false,"value": "InActive"},
    ] 

    datePickerConfigOperationFrom: Partial<BsDatepickerConfig>;
    maxDate: Date;

    constructor(
        private linesService: LinesService,
        private formBuilder: FormBuilder,
        private router: Router,
        private activeRouter: ActivatedRoute,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
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
                    RxwebValidators.required({ message: "Required!" }),
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
                    RxwebValidators.required({ message: "Required!" }),
                    RxwebValidators.pattern({
                        expression: {
                            alpha: /^[a-zA-Z][a-zA-Z0-9\s]*$/,
                        },
                        message:
                            "This accept combination of numbers and alphabets.",
                    }),
                    RxwebValidators.minLength({
                        value: 3,
                        message: "Minimum length should be 3!",
                    }),
                ],
            ],
            lineColour:['',[ 
                RxwebValidators.required({message: "This field is required!"}),
                //RxwebValidators.alpha({message: "This will accept only alphabet!", allowWhiteSpace: true})
            ]],
            activationStatus:['',[ RxwebValidators.required({message: "This field is required!"})]],
            length:['',[ 
                RxwebValidators.required({message: "This field is required!"}),
                RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:true, message:"Only numbers are allowed!" })
            ]],
            operationFrom:['',[ RxwebValidators.required({message: "This field is required!"})]],
            terminusA: [
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
                ],
            ],
            terminusB: [
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
                ],
            ],
        });

        this.activeRouter.paramMap.subscribe((params) => {
            this.lineId = +params.get("id");
            if (this.lineId) {
                this.getLine(this.lineId);
            }
        });
    }

    onValueOperationalDateChange(dt:any){
        const updatedDate = new Date(dt);
        this.lineForm.get('operationFrom').setValue(formatDate(updatedDate, 'dd-MM-yyyy','en') )
    }

    get fval() {
        return this.lineForm.controls;
    }

    getLine(id: number) {
        this.linesService.getLineById(id).subscribe({
            next:(res:any)=>{
                if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                }
                else if(res.status === "1"){
                this.updateLine(res.data);
                }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
        })
    }

    updateLine(line: any) {
        this.lineForm.patchValue({
            lineName: line && line.lineName ? line.lineName : "",
            lineCode: line && line.lineCode ? line.lineCode : "",
            lineColour: line && line.lineColor ? line.lineColor : "",
            activationStatus: line && line.active ? line.active : "",
            length: line && line.lengthInKm ? line.lengthInKm : "",
            operationFrom: line && line.operationalFrom ? line.operationalFrom : "",
            terminusA: line && line.terminusA ? line.terminusA : "",
            terminusB: line && line.terminusB ? line.terminusB : "",
            
        });
    }

    onFormSubmit() {
        this.submitted = true;
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
                "operationalFrom" : this.lineForm.value.operationFrom ,
                "terminusA" : this.lineForm.value.terminusA,
                "terminusB" : this.lineForm.value.terminusB,
            }

        this.linesService.putLine(reqObj, this.lineId).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.spinner.hide();
                    this.toastr.success(res.data,"SUCCESS");
                    this.router.navigate(["/admin/linelist"]);
                    this.submitted = false;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }
}
