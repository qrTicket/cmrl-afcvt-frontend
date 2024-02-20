import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { StationService } from "../_services/station.service";
import { Station } from '../_models/station.model';


@Component({
  selector: 'app-send-audit',
  templateUrl: './send-audit.component.html',
  styleUrls: ['./send-audit.component.scss']
})
export class SendAuditComponent implements OnInit {
  singleForm: FormGroup;
  allForm: FormGroup;
  submitted = false;

  station: Station[] = [];
  public stationList: Object;
  public temp: Object = false;
  stationId: number;
  stationName: any;

  successmsg;
  errormsg;
  text: any;
  isSaving = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private stationservice: StationService,
  ) { }

  stationData :any = {stationName: ""};

  ngOnInit() {
 
    this.singleForm = this.formBuilder.group({
      auditFileName: [
        "",
        RxwebValidators.required({
          message: "This field is required!",
        }),
      ],
      fileTimeInterval: [
        "",
        RxwebValidators.required({
          message: "This field is required!",
        }),
      ],
      stationId: [
        "",
        RxwebValidators.required({
          message: "This field is required!",
        }),
      ],
    });

    // this.stationservice.getStation().subscribe((res) => {
    //   this.stationList = res["data"];
    // });
    this.stationservice.getStation().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.stationList = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })

    this.stationData.stationName = this.route.snapshot.paramMap.get('stationName');

   
  }

  get fval() {
    return this.singleForm.controls;
  }

  onSingleSubmit(obj) {
    this.spinner.show();
    this.submitted = true;
    if (this.singleForm.invalid)
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please fill all fields!",
      });
    // this.stationservice.auditFileTransfer(this.singleForm.value, this.stationName).subscribe(
    //   (res) => {
    //     if (res) {
    //       this.spinner.hide();
    //       return this.toastr.error();
    //     }
    //     console.log(res, "Single File Transfer");

    //     this.spinner.hide();
    //     // this.successmsg = res["data"];
    //     this.toastr.success("", this.successmsg);
    //     this.singleForm.reset();
    //     this.submitted = false;
    //     this.router.navigateByUrl("/auditList");
    //   },
    //   (error) => {
    //     this.spinner.hide();
    //     Swal.fire({
    //       title: "Error!",
    //       text: error["data"],
    //     });
    //   }
    // );
    this.stationservice.auditFileTransfer(this.singleForm.value, this.stationName).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          this.spinner.hide();
          this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.spinner.hide();
          // this.successmsg = res["data"];
          this.toastr.success("", this.successmsg);
          this.singleForm.reset();
          this.submitted = false;
          this.router.navigateByUrl("/auditList");
        }
      },
      error:(err)=>{
          this.spinner.hide();
          Swal.fire({
            title: "Error!",
            text: err.error.data,
          });
      }
    })
  }

  
}
