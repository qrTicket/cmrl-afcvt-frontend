import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Station } from "../_models/station.model";
import { StationService } from "../_services/station.service";
import { Line } from "../_models/lines.model";
import { LinesService } from "../_services/lines.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

@Component({
    selector: "app-addstation",
    templateUrl: "./addstation.component.html",
    styleUrls: ["./addstation.component.scss"],
})
export class AddstationComponent implements OnInit {
    stationForm: FormGroup;
    stationLinks: FormArray;
    submitted = false;

    station: Station[] = [];
    id: number;

    line: Line[] = [];
    lineList: any;
    public lineData: Object;
    lineId: number;

    successmsg;
    errormsg;
    text: any;
    isSaving = false;
    isJunction:boolean=false;
    stationList: Object;
    stationListArr: any[]=[];

    constructor(
        private stationservice: StationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private lineservice: LinesService
    ) {}

    ngOnInit() {
        this.stationForm = this.formBuilder.group({
            // lineId: [
            //     "",
            //     RxwebValidators.required({
            //         message: "This field is required!",
            //     }),
            // ],
            stationName: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.pattern({
                        expression: {
                            // alpha: /^(?:[0-9]+[a-z_-]|[a-z-_]+[0-9])[a-z0-9]*$/i,
                            alpha: /^[a-zA-Z][a-zA-Z0-9\s]*$/,
                        },
                        message:
                            "This accept combination of numbers and alphabets.",
                    }),
                    RxwebValidators.minLength({
                        value:3,
                        message: "Minimum length should be 3!",
                    }),
                ],
            ],
            // stationCode: [
            //     "",
            //     [
            //         RxwebValidators.required({
            //             message: "This field is required!",
            //         }),
            //         RxwebValidators.alphaNumeric({
            //             message: "This accept only alphabet!",
            //             allowWhiteSpace: true,
            //         }),
            //     ],
            // ],
            stationCode: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.pattern({
                        expression: {
                            alpha: /^[a-zA-Z][a-zA-Z0-9\s]*$/,
                        },
                        message:
                            "This accept combination of numbers and alphabets.",
                    }),
                    RxwebValidators.minLength({
                        value:3,
                        message: "Minimum length should be 3!",
                    }),
                ],
            ],
            contactNum: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.pattern({
                        expression: { onlyDigit: /^[6-9]\d{9}$/ },
                        message: "Invalid mobile number!",
                    }),
                ],
            ],

            latitude: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.latitude({
                        message : "Invalid Latitude"
                    })
                ],
            ],

            longitude: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
                    RxwebValidators.longitude({
                        message: "Invalid Longitude"
                    })
                ],
            ],
            address: [
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),

                ],
            ],
            junction: [
                "no",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),

                ],
            ],
            stationLinks:this.formBuilder.array([this.createStationLinks()])

        });

        this.lineservice.getLines().subscribe((res) => {
            //console.log(res["data"]);
            this.lineList = res["data"];
        });

        this.stationservice.getStation().subscribe((res) => {
            this.station = res["data"];//not in use
            //station when page load
            this.stationList = res["data"];
            console.log(this.stationList, "Station List");
        });
    }

    get stationLinksForms() {
        return this.stationForm.get('stationLinks') as FormArray
    }

    createStationLinks(): FormGroup {
        return this.formBuilder.group({
            lineCode: [
                "",
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
            ],
            prevStationCode: '',
            nextStationCode: ''
        });
    }

    addStationLinks() {
        //this.stationLinks = this.stationForm.get('stationLinks') as FormArray;
        //this.stationLinks.push(this.createStationLinks());
        const control = <FormArray>this.stationForm.controls['stationLinks'];
        const stationlinks = this.formBuilder.group({
            lineCode: [
                "",
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),
            ],
            prevStationCode: '',
            nextStationCode: ''
        });

        control.push(stationlinks)

    }

    removeStationLinks(i:number) {
        this.stationLinksForms.removeAt(i);
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.stationLinksForms.controls;
    }


    get fval() {
        return this.stationForm.controls;
    }


    onJnStChange(e){
        if(e.target.value==='yes'){
            this.isJunction=true;
        }else if(e.target.value === 'no'){
            this.isJunction=false;
            // this.stationLinks.clear();
            // this.stationLinks.push(this.createStationLinks());
            const valueToKeep = this.stationLinksForms.at(1);
            this.stationLinksForms.clear();
            this.stationLinksForms.push(valueToKeep);


        }
    }

    //get station list by line code
    getStationList(linecode,i){
        console.log(linecode);
        console.log(linecode);
        this.stationservice.getStationByLineCode(linecode).subscribe(
            (res)=>{
                this.stationListArr[i]= res['data'];
                console.log(this.stationListArr);
            }
        )
    }



    onFormSubmit() {

        console.log("controls");
        console.log(this.stationForm.value);

        this.submitted = true;
        this.isSaving = true;

        if (this.stationForm.invalid)
            return Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Please fill all fields!",
            });

        this.stationservice.postAddstation(this.stationForm.value).subscribe(
            (data) => {
                if (data["status"] === "1") {
                    this.successmsg = data;
                    this.toastr.success("", this.successmsg.data);
                    this.router.navigate(["admin/stationlist"]);
                    this.stationForm.reset();
                    this.submitted = false;
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: data["data"],
                    });
                }
            },
            (error) => {
                this.errormsg = error;
                Swal.fire({
                    title: "Error!",
                    text: this.errormsg,
                });
            }
        );

        // this.toastr.success("", "testing");
    }


}
