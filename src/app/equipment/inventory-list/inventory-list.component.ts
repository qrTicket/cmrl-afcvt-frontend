import {
    Component,
    OnInit,
    ViewChild,
    TemplateRef,
    ViewContainerRef,
    OnDestroy,
    ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { ProductService } from "../_services/product.service";
import { Product } from "../_models/product.model";
import { InvetoryCSVService } from "../_services/invetory-csv.service";
import { AddUserService } from "src/app/user-manger/_services/add-user.service";
import Swal from "sweetalert2";
import { EquipmentService } from "../_services";
import { saveAs } from 'file-saver';

@Component({
    selector: "app-inventory-list",
    templateUrl: "./inventory-list.component.html",
    styleUrls: ["./inventory-list.component.scss"],
})
export class InventoryListComponent implements OnInit, OnDestroy {
    @ViewChild('fileExtn') fileExtn:ElementRef<any>;
    @ViewChild("outlet", { read: ViewContainerRef })
    outletRef: ViewContainerRef;
    @ViewChild("content", { read: TemplateRef })
    contentRef: TemplateRef<any>;

    subscription: Subscription[] = [];
    assignForm: FormGroup;
    modalRef: BsModalRef;
    submitted: Boolean = false;
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    // public temp: Object = false;
    public temp: Boolean = false;
    productList: any[];
    sample = "Sample.csv";
    file: any;
    myCSV: any;
    assignId: number;
    stationList: any;
    successmsg: any;
    errormsg: any;
    assignList: any;
    mySubscription: any;
    fileExtension:any[];

    constructor(
        private formBuilder: FormBuilder,
        public productService: ProductService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private modalService: BsModalService,
        private userService: AddUserService,
        private equipSrv:EquipmentService
    ) {}

    openAssignModel(assignTemplate: TemplateRef<any>, list) {
        // console.log("List", list);
        this.assignId = list;

        this.modalRef = this.modalService.show(assignTemplate, this.config);
    }

    confirm(id) {
        // console.log(id, "Deleted Successfully");
        // this.productService.deleteProduct(id).subscribe((res) => {
        //     this.getproductList();
        // });
        this.productService.deleteProduct(id).subscribe({
            next:(res)=>{
                this.getproductList();
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })

        this.modalRef.hide();
    }

    decline(): void {
        // console.log("Declined");

        this.modalRef.hide();
    }
    openDeleteModel(deleteTemplate: TemplateRef<any>) {
        this.modalRef = this.modalService.show(deleteTemplate, this.config);
    }

    deleteHandler(id, index) {
        this.spinner.show();
        // this.productService.deleteEquipment(id).subscribe(
        //     (res) => {
        //         // console.log(res);
        //         this.spinner.hide();
        //         if (res["status"] === "1") {
        //             this.productList.splice(index, 1);
        //             this.toastr.success(res["data"]);
        //             this.temp = true;
        //             this.modalRef.hide();
        //             this.getproductList();
        //         } else {
        //             Swal.fire({
        //                 icon: "error",
        //                 title: "Error!",
        //                 text: res["data"],
        //             });
        //         }
        //     },
        //     (error) => {
        //         this.spinner.hide();
        //         this.errormsg = error;
        //         // this.toastr.error(this.errormsg.data);
        //         swal(this.errormsg.data, "", "error");
        //     }
        // );
        this.productService.deleteEquipment(id).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.spinner.hide();
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.spinner.hide();
                this.productList.splice(index, 1);
                this.toastr.success(res["data"]);
                this.temp = true;
                this.modalRef.hide();
                this.getproductList();
              }
            },
            error:(err)=>{
                this.spinner.hide();
                this.errormsg = err.error.data;
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: err.error.data
                });
              
            }
          })
    }
    declineDelete(): void {
        this.modalRef.hide();
    }

    ngOnInit(): void {
        this.assignForm = this.formBuilder.group({
            stationCode: ["", Validators.required],
        });
        this.getproductList();
        this.subscription.push(
            // this.userService.getAllStation().subscribe((res) => {
            //     this.stationList = res["data"];
            //     this.temp = true;
            //     // console.log(this.stationList, "Inventory");
            // })
            this.userService.getAllStation().subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.stationList = res.data;
                    this.temp = true;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
        // this.productService.assignNonAssigned().subscribe((res) => {
        //     // console.log(res);
        //     this.assignList = res["data"];
        //     this.temp = true;
        // });
        // this.productService.assignNonAssigned().subscribe({
        //     next:(res:any)=>{
        //       if(res.status === "0"){
        //         this.toastr.error(res.data,'Error!')
        //       }
        //       else if(res.status === "1"){
        //         this.assignList = res.data;
        //         this.temp = true;
        //       }
        //     },
        //     error:(err)=>{
        //         this.toastr.error(err.error.data,'Error!')
        //     }
        //   })

        this.getFileExtensionList();
    }
    get fval() {
        return this.assignForm.controls;
    }

    ngAfterContentInit() {
        // this.outletRef.createEmbeddedView(this.contentRef);
    }
    getproductList() {
        this.spinner.show();
        this.subscription.push(
            // this.productService.getProductList().subscribe(
            //     (data) => {
            //         if (data.status === "1") {
            //             this.productList = data["data"];
            //             // console.log(this.productList);

            //             this.temp = true;
            //         } else {
            //             // console.log(data);
            //             // this.toastr.warning(data.data);
            //             swal(data.data, "", "warning");
            //         }
            //         this.spinner.hide();
            //     },
            //     (error) => {
            //         // console.log(error);
            //         this.spinner.hide();
            //     }
            // )
            this.productService.getProductList().subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                    this.spinner.hide();
                    this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.spinner.hide();
                    this.productList = res.data;
                    this.temp = true;
                  }
                },
                error:(err)=>{
                    this.spinner.hide();
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
    }

    editHandler(list) {
        this.router.navigate(["equipment/equipment-update", list.id]);
    }

    // get file extension for custom filter
    getFileExtensionList(){
        this.equipSrv.getFileExtensionNonForAssignedEquipments().subscribe({
          next:(resp:any)=>{
            if(resp["status"] === "1"){
              this.fileExtension = resp.data;
              console.log(this.fileExtension);
            }
          },
          error:(err:any)=>{
            this.toastr.error(err.error.data,'ERROR')
          }
        })
    }

  onFileExtensionChange(e:any){
    let fileExt = e.target.value;
    this.equipSrv.downloadFileForNonAssignedEquipment(fileExt).subscribe({
      next:(resp:any)=>{
        const blob = new Blob([resp], {type:'*/*'});
        saveAs(blob,`NonAssignedEquipment.${fileExt}`);
        this.fileExtn.nativeElement.value = "";
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'ERROR')
      }
    })
  }

    onSubmit() {
        this.submitted = true;
        if (this.assignForm.invalid) {
            //return swal("Please select station!", "", "error");
            return Swal.fire({
                icon: "error",
                title: "Error!",
                text:"Please select station!"
            });
        }
        this.spinner.show();
        console.log(this.assignForm.value);
        this.subscription.push(
            // this.productService
            //     .assignEquipment(this.assignForm.value, this.assignId)
            //     .subscribe(
            //         (res) => {
            //             this.spinner.hide();
            //             console.log(res);
            //             this.successmsg = res;
            //             this.toastr.success("", this.successmsg.data);
            //             this.assignForm.reset();
            //             this.modalRef.hide();
            //             this.router.navigate([
            //                 "equipment/assign/equipment/list",
            //             ]);
            //         },
            //         (error) => {
            //             this.spinner.hide();
            //             console.log(error);
            //             this.errormsg = error;
            //             // this.toastr.error("", this.errormsg);
            //             swal(this.errormsg, "", "error");
            //         }
            //     )
                this.productService.assignEquipment(this.assignForm.value, this.assignId).subscribe({
                    next:(res:any)=>{
                      if(res.status === "0"){
                        this.spinner.hide();
                        this.toastr.error(res.data,'Error!')
                      }
                      else if(res.status === "1"){
                        this.spinner.hide();
                        this.submitted = false;
                        console.log(res);
                        this.successmsg = res;
                        this.toastr.success("", this.successmsg.data);
                        this.assignForm.reset();
                        this.modalRef.hide();
                        this.router.navigate(["equipment/assign/equipment/list",]);
                      }
                    },
                    error:(err)=>{
                        this.spinner.hide();
                        this.toastr.error(err.error.data,'Error!')
                    }
                  })
        );
        // this.outletRef.clear();
        // this.outletRef.createEmbeddedView(this.contentRef);
    }

    ngOnDestroy() {
        this.subscription.forEach((subs) => subs.unsubscribe());
    }
}
