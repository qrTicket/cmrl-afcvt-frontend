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
import { formatDate } from "@angular/common";


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
    datePickerConfigWarrantyStartDate: Partial<BsDatepickerConfig>;
    datePickerConfigWarrantyEndDate: Partial<BsDatepickerConfig>;

    modalRef: BsModalRef;
    isDisabled: Boolean = true;
    successmsg: any;
    errormessage: any;
    submitted = false;
    equipId: any;
    minDate: any;
    maxDate: Date;
    equipmentTypeList: any;
    data: any;
    message:any = "";


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
                dateInputFormat: "DD-MM-YYYY",
                containerClass: "theme-dark-blue",
                maxDate: new Date(),
            }
        );

        this.datePickerConfigPur = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "DD-MM-YYYY",
                containerClass: "theme-dark-blue",
                maxDate: new Date(),
            }
        );
        this.datePickerConfigWarrantyStartDate = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "DD-MM-YYYY",
                containerClass: "theme-dark-blue",
                maxDate: new Date(),
            }
        );

        this.datePickerConfigWarrantyEndDate = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "DD-MM-YYYY",
                containerClass: "theme-dark-blue",
                //maxDate: this.maxDate
            }
        );
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
            appVersion : ['',
            [
                RxwebValidators.required({
                    message: "This field is required!",
                }),
                RxwebValidators.numeric({
                    acceptValue: NumericValueType.PositiveNumber,
                    allowDecimal: true,
                    message: "This will only accept positive number!",
                }),
                RxwebValidators.pattern({
                    expression: { nonZero: /^[1-9]/ },
                    message: "This will accept non zero!",
                }),
                RxwebValidators.pattern({
                    expression: { deci: /^\d+\.\d{1,2}$/ },
                    message: "This will accept decial number only!",
                }),
            ]
            ],
            warrantyStartDate: ["",[ RxwebValidators.required({ message: "This field is required!"}) ]],
            warrantyEndDate: ["",[ RxwebValidators.required({ message: "This field is required!"}) ]],
            deviceDescription: ["",[ RxwebValidators.required({ message: "This field is required!"}) ]],
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

    onManufacturingDateDateChange(value) {
        const dateData = new Date(value);
        this.updateEquipmentForm.get("mfgDate").setValue(formatDate(dateData,'dd-MM-yyyy','en'));
        let data;
        data = new Date(value);
        data.setDate(data.getDate() + 1);
        this.datePickerConfigPur = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "DD-MM-YYYY",
                containerClass: "theme-dark-blue",
                minDate: data,
                maxDate: new Date(),
            }
        );
        
    }

    onPurchaseDateChange(val:any){
        const dateData = new Date(val);
        this.updateEquipmentForm.get("purchaseDate").setValue(formatDate(dateData,'dd-MM-yyyy','en'));
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

    onWarrantyStartDateChange(val:any){
       this.updateEquipmentForm.get("warrantyEndDate").reset();
        const dateData = new Date(val);
        this.updateEquipmentForm.get("warrantyStartDate").setValue(formatDate(dateData,'dd-MM-yyyy','en'));
         this.data = new Date(val);
         this.data.setDate(this.data.getDate() + 1);
         this.datePickerConfigWarrantyEndDate = Object.assign(
             {},
             {
                 adaptivePosition: true,
                 dateInputFormat: "DD-MM-YYYY",
                 containerClass: "theme-dark-blue",
                 minDate: this.data,
                 maxDate: this.maxDate,
             }
         );
    }

    onWarrantyEndDateChange(val:any){
        const dateData = new Date(val);
        this.updateEquipmentForm.get("warrantyEndDate").setValue(formatDate(dateData,'dd-MM-yyyy','en'));
    }

    updateEquipment(equipment: any) {
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
            appVersion: equipment.appVersion,
            warrantyStartDate: equipment.warrantyStartDate,
            warrantyEndDate: equipment.warrantyEndDate,
            deviceDescription: equipment.deviceDescription,
        });
    }

    get fval() {
        return this.updateEquipmentForm.controls;
    }

    checkDates(updateTemplate: TemplateRef<any>){
        if (this.updateEquipmentForm.invalid) {
            this.submitted = true;
            return Swal.fire({
                title:'Error',
                icon:'error',
                text:'Please fill all fields!'
            })
        } 

        const mfgDate = this.updateEquipmentForm.get("mfgDate").value;
        const purchaseDate = this.updateEquipmentForm.get("purchaseDate").value;
        const [day, month, year] = mfgDate.split('-');
        const [day1, month1, year1] = purchaseDate.split('-');
        const convertedMfgDate = new Date(+year, +month - 1, +day);
        const convertedPurchaseDate = new Date(+year1, +month1 - 1, +day1);
        if ((mfgDate !== null && purchaseDate !== null) && convertedPurchaseDate < convertedMfgDate) {
        return Swal.fire({
            icon: "warning",
            title: "WARNING",
            text: "'Purchase Date' should not be less than 'Manufacturing Date'",
        });
        } 

        const warrantyStartDate = this.updateEquipmentForm.get("warrantyStartDate").value;
        const warrantyEndDate = this.updateEquipmentForm.get("warrantyEndDate").value;
        const [wday, wmonth, wyear] = warrantyStartDate.split('-');
        const [wday1, wmonth1, wyear1] = warrantyEndDate.split('-');
        const convertedWarrantyStartDate = new Date(+wyear, +wmonth - 1, +wday);
        const convertedWarrantyEndDate = new Date(+wyear1, +wmonth1 - 1, +wday1);
        if ((warrantyStartDate !== null && warrantyEndDate !== null) && convertedWarrantyEndDate < convertedWarrantyStartDate) {
        return Swal.fire({
            icon: "warning",
            title: "WARNING",
            text: "'Warranty End Date' should not be less than 'Warranty Start Date'",
        });
        } 

        this.openModal(updateTemplate);
    }

   /* onUpdate() {

        const mfgDate = this.updateEquipmentForm.get("mfgDate").value;
        const purchaseDate = this.updateEquipmentForm.get("purchaseDate").value;
    
        const [day, month, year] = mfgDate.split('-');
        const [day1, month1, year1] = purchaseDate.split('-');
    
        const convertedMfgDate = new Date(+year, +month - 1, +day);
        const convertedPurchaseDate = new Date(+year1, +month1 - 1, +day1);
    
        if ((mfgDate !== null && purchaseDate !== null) && convertedPurchaseDate < convertedMfgDate) {
        return Swal.fire({
            icon: "warning",
            title: "WARNING",
            text: "'Purchase Date' should not be less than 'Manufacturing Date'",
        });
        } 

        const warrantyStartDate = this.updateEquipmentForm.get("warrantyStartDate").value;
        const warrantyEndDate = this.updateEquipmentForm.get("warrantyEndDate").value;
    
        const [wday, wmonth, wyear] = warrantyStartDate.split('-');
        const [wday1, wmonth1, wyear1] = warrantyEndDate.split('-');
    
        const convertedWarrantyStartDate = new Date(+wyear, +wmonth - 1, +wday);
        const convertedWarrantyEndDate = new Date(+wyear1, +wmonth1 - 1, +wday1);
    
        if ((warrantyStartDate !== null && warrantyEndDate !== null) && convertedWarrantyEndDate < convertedWarrantyStartDate) {
        return Swal.fire({
            icon: "warning",
            title: "WARNING",
            text: "'Warranty End Date' should not be less than 'Warranty Start Date'",
        });
        } 

        this.submitted = true;
        if (this.updateEquipmentForm.invalid) {
            return Swal.fire({
                title:'Error',
                icon:'error',
                text:"Please fill details!"
              })
        }
        
        //this.spinner.show();
        console.log(this.updateEquipmentForm.value,'form values');
        
        let reqObj = {
            "appVersion": this.updateEquipmentForm.value.appVersion,
            "deviceDescription": this.updateEquipmentForm.value.deviceDescription,
            "equipmentCode": this.updateEquipmentForm.value.equipmentCode,
            "equipmentModelName": this.updateEquipmentForm.value.equipmentModelName,
            "equipmentTypeId": this.updateEquipmentForm.value.equipmentTypeId,
            "manufactureName": this.updateEquipmentForm.value.manufactureName,
            "mfgDate": this.updateEquipmentForm.value.mfgDate ,
            "purchaseDate": this.updateEquipmentForm.value.purchaseDate , 
            "serialNumber": this.updateEquipmentForm.value.serialNumber,
            "version": this.updateEquipmentForm.value.version,
            "warranty": this.updateEquipmentForm.value.warranty,
            "warrantyStartDate": this.updateEquipmentForm.value.warrantyStartDate ,
            "warrantyEndDate": this.updateEquipmentForm.value.warrantyEndDate ,
        }
        this.subscriptions.push(
            this.productService.updateEquipment(this.equipId, reqObj).subscribe({
                next:(res:any)=>{
                    if(res.status === "0"){
                    this.spinner.hide();
                    this.toastr.error(res.data,'Error!')
                    }
                    else if(res.status === "1"){
                    this.successmsg = res.data;
                    this.spinner.hide();
                    this.toastr.success(res.data,"SUCCESS", {progressBar: true});
                    this.updateEquipmentForm.reset();
                    this.router.navigate(["equipment/inventoryList"]);
                    }
                },
                error:(err)=>{
                    this.message = err.error.data;
                    this.spinner.hide();
                    this.toastr.error(err.error.data,'Error!')
                }
                })
        );
        this.submitted = false;
    }
*/

    openModal(updateTemplate: TemplateRef<any>) {
        this.submitted = true;
        if (this.updateEquipmentForm.invalid) {
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
        let reqObj = {
            "appVersion": this.updateEquipmentForm.value.appVersion,
            "deviceDescription": this.updateEquipmentForm.value.deviceDescription,
            "equipmentCode": this.updateEquipmentForm.value.equipmentCode,
            "equipmentModelName": this.updateEquipmentForm.value.equipmentModelName,
            "equipmentTypeId": this.updateEquipmentForm.value.equipmentTypeId,
            "manufactureName": this.updateEquipmentForm.value.manufactureName,
            "mfgDate": this.updateEquipmentForm.value.mfgDate ,
            "purchaseDate": this.updateEquipmentForm.value.purchaseDate , 
            "serialNumber": this.updateEquipmentForm.value.serialNumber,
            "version": this.updateEquipmentForm.value.version,
            "warranty": this.updateEquipmentForm.value.warranty,
            "warrantyStartDate": this.updateEquipmentForm.value.warrantyStartDate ,
            "warrantyEndDate": this.updateEquipmentForm.value.warrantyEndDate ,
        }
        this.subscriptions.push(
            this.productService.updateEquipment(this.equipId, reqObj).subscribe({
                next:(res:any)=>{
                    if(res.status === "0"){
                    this.spinner.hide();
                    this.toastr.error(res.data,'Error!')
                    }
                    else if(res.status === "1"){
                    this.successmsg = res.data;
                    this.spinner.hide();
                    this.toastr.success(res.data,"SUCCESS", {progressBar: true});
                    this.updateEquipmentForm.reset();
                    this.router.navigate(["equipment/inventoryList"]);
                    }
                },
                error:(err)=>{
                    this.message = err.error.data;
                    this.spinner.hide();
                    this.toastr.error(err.error.data,'Error!')
                }
                })
        );
        this.submitted = false;
        this.modalRef.hide();
    }
    decline() {
        this.modalRef.hide();
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }
}
