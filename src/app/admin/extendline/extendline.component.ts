

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { StationService } from "../_services/station.service";
import { LinesService } from "../_services/lines.service";
import { ExtendlineService } from "../_services/extendline.service";

@Component({
  selector: 'app-extendline',
  templateUrl: './extendline.component.html',
  styleUrls: ['./extendline.component.scss']
})
export class ExtendlineComponent implements OnInit {

  extendlineForm: FormGroup;
  submitted = false;

  line: any = [];
  id: number;
  public lineData: Object;
  lineName: string;

  station: any = [];
  public stationData: Object;
  stationName: string;

  source: string;
  destination: string;

  finaldata;

  constructor(
    private extendlineService: ExtendlineService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private lineService: LinesService,
    private stationService: StationService
  ) { }

  ngOnInit() {
    this.extendlineForm = this.formBuilder.group({
      line: ["", Validators.required],
      source: ["", Validators.required],
      destination: ["", Validators.required]
    });
    // this.lineService.getLines().subscribe((data) => {
    //   this.line = data;
    //   console.log(this.line);
    // });
    this.lineService.getLines().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.line = res.data;
          console.log(this.line);
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })

    // this.stationService.getStation().subscribe(data => {
    //   this.station = data;
    //   console.log(this.station);
    // });
    this.stationService.getStation().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.station = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })

  }

  get fval() {
    return this.extendlineForm.controls;
  }
  
  onFormSubmit() {
    this.submitted = true;
    if (this.extendlineForm.invalid)
      return this.toastr.error("Unable to submit form, please check all the details!", "Error");

    // this.extendlineService
    //   .postExtendline(this.extendlineForm.value)
    //   .subscribe((res) => {
    //   })
    // this.toastr.success('Line Extended Successfully.');
    // this.extendlineForm.reset();
    // this.submitted = false;

    this.extendlineService.postExtendline(this.extendlineForm.value).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success('Line Extended Successfully.');
          this.extendlineForm.reset();
          this.submitted = false;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }
}

