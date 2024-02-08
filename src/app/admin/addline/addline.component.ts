import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Line } from "../_models/lines.model";
import { LinesService } from "../_services/lines.service";
import { Station } from "../_models/station.model";
import { StationService } from "../_services/station.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

@Component({
    selector: "app-addline",
    templateUrl: "./addline.component.html",
    styleUrls: ["./addline.component.scss"],
})
export class AddlineComponent implements OnInit {
    lineForm: UntypedFormGroup;
    submitted = false;

    id: number;
    line: Line[] = [];

    station: Station[] = [];
    public stationObject: Object;
    stationName: string;

    successmsg;
    errormsg;
    isSaving = false;

    constructor(
        private linesService: LinesService,
        private stationService: StationService,
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private toastr: ToastrService
    ) {}

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
                    // RxwebValidators.alphaNumeric({
                    //     message: "This accept only alphabet!",
                    // }),
                    RxwebValidators.pattern({
                        expression: {
                            // alpha: /^(?:[0-9]+[a-z_-]|[a-z-_]+[0-9])[a-z0-9]*$/i,
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
            /*source: [
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
            ],*/
            /*destination: [
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
            ],*/

        });

        this.stationService.getStation().subscribe((data) => {
            this.station = data;
        });
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
        // console.log(this.lineForm.value);
        this.linesService.postAddline(this.lineForm.value).subscribe(
            (data) => {
                if (data.status === "1") {
                    // console.log("");
                    this.successmsg = data;
                    this.toastr.success("", this.successmsg.data);
                    this.lineForm.reset();
                    this.submitted = false;
                    this.router.navigate(["admin/linelist"]);
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: data.data,
                    });
                }
            },
            (error) => {
                // console.log(error);
                this.errormsg = error;
                Swal.fire({
                    title: "Error!",
                    text: this.errormsg,
                });
            }
        );
    }
}
