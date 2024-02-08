

import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
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

  extendlineForm: UntypedFormGroup;
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
    private formBuilder: UntypedFormBuilder,
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
    this.lineService.getLines().subscribe((data) => {
      this.line = data;
      console.log(this.line);
    });

    this.stationService.getStation().subscribe(data => {
      this.station = data;
      console.log(this.station);
    });

  }

  get fval() {
    return this.extendlineForm.controls;
  }
  
  onFormSubmit() {
    this.submitted = true;
    if (this.extendlineForm.invalid)
      return this.toastr.error("Unable to submit form, please check all the details!", "Error");

    this.extendlineService
      .postExtendline(this.extendlineForm.value)
      .subscribe((res) => {
      })
    this.toastr.success('Line Extended Successfully.');
    this.extendlineForm.reset();
    this.submitted = false;
  }
}

