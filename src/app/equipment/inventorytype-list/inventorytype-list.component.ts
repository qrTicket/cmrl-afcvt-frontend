import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { fadeInAnimation } from "../../_animations/fadeIn.animation";

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { ProductTypeService } from "../_services/product-type.service";
@Component({
    selector: "app-inventorytype-list",
    templateUrl: "./inventorytype-list.component.html",
    styleUrls: ["./inventorytype-list.component.scss"],
    animations: [fadeInAnimation],
    host: { "[@fadeInAnimation]": "" },
})
export class InventorytypeListComponent implements OnInit {
    modalRef: BsModalRef;
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    public temp: Object = false;
    errormsg: any;
    productTypeList: any;
    constructor(
        public productTypeService: ProductTypeService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private modalService: BsModalService
    ) {}
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.config);
    }
    confirm(id, index) {
        this.spinner.show();
        // this.productTypeService.deleteById(id).subscribe(
        //     (res) => {
        //         if (res["status"] === "0") {
        //             Swal.fire({
        //                 icon: "error",
        //                 text: res["data"],
        //             });
        //             // this.toastr.info(res["data"]);
        //             this.spinner.hide();
        //         } else if (res["status"] === "1") {
        //             this.productTypeList.splice(index, 1);
        //             this.toastr.success(res["data"]);
        //             this.ProductTypeList();
        //         }
        //     },
        //     (error) => {
        //         this.errormsg = error;
        //         this.spinner.hide();
        //         Swal.fire({
        //             icon: "error",
        //             text: this.errormsg,
        //         });
        //         // this.toastr.error('', this.errormsg);
        //     }
        // );
        this.productTypeService.deleteById(id).subscribe({
            next:(res:any)=>{
                this.spinner.hide();
                if(res.status === "0"){
                    Swal.fire({
                        title:'Error!',
                        icon: "error",
                        text: res.data,
                    });
                }
              else if(res.status === "1"){
                this.productTypeList.splice(index, 1);
                this.toastr.success(res.data);
                this.ProductTypeList();
              }
            },
            error:(err)=>{
                this.errormsg = err.error.data;
                this.spinner.hide();
                Swal.fire({
                    title:'Error!',
                    icon: "error",
                    text: this.errormsg,
                });
            }
          })

        this.modalRef.hide();
    }

    decline(): void {
        // console.log("Declined");

        this.modalRef.hide();
    }

    ngOnInit() {
        this.ProductTypeList();
    }
    ProductTypeList() {
        this.spinner.show();
        this.productTypeService.getProductTypeList().subscribe(
            (res) => {
                if (res["status"] === "1") {
                    this.spinner.hide();
                    this.productTypeList = res["data"];
                    this.temp = true;
                } else {
                    this.spinner.hide();
                    this.toastr.warning("", res["data"]);
                }
            },
            (error) => {
                console.log(error);
                this.spinner.hide();
            }
        );
    }
    handleUpdate(list) {
        //console.log(list);
        this.router.navigate(["equipment/inventory/update", list.id]);
    }
}
