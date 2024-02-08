import { Component, OnInit, Input } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validator } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

import { SuperService } from "../_superservices/super.service";
import { PTO } from "src/app/auth_models/pto.model";
@Component({
    selector: "app-verify-pto",
    templateUrl: "./verify-pto.component.html",
    styleUrls: ["./verify-pto.component.scss"],
})
export class VerifyPtoComponent implements OnInit {
    errormsg;
    successmsg;
    verifyform: UntypedFormGroup;
    rejectData: any;
    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private superservice: SuperService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.verifyform = this.formBuilder.group({
            id: [""],
            vendorName: [""],
            name: [""],
            mobileNumber: [""],
            gstNumber: [""],
            panNumber: [""],
            username: [""],
            password: [""],
            email: [""],
            address: [""],
        });
        this.verifyform.disable();
        // this.disabled();

        this.route.paramMap.subscribe((params) => {
            const ptoId = +params.get("id");
            if (ptoId) {
                this.getVendor(ptoId);
            }
        });
    }
    getVendor(id: number) {
        this.superservice.getVendorById(id).subscribe(
            (vendordata: PTO) => this.editVendor(vendordata),
            (error: any) => 
            console.log(error)
        );
    }
    editVendor(vendordata: PTO) {
        this.verifyform.patchValue({
            vendorName: vendordata.vendorName,
            name: vendordata.name,
            mobileNumber: vendordata.contact,
            gstNumber: vendordata.gstNumber,
            panNumber: vendordata.panNumber,
            username: vendordata.username,
            password: vendordata.password,
            email: vendordata.email,
            address: vendordata.address,
            id: vendordata.id,
        });
    }

    get fval() {
        return this.verifyform.controls;
    }

    disabled() {
        this.fval.gstNumber.disable();
    }

    verifyEve() {
        // this.spinner.show();
        this.rejectData = this.verifyform.value;
        // console.log("Verify", this.verifyform.value);

        this.superservice.postVendorVerify(this.verifyform.value).subscribe(
            (res) => {
                console.log(res);
                this.successmsg = res;
                this.spinner.hide();
                this.toastr.success("", this.successmsg.message, {
                    progressBar: true,
                });
                this.router.navigate(["super-admin/user/list"]);
            },
            (error) => {
                this.spinner.hide();
                console.log(error);
                this.errormsg = error;
                this.toastr.error(this.errormsg);
            }
        );
    }
    rejectEve() {
        this.spinner.show();
        console.log("Reject", this.verifyform.value);
        this.superservice.postRejectVendor(this.verifyform.value).subscribe(
            (res) => {
                console.log(res);
                this.spinner.hide();
                this.successmsg = res;
                this.toastr.success("", this.successmsg.message);
                this.router.navigate(["super-admin/rejected/users"]);
            },
            (error) => {
                console.log(error);
                this.spinner.hide();
                this.errormsg = error;
                this.toastr.error("", this.errormsg);
            }
        );
    }
    blacklistEve() {
        console.log("clicked");

    }
}
