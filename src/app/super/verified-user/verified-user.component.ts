import { Component, OnInit, TemplateRef } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { SuperService } from "../_superservices/super.service";
import { UserList } from "../_Models/userlist.model";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
@Component({
    selector: "app-verified-user",
    templateUrl: "./verified-user.component.html",
    styleUrls: ["./verified-user.component.scss"],
})
export class VerifiedUserComponent implements OnInit {
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    blacklistForm: UntypedFormGroup;
    modalRef: BsModalRef;
    UserList: UserList[];
    public temp: Object = false;
    submitted: Boolean = false;
    successmsg;
    errormsg;
    constructor(
        private formbuilder: UntypedFormBuilder,
        private superService: SuperService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private modalService: BsModalService
    ) {}

    ngOnInit() {
        this.blacklistForm = this.formbuilder.group({
            remarks: ["", Validators.required],
        });
        this.verifiedPTOList();

    }
    verifiedPTOList(){
            this.superService.getUserList().subscribe((res) => {
                this.UserList = res.filter((user) => user.blacklist === false);
                this.temp = true;
                console.log(this.UserList);
            });
        }
    openRejectModel(blacklistTemplate: TemplateRef<any>) {
        this.modalRef = this.modalService.show(blacklistTemplate, this.config);
    }
    get fval() {
        return this.blacklistForm.controls;
    }
    blacklistUser(id) {
        this.spinner.show();
        // console.log(id);
        this.superService.blacklist_super_true(id).subscribe(
            (res) => {
                this.spinner.hide();
                this.successmsg = res;
                this.toastr.success("", this.successmsg.message);
            },
            (error) => {
                this.errormsg = error;
                this.spinner.hide();
                this.toastr.error("", this.errormsg);
            }
        );
    }
}
