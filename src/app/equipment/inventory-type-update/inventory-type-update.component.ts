import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import {
    RxwebValidators,
    NumericValueType,
} from "@rxweb/reactive-form-validators";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ProductTypeService } from "../_services/product-type.service";
import { ProductType } from "../_models/product-type.model";
import Swal from "sweetalert2";


@Component({
    selector: "app-inventory-type-update",
    templateUrl: "./inventory-type-update.component.html",
    styleUrls: ["./inventory-type-update.component.scss"],
})
export class InventoryTypeUpdateComponent implements OnInit {
    updateInventoryType: FormGroup;
    submitted = false;
    successmsg;
    errormsg;
    modalRef: BsModalRef;
    icon = false;
    spinners = false;
    equipmentId: number;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private modalService: BsModalService,
        private productTypeService: ProductTypeService
    ) {}

    openModal(updateTemplate: TemplateRef<any>) {
        this.submitted = true;
        if (this.updateInventoryType.invalid) {
            //return swal("Please fill all fields!", "", "error");
            return Swal.fire({
                title:'Error',
                icon:'error',
                text:'Please fill all fields'
              })
        } else {
            this.modalRef = this.modalService.show(updateTemplate);
        }
    }

    ngOnInit() {
        this.updateInventoryType = this.formBuilder.group({
            equipmentTypeId: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.numeric({
                        acceptValue: NumericValueType.PositiveNumber,
                        allowDecimal: false,
                        message: "This will take only positive numbers",
                    }),
                ],
            ],
            equipmentTypeShortName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.alpha({
                        message: "Only Alphabet is required!",
                        allowWhiteSpace: true,
                    }),
                ],
            ],
            equipmentTypeName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.alpha({
                        message:"This will accept alphabet only!",
                        allowWhiteSpace: true
                    })
                ],
            ],
        });

        //this will fetch id from url as the equipment type id is send with url
        this.route.paramMap.subscribe((params) => {
            this.equipmentId = +params.get("id");
            if (this.equipmentId) {

                this.getEquipmentTypdId(this.equipmentId);
            }
        });
    }

    //get the equipment type details with id from database
    getEquipmentTypdId(id) {
        // this.productTypeService.getById(id).subscribe(
        //     (equipmentData: ProductType) => {
        //         this.updateEquipmentType(equipmentData["data"]);
        //     },
        //     (error) => console.log(error)
        // );
        this.productTypeService.getById(id).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data)
              }
              else if(res.status === "1"){
                this.updateEquipmentType(res.data)
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data)
            }
          })
    }

    //path all equipment type details to form
    updateEquipmentType(payload: ProductType) {
        this.updateInventoryType.patchValue({
            equipmentTypeId: payload.equipmentTypeId,
            equipmentTypeName: payload.equipmentTypeName,
            equipmentTypeShortName: payload.equipmentTypeShortName,
        });
    }

    get fval() {
        return this.updateInventoryType.controls;
    }

    
    onaddinvetFormSubmit() {
        this.spinner.show();
        this.productTypeService.editEquipmentType(this.equipmentId, this.updateInventoryType.value).subscribe({
            next:(res:any)=>{
                if(res.status === "0"){
                    this.spinner.hide();
                    this.toastr.error(res.data)
                }
                else if(res.status === "1"){
                    this.spinner.hide();
                    //this.successmsg = res.data;
                    this.toastr.success(res.data);
                    this.router.navigate(["equipment/inventoryTypeList"])
                }
            },
            error:(err)=>{
                this.spinner.hide();
                this.errormsg = err.error.data;
                this.toastr.error(this.errormsg)
            }
            })

        
        this.modalRef.hide();
    }
    decline() {
        this.modalRef.hide();
    }
}
