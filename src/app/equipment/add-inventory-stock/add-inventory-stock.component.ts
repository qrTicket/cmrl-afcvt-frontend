import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RxwebValidators, NumericValueType, date } from "@rxweb/reactive-form-validators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { ProductTypeService } from "../_services/product-type.service";
import { ProductService } from "../_services/product.service";
import { InvetoryCSVService } from "../_services/invetory-csv.service";
import Swal from "sweetalert2";


@Component({
    selector: "app-add-inventory",
    templateUrl: "./add-inventory-stock.component.html",
    styleUrls: ["./add-inventory-stock.component.scss"],
})
export class AddInventoryComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    addInventoryStock: FormGroup;
    uploadFileForm: FormGroup;
    datePickerConfigMfg: Partial<BsDatepickerConfig>;
    datePickerConfigPur: Partial<BsDatepickerConfig>;
    successmsg;
    message;
    minDate: Date;
    maxDate: Date;
    submitted = false;
    submit = false;
    productList: any = [];
    manufactureList: any = [];
    purchaseDate: any;
    equipmentTypeList: any[]=[];
    currentDate: any;
    data: any;
    isDisabled: boolean = true;
    constructor(
        private router: Router,
        private datePipe: DatePipe,
        private productTypeService: ProductTypeService,
        private productService: ProductService,
        private CSV_API: InvetoryCSVService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {
        this.datePickerConfigMfg = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-dark-blue",
                maxDate: (this.maxDate = new Date()),
            }
        );

        this.datePickerConfigPur = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-dark-blue",
                maxDate: (this.maxDate = new Date()),
            }
        );
    }

    ngOnInit() {
        this.addInventoryStock = this.formBuilder.group({
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
                    // RxwebValidators.date({
                    //     message: "This will take only valid date format!",
                    //     allowISODate: true,
                    // }),
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
                            special:
                                /^(?:[0-9]+[a-z_-]|[a-z-_]+[0-9])[a-z0-9]*$/i,
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
                    RxwebValidators.date({
                        message: "This will take only valid date format!",
                        allowISODate: true,
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
                        message: "This will not accept zero!",
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
    }

    get fval() {
        return this.addInventoryStock.controls;
    }
    onValueChange(value) {
        // var data;
        this.data = new Date(value);
        // console.log(this.data);
        this.data.setDate(this.data.getDate() + 1);
        // console.log(this.data);
        this.datePickerConfigPur = Object.assign(
            {},
            {
                adaptivePosition: true,
                dateInputFormat: "YYYY-MM-DD",
                containerClass: "theme-dark-blue",
                minDate: this.data,
                maxDate: (this.maxDate = new Date()),
            }
        );
    }
    handler(value) {
        this.isDisabled = false;
        // this.datePickerConfigMfg = Object.assign(
        //     {},
        //     {
        //         adaptivePosition: true,
        //         dateInputFormat: "YYYY-MM-DD",
        //         containerClass: "theme-dark-blue",
        //         minDate: new Date(),
        //         maxDate: new Date(),
        //     }
        // );
        // this.datePickerConfigPur = Object.assign(
        //     {},
        //     {
        //         adaptivePosition: true,
        //         dateInputFormat: "YYYY-MM-DD",
        //         containerClass: "theme-dark-blue",
        //         minDate: this.data,
        //         maxDate: new Date(),
        //     }
        // );
    }

    onaddinvetFormSubmit() {
        this.submitted = true;
        if (this.addInventoryStock.invalid) {
            //return swal("Please fill details!", "", "error");
            return Swal.fire({
                title:'Error',
                icon:'error',
                text:"Please fill details!"
              })
        }
        
        this.spinner.show();
        this.subscriptions.push(
            // this.productService
            //     .postProduct(this.addInventoryStock.value)
            //     .subscribe(
            //         (data) => {
            //             if(data["status"] === "1"){
            //                 this.successmsg = data;
            //                 this.spinner.hide();
            //                 this.toastr.success("", this.successmsg.data, {
            //                     progressBar: true,
            //                 });
            //                 this.addInventoryStock.reset();
            //                 this.router.navigate(["equipment/inventoryList"]);
            //             }
            //             else{
            //                 this.spinner.hide();
            //                 this.toastr.error("", data["data"], {progressBar:true});
            //             }
            //         },
            //         (error) => {
            //             console.log(error);
            //             this.message = error;
            //             this.spinner.hide();
            //             swal(this.message.message, "", "error");
            //         }
            //     )
                this.productService.postProduct(this.addInventoryStock.value).subscribe({
                    next:(res:any)=>{
                      if(res.status === "0"){
                        this.spinner.hide();
                        this.toastr.error(res.data,'Error!')
                      }
                      else if(res.status === "1"){
                        this.successmsg = res.data;
                        this.spinner.hide();
                        this.toastr.success("", this.successmsg.data, {progressBar: true});
                        this.addInventoryStock.reset();
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
        //console.log(this.addInventoryStock.value);
        //this.addInventoryStock.reset();
        this.submitted = false;
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }
}
