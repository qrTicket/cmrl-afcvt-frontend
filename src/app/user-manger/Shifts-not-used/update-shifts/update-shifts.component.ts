import { Component, OnInit, OnDestroy, TemplateRef } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { ShiftsService } from "../../_services/shifts.service";
import { Shifts } from "../../_models/shifts.model";
import { AddUserService } from "../../_services/add-user.service";
@Component({
    selector: "app-update-shifts",
    templateUrl: "./update-shifts.component.html",
    styleUrls: ["./update-shifts.component.scss"],
})
export class UpdateShiftsComponent implements OnInit, OnDestroy {
    updateShift: FormGroup;
    datePickerConfigUpdateStart: Partial<BsDatepickerConfig>;
    datePickerConfigUpdateEnd: Partial<BsDatepickerConfig>;
    subscription: Subscription[] = [];
    modalRef: BsModalRef;
    userList: any;
    stationList: any;
    shiftId: any;
    submitted = false;
    showSpinners = false;
    isMeridian: Boolean = false;
    hoursPlaceholder = "hh";
    minutesPlaceholder = "mm";
    secondsPlaceholder = "ss";
    myUpdatedData: any;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private datePipe: DatePipe,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private modalService: BsModalService,
        private shiftsService: ShiftsService,
        private addUser__API: AddUserService
    ) {
        this.datePickerConfigUpdateStart = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-red",
                minDate: new Date(),
            }
        );
        this.datePickerConfigUpdateEnd = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-red",
                minDate: new Date(),
            }
        );
    }
    openModal(updateShiftTemp: TemplateRef<any>) {
        // console.log(this.updateShift.controls["startDate"].dirty);

        console.log(
           this.datePipe.transform(this.updateShift.value.startDate, 'yyyy-MM-dd'),

            "Start Date"
        );
        console.log(this.updateShift.value.endDate, "End Date");
        console.log(this.datePipe.transform("2021/03/08", 'yyyy/MM/dd'));
        

        this.submitted = true;
        if (this.updateShift.invalid) {
            return this.toastr.error("Please fill all fields!");
        } else {
            this.modalRef = this.modalService.show(updateShiftTemp);
        }
    }

    ngOnInit() {
        this.updateShift = this.formBuilder.group({
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
            // this.shiftsService.assignUserByStation().subscribe((res) => {
            //     this.userList = res;
            //     // console.log(this.userList);
            // })
            this.shiftsService.assignUserByStation().subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                      this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.userList = res.data;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
        this.subscription.push(
            // this.addUser__API.getAllStation().subscribe((res) => {
            //     this.stationList = res["data"];
            //     // console.log(this.stationList);
            // })
            this.addUser__API.getAllStation().subscribe({
                next:(res:any)=>{
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
        );

        this.subscription.push(
            this.route.paramMap.subscribe((params) => {
                this.shiftId = +params.get("id");
                // console.log(this.shiftId);

                if (this.shiftId) {
                    this.getshiftById(this.shiftId);
                }
            })
        );
    }
    getshiftById(id) {
        this.subscription.push(
            // this.shiftsService.getShiftById(id).subscribe(
            //     (updateShifts: Shifts) => {
            //         console.log(updateShifts["data"]);

            //         this.updateShiftsData(updateShifts["data"]);
            //     },
            //     (error) => {
            //         // console.log(error);
            //     }
            // )
            this.shiftsService.getShiftById(id).subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                    // this.spinner.hide();
                      this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.updateShiftsData(res.data);
                  }
                },
                error:(err)=>{
                    // this.spinner.hide();
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
    }
    updateShiftsData(updateShifts: Shifts) {
        this.updateShift.patchValue({
            id: updateShifts.id,
            startDate: updateShifts.startDate,

            endDate: updateShifts.endDate,

            startTime: updateShifts.startTime,
            endTime: updateShifts.endTime,
            duration: updateShifts.duration,
            shiftName: updateShifts.shiftName,
            assignUser: updateShifts.assignUser,
            stationCode: updateShifts.stationCode,
        });
        // console.log(this.updateShift.value);
    }

    get fval() {
        return this.updateShift.controls;
    }
    onCalender(val) {
        let date = val;
        this.datePickerConfigUpdateEnd = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-red",
                minDate: date,
            }
        );
    }

    confirm() {
        // if(this.updateShift.value.startDate)
        // if (this.updateShift.controls["startDate"].dirty) {
        //     this.myUpdatedData = {
        //         startDate: this.datePipe.transform(
        //             this.updateShift.value.startDate,
        //             "dd-MM-yyyy"
        //         ),
        //         endDate: this.updateShift.value.endDate,

        //         startTime: this.updateShift.value.startTime,
        //         endTime: this.updateShift.value.endTime,
        //         shiftName: this.updateShift.value.shiftName,
        //         assignUser: this.updateShift.value.assignUser,
        //         stationCode: this.updateShift.value.stationCode,
        //     };
        // } else if (this.updateShift.controls["endDate"].dirty) {
        //     this.myUpdatedData = {
        //         startDate: this.updateShift.value.startDate,

        //         endDate: this.datePipe.transform(
        //             this.updateShift.value.endDate,
        //             "dd-MM-yyyy"
        //         ),
        //         startTime: this.updateShift.value.startTime,
        //         endTime: this.updateShift.value.endTime,
        //         shiftName: this.updateShift.value.shiftName,
        //         assignUser: this.updateShift.value.assignUser,
        //         stationCode: this.updateShift.value.stationCode,
        //     };
        // } else if (
        //     this.updateShift.controls["startDate"].dirty &&
        //     this.updateShift.controls["endDate"].dirty
        // ) {
        //     this.myUpdatedData = {
        //         startDate: this.datePipe.transform(
        //             this.updateShift.value.startDate,
        //             "dd-MM-yyyy"
        //         ),
        //         endDate: this.datePipe.transform(
        //             this.updateShift.value.endDate,
        //             "dd-MM-yyyy"
        //         ),
        //         startTime: this.updateShift.value.startTime,
        //         endTime: this.updateShift.value.endTime,
        //         shiftName: this.updateShift.value.shiftName,
        //         assignUser: this.updateShift.value.assignUser,
        //         stationCode: this.updateShift.value.stationCode,
        //     };
        // } else {
        //     this.myUpdatedData = {
        //         startDate: this.updateShift.value.startDate,

        //         endDate: this.updateShift.value.endDate,

        //         startTime: this.updateShift.value.startTime,
        //         endTime: this.updateShift.value.endTime,
        //         shiftName: this.updateShift.value.shiftName,
        //         assignUser: this.updateShift.value.assignUser,
        //         stationCode: this.updateShift.value.stationCode,
        //     };
        // }
        this.submitted = true;
        if (this.updateShift.invalid)
            return this.toastr.error("Please fill all fields!!");
        this.spinner.show();
        this.subscription.push(
            // this.shiftsService.edit(this.updateShift.value, this.shiftId).subscribe(
            //     (res) => {
            //         if (res["status"] === "1") {
            //             this.spinner.hide();
            //             this.toastr.success(res["data"]);
            //             this.updateShift.reset();
            //             this.submitted = false;
            //             this.router.navigate(["user-manager/shifts/list"]);
            //         } else if (res["status"] === "0") {
            //             this.spinner.hide();
            //             this.toastr.error(res["data"]);
            //         } else {
            //             this.spinner.hide();
            //             this.toastr.error(res["data"]);
            //         }
            //     },
            //     (error) => {
            //         this.spinner.hide();
            //         this.toastr.error(error.data);
            //     }
            // )
            this.shiftsService.edit(this.updateShift.value, this.shiftId).subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                    this.spinner.hide();
                    this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.spinner.hide();
                    this.toastr.success(res.data);
                    this.updateShift.reset();
                    this.submitted = false;
                    this.router.navigate(["user-manager/shifts/list"]);
                  }
                },
                error:(err)=>{
                    this.spinner.hide();
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
        this.modalRef.hide();
    }
    decline() {
        // console.log("Cancel");
        this.modalRef.hide();
    }

    ngOnDestroy() {
        this.subscription.forEach((subs) => subs.unsubscribe());
    }
}
