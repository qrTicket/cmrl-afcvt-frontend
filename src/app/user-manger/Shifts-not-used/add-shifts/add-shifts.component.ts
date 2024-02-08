import { Component, OnInit, OnDestroy } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Subscription } from "rxjs/Subscription";

import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";

import { ShiftsService } from "../../_services/shifts.service";
import { AddUserService } from "../../_services/add-user.service";
// import { AddUser } from "../../_models/addUser.model";

@Component({
    selector: "app-shifts",
    templateUrl: "./add-shifts.component.html",
    styleUrls: ["./add-shifts.component.scss"],
})
export class AddShiftsComponent implements OnInit, OnDestroy {
    addShift: UntypedFormGroup;
    subscription: Subscription[] = [];
    datePickerConfigStart: Partial<BsDatepickerConfig>;
    datePickerConfigEnd: Partial<BsDatepickerConfig>;
    userList: any;
    submitted = false;
    showSpinners = false;
    stationList: any;
    isMeridian: Boolean = false;
    data;
    successmsg;
    errormsg;
    isDisabled: boolean = true;
    hoursPlaceholder = "hh";
    minutesPlaceholder = "mm";
    secondsPlaceholder = "ss";
    constructor(
        private formBuilder: UntypedFormBuilder,
        private datePipe: DatePipe,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private shiftsService: ShiftsService,
        private addUser__API: AddUserService
    ) {
        this.datePickerConfigStart = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-red",
                minDate: new Date(),
                // maxDate: new Date(),
            }
        );
        this.datePickerConfigEnd = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-red",
                minDate: new Date(),
            }
        );
    }

    ngOnInit() {
        this.addShift = this.formBuilder.group({
            startDate: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            endDate: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            startTime: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            endTime: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            // duration: [
            //     "",
            //     RxwebValidators.required({
            //         message: "This field is required!",
            //     }),
            // ],
            shiftName: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            assignUser: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            stationCode: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
        });
        this.subscription.push(
            this.shiftsService.assignUserByStation().subscribe((res) => {
                this.userList = res;
                // console.log(this.userList);
            })
        );
        this.subscription.push(
            this.addUser__API.getAllStation().subscribe((res) => {
                this.stationList = res["data"];
                // console.log(this.stationList);
            })
        );
    }
    get fval() {
        return this.addShift.controls;
    }

    onCalender(val: Date) {
        let date = val;
        this.datePickerConfigEnd = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-red",
                minDate: date,
            }
        );
    }
    handler(value) {
        this.isDisabled = false;
    }

    onSubmit() {
        // console.log(this.datePipe.transform(this.addShift.value.endDate, "dd-MM-yyyy"));
        
        const myData = {
            startDate: this.datePipe.transform(this.addShift.value.startDate, "yyyy-MM-dd"),
            endDate: this.datePipe.transform(this.addShift.value.endDate, "yyyy-MM-dd"),
            startTime: this.addShift.value.startTime,
            endTime: this.addShift.value.endTime,
            shiftName: this.addShift.value.shiftName,
            assignUser: this.addShift.value.assignUser,
            stationCode: this.addShift.value.stationCode,
        };
        // const startTime = JSON.stringify( this.addShift.value.startTime);
        this.submitted = true;
        if (this.addShift.invalid)
            return this.toastr.error("Please fill all fields!");
        // this.data = this.addShift.value;
        this.spinner.show();
        this.subscription.push(
            this.shiftsService.addShifts(myData).subscribe(
                (res) => {
                    if (res["status"] === "1") {
                        this.spinner.hide();
                        this.toastr.success(res["data"]);
                        this.submitted = false;
                        this.addShift.reset();
                    } else if (res["status"] === "0") {
                        this.spinner.hide();
                        this.toastr.error(res["data"]);
                    } else {
                        this.spinner.hide();
                        this.toastr.error(res["data"]);
                    }
                },
                (error) => {
                    this.spinner.hide();
                    this.toastr.error(error.data);
                }
            )
        );
    }

    ngOnDestroy() {
        this.subscription.forEach((subs) => subs.unsubscribe());
    }
}
