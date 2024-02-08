import { Component, OnInit } from "@angular/core";
import { ProductService } from "../_services/product.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-unassign-list",
    templateUrl: "./unassign-list.component.html",
    styleUrls: ["./unassign-list.component.scss"],
})
export class UnassignListComponent implements OnInit {
    unassign: any;
    errormsg: any;
    constructor(
        private productAPI: ProductService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.productAPI.allUnassignedEquipment().subscribe(
            (res) => {
                this.spinner.hide();
                this.unassign = res;
                // console.log(this.unassign);
            },
            (error) => {
                this.spinner.hide();
                // console.log(error);
                this.errormsg = error;
                this.toastr.error("", this.errormsg);
            }
        );
    }
}
