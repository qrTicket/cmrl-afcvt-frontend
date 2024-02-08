import { Component, OnInit } from "@angular/core";
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { CustomValidators } from "ng2-validation";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { PtoRegistrationService } from "../_services/pto-registration.service";
import { PTO } from "../auth_models/pto.model";
import { MustMatch } from "../_helpers/match-validators";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    ptoform: UntypedFormGroup;
    submitted = false;
    successmsg;
    errormsg;
    constructor(
        private ptoService: PtoRegistrationService,
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) {
        this.ptoform = this.formBuilder.group(
            {
                vendorName: ["", Validators.required],
                name: ["", Validators.required],
                contact: [
                    "",
                    Validators.compose([
                        Validators.required,
                        Validators.pattern("[0-9]{10}")
                    ])
                ],
                gstNumber: [
                    "",
                    [
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(10)
                    ]
                ],
                panNumber: [
                    "",
                    [
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(10)
                    ]
                ],
                username: ["", Validators.required],
                state: ["", Validators.required],
                address: ["", Validators.required],
                email: ["", [Validators.required, Validators.email]],
                password: ["", [Validators.required, Validators.minLength(8)]],
                confirmPassword: ["", Validators.required]
            },
            {
                validator: MustMatch("password", "confirmPassword")
            });

       
    }

    ngOnInit() {
        console.log("Home component loaded");
    }

    get fval() {
        return this.ptoform.controls;
    }

    onFormSubmit() {
        this.submitted = true;
      
        this.ptoService
            .postPtoRegistration(this.ptoform.value)
            .subscribe(data => {
                this.successmsg = data;
                this.spinner.hide();
                this.toastr.success("", this.successmsg.message);
                this.ptoform.reset();
                this.submitted = false;
                this.router.navigate(["mainComp"]);
            }, error => {
                this.spinner.hide();
                this.errormsg = error;
                this.toastr.error("", this.errormsg);
            });
        
    }
}
