import { Component, OnInit, OnDestroy, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import {
    RxwebValidators,
    NumericValueType,
} from "@rxweb/reactive-form-validators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";

import { ProductService } from "../_services/product.service";
import { Product } from "../_models/product.model";
import Swal from "sweetalert2";


@Component({
    selector: "app-update-equipment",
    templateUrl: "./update-equipment.component.html",
    styleUrls: ["./update-equipment.component.scss"],
})
export class UpdateEquipmentComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    updateEquipmentForm: FormGroup;
    datePickerConfigMfg: Partial<BsDatepickerConfig>;
    datePickerConfigPur: Partial<BsDatepickerConfig>;
    modalRef: BsModalRef;
    isDisabled: Boolean = true;
    successmsg: any;
    errormessage: any;
    submitted = false;
    equipId: any;
    minDate: any;
    maxDate: Date;
    equipmentTypeList: any;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private modalService: BsModalService,
        private productService: ProductService
    ) {
        this.datePickerConfigMfg = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-dark-blue",
                maxDate: new Date(),
            }
        );

        this.datePickerConfigPur = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-dark-blue",
                maxDate: new Date(),
            }
        );
    }

    openModal(updateTemplate: TemplateRef<any>) {
        this.submitted = true;
        if (this.updateEquipmentForm.invalid) {
            // return this.toastr.error("Please fill all fields!");
            //return swal("Please fill all fields!", "", "error");
            return Swal.fire({
                title:'Error',
                icon:'error',
                text:'Please fill all fields!'
              })
        } else {
            this.modalRef = this.modalService.show(updateTemplate);
        }
    }
    confirm() {
        this.spinner.show();
        this.subscriptions.push(
            // this.productService.updateEquipment(this.equipId, this.updateEquipmentForm.value).subscribe(
            //         (res) => {
            //             this.spinner.hide();
            //             this.successmsg = res;
            //             this.toastr.success(this.successmsg.data);
            //             this.updateEquipmentForm.reset();
            //             this.submitted = false;
            //             this.router.navigate(["equipment/inventoryList"]);
            //         },
            //         (error) => {
            //             this.spinner.hide();
            //             this.errormessage = error;
            //             // this.toastr.error(this.errormessage.data);
            //            // swal(this.errormessage.data, "", "error");
            //             Swal.fire({
            //                 title:'Error',
            //                 icon:'error',
            //                 text:this.errormessage.data
            //               })
            //         }
            //     )
                this.productService.updateEquipment(this.equipId, this.updateEquipmentForm.value).subscribe({
                    next:(res:any)=>{
                      if(res.status === "0"){
                        this.spinner.hide();
                        this.toastr.error(res.data,'Error!')
                      }
                      else if(res.status === "1"){
                        this.spinner.hide();
                        this.successmsg = res;
                        this.toastr.success(this.successmsg.data);
                        this.updateEquipmentForm.reset();
                        this.submitted = false;
                        this.router.navigate(["equipment/inventoryList"]);
                      }
                    },
                    error:(err)=>{
                        this.spinner.hide();
                        this.toastr.error(err.error.data,'Error!')
                    }
                  })
        );
        this.modalRef.hide();
    }
    decline() {
        // console.log("Cancel");
        this.modalRef.hide();
    }

    ngOnInit() {
        this.updateEquipmentForm = this.formBuilder.group({
            equipmentTypeId: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],

            manufactureName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.alpha({
                        message: "This will take only Alphabet!",
                        allowWhiteSpace: true,
                    }),
                ],
            ],
            serialNumber: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.alphaNumeric({
                        message: "This will accept alphanumeric!",
                    }),
                ],
            ],
            mfgDate: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            version: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.numeric({
                        acceptValue: NumericValueType.PositiveNumber,
                        allowDecimal: true,
                        message: "This will only accept positive integere!",
                    }),
                    RxwebValidators.pattern({
                        expression: { nonZero: /^[1-9]/ },
                        message: "This will accept non zero!",
                    }),
                    RxwebValidators.pattern({
                        expression: { deci: /^\d+\.\d{1,2}$/ },
                        message: "This will accept decial number only!",
                    }),
                ],
            ],
            equipmentModelName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.pattern({
                        expression: {
                            special: /^(?:[0-9]+[a-z_-]|[a-z-_]+[0-9])[a-z0-9]*$/i,
                        },
                        message: "This will accept alphanumeric!",
                    }),
                ],
            ],
            purchaseDate: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                ],
            ],
            equipmentCode: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.pattern({
                        expression: {
                            alpha: /^(?:[0-9]+[a-z_-]|[a-z-_]+[0-9])[a-z0-9]*$/i,
                        },
                        message: "This will accept alphanumeric!",
                    }),
                ],
            ],
            warranty: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.pattern({
                        expression: { notZero: /^[1-9]/ },
                        message: "This will accept non zero number!",
                    }),
                    RxwebValidators.digit({
                        message: "This will accept only numbers!",
                    }),
                ],
            ],
        });

        this.subscriptions.push(
            // this.productService.equipmentType().subscribe((res) => {
            //     this.equipmentTypeList = res["data"];
            // })
            this.productService.equipmentType().subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.equipmentTypeList = res.data;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
        this.route.paramMap.subscribe((params) => {
            const Eid = +params.get("id");
            if (Eid) {
                this.equipId = Eid;
                this.getEquipment(Eid);
            }
        });
    }

    onValueChange(value) {
        let data;
        data = new Date(value);
        data.setDate(data.getDate() + 1);
        this.datePickerConfigPur = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-dark-blue",
                minDate: data,
                maxDate: new Date(),
            }
        );
    }
    handler(value) {
        if (value === "onHidden") {
            this.updateEquipmentForm.controls["purchaseDate"].reset();
        }
    }

    getEquipment(id) {
        this.subscriptions.push(
            // this.productService
            //     .getEquipmentById(id)
            //     .subscribe((equipmentData) => {
            //         this.updateEquipment(equipmentData["data"]);
            //     })
            this.productService.getEquipmentById(id).subscribe({
                next:(res:any)=>{
                    if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                    }
                    else if(res.status === "1"){
                    this.updateEquipment(res.data) ;
                    }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
                })
        );
    }

    updateEquipment(equipment: Product) {
        this.updateEquipmentForm.patchValue({
            id: equipment.id,
            equipmentTypeId: equipment.equipmentTypeId,
            manufactureName: equipment.manufactureName,
            serialNumber: equipment.serialNumber,
            mfgDate: equipment.mfgDate,
            expDate: equipment.expDate,
            version: equipment.version,
            equipmentModelName: equipment.equipmentModelName,
            equipmentCode: equipment.equipmentCode,
            purchaseDate: equipment.purchaseDate,
            warranty: equipment.warranty,
        });
    }

    get fval() {
        return this.updateEquipmentForm.controls;
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }
}
