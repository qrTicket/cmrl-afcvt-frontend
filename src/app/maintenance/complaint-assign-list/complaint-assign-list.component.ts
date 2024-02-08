import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MainService } from "../_mainservices/main.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ComplainAssignList } from "../_models/complaintassignlist.model";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { ComplainService } from "src/app/complaint/_complainservices/complain.service";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-complaint-assign-list",
    templateUrl: "./complaint-assign-list.component.html",
    styleUrls: ["./complaint-assign-list.component.scss"],
})
export class ComplaintAssignListComponent implements OnInit {
    rejectForm: UntypedFormGroup;
    modalRef: BsModalRef;
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };

    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;
    dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject();

    complainassign: ComplainAssignList[] = [];
    public complainassignlistData: Object;
    remaks: any;
    merge: any;
    submitted: Boolean = false;
    successmsg;
    errormsg;

    constructor(
        private http: HttpClient,
        private router: Router,
        private formbuilder: UntypedFormBuilder,
        private modalService: BsModalService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private complainservice: MainService,
        private complainservice_API: ComplainService
    ) {}
    dtOptions: DataTables.Settings = {};

    ngOnInit(): void {
        this.rejectForm = this.formbuilder.group({
            remarks: ["", Validators.required],
        });
        this.complaintlist();
    }

    complaintlist() {
        this.complainservice.viewAllAssignedComplaint().subscribe((data) => {
            this.complainassign = data;
            this.dtOptions = {
                pagingType: "full_numbers",
                pageLength: 5,
                processing: true,
            };
            this.dtTrigger.next();
        });
    }

    acceptComp() {
        this.spinner.show();
        
    }
    openRejectModel(rejectTemplate: TemplateRef<any>) {
        this.modalRef = this.modalService.show(rejectTemplate, this.config);
    }
    modelEve(id, rest) {
        // console.log(this.rejectForm.value);
        this.remaks = this.rejectForm.value;
        this.merge = { ...rest, ...this.remaks };
        // console.log(this.merge, "Merged obj");
        this.rejectComp(id, this.merge);
    }
    get fval() {
        return this.rejectForm.controls;
    }
    rejectComp(id, merge) {
        this.submitted = true;
        if (this.rejectForm.invalid)
            return this.toastr.error("Error", "Enter the reason");
        this.spinner.show();
        
        this.modalRef.hide();
    }
}
