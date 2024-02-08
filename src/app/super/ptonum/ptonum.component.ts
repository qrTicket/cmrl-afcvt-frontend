import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { SuperService } from "../_superservices/super.service";
import { PTO } from "../../auth_models/pto.model";
import { DataTableDirective } from "angular-datatables";
import { UntypedFormBuilder, FormGroup, Validators } from "@angular/forms";
import {
    NgbModal,
    ModalDismissReasons,
    NgbModule,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-ptonum",
    templateUrl: "./ptonum.component.html",
    styleUrls: ["./ptonum.component.scss"],
})
export class PtonumComponent implements OnInit {
    verified;
    message;
    ptoList: PTO[];
    public temp: Object = false;
    closeResult: string;

    constructor(
        private superService: SuperService,
        private modalService: NgbModal,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: UntypedFormBuilder
    ) {}

    ngOnInit() {
        this.superService.getVendorList().subscribe((data) => {
            this.ptoList = data.filter(
                (list) => list.verified === false || list.rejected === true
            );
            this.temp = true;
        });
    }

    open(id, list) {
        //console.log(this.ptoList = this.ptoList.filter((item) => item.verified === 'true'));

        // const verified = list.filter(list => list.verified === 'true')
        // console.log(verified);

        this.router.navigate(["super-admin/verify", id], {
            queryParams: { mode: "readonly", verify: "PTO" },
            fragment: "loading",
        });
        // console.log(id);
    }
}
