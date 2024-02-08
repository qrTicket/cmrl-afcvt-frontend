import { Component, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validator } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

import { MainService } from "../_mainservices/main.service";
import { PTO } from "src/app/auth_models/pto.model";
import { Sentcomplaint } from "../../station/_model/sentcomplaint.model";
import { Station } from "../../admin/_models/station.model";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { ComplainAssignList } from "../_models/complaintassignlist.model";

@Component({
    selector: "app-accept-complaint",
    templateUrl: "./accept-complaint.component.html",
    styleUrls: ["./accept-complaint.component.scss"],
})
export class AcceptComplaintComponent implements OnInit {
    errormsg;
    successmsg;
    submitted = false;
    acceptcomplaintForm: UntypedFormGroup;
    ac: ComplainAssignList;

    rejectData: any;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private activeRouter: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private mainservice: MainService,
        private spinner: NgxSpinnerService
    ) 
    {}

    ngOnInit() {
        
        this.acceptcomplaintForm = this.formBuilder.group({
            id: ["", RxwebValidators.required({ message: "Required!" })],
            stationName: [
                "",
                RxwebValidators.required({ message: "Required!" }),
            ],
            name: ["", RxwebValidators.required({ message: "Required!" })],
            zoneName: ["", RxwebValidators.required({ message: "Required!" })],
        });

        this.activeRouter.paramMap.subscribe((params) => {
            const id = +params.get("id");
            if (id) {
                this.getComplain(id);
            }
        });
    }

    get fval() {
        return this.acceptcomplaintForm.controls;
    }

    getComplain(id) {
        this.mainservice.getComplaintById(id).subscribe(
            (ac: ComplainAssignList) => this.editComplaint(ac),
            (error: any) => 
            console.log(error)
        );
    }

    editComplaint(ac: ComplainAssignList) {
        this.acceptcomplaintForm.patchValue({
            id: ac.id,
            stationName: ac.stationId,
            zoneName: ac.zone,
            name: ac.maintenanceStaffId,
        });
    }

    disabled() {
        this.fval.gstNumber.disable();
    }

    verifyEve() {
        this.rejectData = this.acceptcomplaintForm.value;

        this.mainservice
            .postAcceptComplaint(this.acceptcomplaintForm.value)
            .subscribe(
                (res) => {
                    this.successmsg = res;
                    this.spinner.hide();
                    this.toastr.success("", this.successmsg, {
                        progressBar: true,
                    });
                    this.router.navigate(["verified-list"]);
                },
                (error) => {
                    this.spinner.hide();
                    this.errormsg = error;
                    this.toastr.error(this.errormsg);
                }
            );
    }
    rejectEve() {
      this.spinner.show();
      console.log("Reject", this.acceptcomplaintForm.value);
      this.mainservice.postRejectComplaint(this.acceptcomplaintForm.value).subscribe(
        (res) => {
          console.log(res);
          this.spinner.hide();
          this.successmsg = res;
          this.toastr.success("", this.successmsg.message);
          this.router.navigate(["rejected-list"]);
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
          this.errormsg = error;
          this.toastr.error("", this.errormsg);
        }
      );
    }
}
