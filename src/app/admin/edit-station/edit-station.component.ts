import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { Station } from "../_models/station.model";
import { StationService } from "../_services/station.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { Line } from "../_models/lines.model";
import { LinesService } from "../_services/lines.service";

@Component({
    selector: "app-edit-station",
    templateUrl: "./edit-station.component.html",
    styleUrls: ["./edit-station.component.scss"],
})
export class EditStationComponent implements OnInit {
    station: Station[] = [];
    editstationForm: FormGroup;
    stationLinks: FormArray;
    submitted = false;
    isDisabled: boolean = true;

    line: Line[] = [];
    lineList: any;

    stationId: number;

    successmsg;
    errormsg;
    isJunction: boolean=false;
    stationList: Object;
    stationListArr: any[]=[];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activeRouter: ActivatedRoute,
        private toastr: ToastrService,
        private stationService: StationService,
        private lineService: LinesService
    ) {}

    ngOnInit() {
        this.editstationForm = this.formBuilder.group({
            id: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],

            stationCode: [
                "",
                RxwebValidators.required({
                    message: "This field is required!",
                }),
            ],
            stationName: [
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
                    }),
                    
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
                "",
                [
                    RxwebValidators.required({
                        message: "This field is required!",
                    }),

                ],
            ],
            stationLinks:this.formBuilder.array([this.createStationLinks()])
        });


        // this.stationService.getStation().subscribe((res) => {
        //     this.station = res["data"];//not in use
        //     //station when page load
        //     this.stationList = res["data"];
        //     console.log(this.stationList, "Station List");
        // });
        this.stationService.getStation().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.stationList = res.data;
                console.log(this.stationList, "Station List");
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })

        // this.lineService.getLines().subscribe((res) => {
        //     //this.line = res["data"];
        //     this.lineList = res["data"];
        //     console.log(this.lineList, "Line List");
        // });
        this.lineService.getLines().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.lineList = res.data;
                console.log(this.lineList, "Line List");
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })

        this.activeRouter.paramMap.subscribe((params) => {
            this.stationId = +params.get("id");
            console.log(this.stationId);
            if (this.stationId) {
                this.getDetail(this.stationId);
            }
        });
    }

    get stationLinksForms() {
        return this.editstationForm.get('stationLinks') as FormArray
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
        //this.stationLinks = this.editstationForm.get('stationLinks') as FormArray;
        //this.stationLinks.push(this.createStationLinks());
        const control = <FormArray>this.editstationForm.controls['stationLinks'];
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
        //console.log(this.stationLinksForms.length,"length");
        if(this.stationLinksForms.length>1){
            this.stationLinksForms.removeAt(i);
            this.stationListArr.splice(i,1);
        }else{
            return Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Kindly Update, You cannot delete all line links!",
            });
        }
        
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.stationLinksForms.controls;
    }

    get fval() {
        return this.editstationForm.controls;
    }

    onJnStChange(e){
        if(e.target.value==='yes'){
            this.isJunction=true;
        }else if(e.target.value === 'no'){
            this.isJunction=false;
            // this.stationLinks.clear();
            // this.stationLinks.push(this.createStationLinks());

            //we cannot remove station link at event on change user will remove link using remove button
            /*const valueToKeep = this.stationLinksForms.at(0);
            this.stationLinksForms.clear();
            this.stationLinksForms.push(valueToKeep);*/

            

        }
    }

    //get station list by line code
    getStationList(linecode,i){
        console.log(linecode);
        const current_controls= this.f;
        //console.log(current_controls[i]);
        current_controls[i].get('prevStationCode').reset();
        current_controls[i].get('nextStationCode').reset();
        // this.stationService.getStationByLineCode(linecode).subscribe(
        //     (res)=>{
        //         this.stationListArr[i]= res['data'];
        //         console.log(this.stationListArr,"line's station");
        //     }
        // )
        this.stationService.getStationByLineCode(linecode).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.stationListArr[i] = res.data;
                console.log(this.stationListArr,"line's station");
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }

    getDetail(id: number) {
        // this.stationService.getStationById(id).subscribe((station: Station) => {
        //     this.getStationList(station['data'].stationLinks[0].lineCode,0)
        //     for (var _i = 1; _i < station['data'].stationLinks.length; _i++) {
        //         this.addStationLinks();
        //         //call line's station
        //         this.getStationList(station['data'].stationLinks[_i].lineCode,_i);
        //     }

        //     this.updateStation(station["data"]);
        //     console.log(station['data'].stationLinks, "station link");
            
        // });
        this.stationService.getStationById(id).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.getStationList(res.data.stationLinks[0].lineCode,0);
                for (var _i = 1; _i < res.data.stationLinks.length; _i++) {
                    this.addStationLinks();
                    //call line's station
                    this.getStationList(res.data.stationLinks[_i].lineCode,_i);
                }
                this.updateStation(res.data);
                console.log(res.data.stationLinks, "station link");
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }

    updateStation(station: Station) {

        this.isJunction=(station.junction===1)?true:false,

        this.editstationForm.patchValue({
            id: station.id,
            stationCode: station.stationCode,
            stationName: station.stationName,
            latitude:station.latitude,
            longitude:station.longitude,
            contactNum:station.contactNum,
            junction:(station.junction===1)?'yes':'no',
            address:station.address,
            stationLinks:station.stationLinks

        });
    }

    onFormSubmit() {
        this.submitted = true;

        if (this.editstationForm.invalid)
            return Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Please fill all fields!",
            });

        console.log(this.editstationForm.value);
        
        // this.stationService
        //     .putStation(this.stationId, this.editstationForm.value)
        //     .subscribe(
        //         (res) => {
        //             console.log(res);
        //             if (res["status"] === "1") {
        //                 this.successmsg = res;
        //                 this.toastr.success("", this.successmsg.data);
        //                 this.router.navigate(["/admin/stationlist"]);
        //                 this.editstationForm.reset();
        //                 this.submitted = false;
        //             } else {
        //                 Swal.fire({
        //                     title: "Error!",
        //                     text: res["data"],
        //                 });
        //             }
        //         },
        //         (error) => {
        //             Swal.fire({
        //                 title: "Error!",
        //                 text: error.data,
        //             });

        //         }
        // );
        this.stationService.putStation(this.stationId, this.editstationForm.value).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.successmsg = res.data;
                this.toastr.success("", this.successmsg.data);
                this.router.navigate(["/admin/stationlist"]);
                this.editstationForm.reset();
                this.submitted = false;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }
}
