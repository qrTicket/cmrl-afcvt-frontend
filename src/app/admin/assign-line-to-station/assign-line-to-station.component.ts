import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { StationService } from "../_services/station.service";
import { LinesService } from "../_services/lines.service";
import { LineToStationService } from '../_services/linetostation.service';

@Component({
  selector: 'app-assign-line-to-station',
  templateUrl: './assign-line-to-station.component.html',
  styleUrls: ['./assign-line-to-station.component.scss']
})
export class AssignLineToStationComponent implements OnInit {

  assignlinetostationForm: UntypedFormGroup;
  submitted = false;

  line: any = [];
  public lineData: Object;
  lineName: string;

  station: any = [];
  public stationData: Object;
  stationName: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private stationapi: StationService,
    private lineapi: LinesService,
    private linetostationapi: LineToStationService,
  ) { }

  ngOnInit() {
    
    this.assignlinetostationForm = this.formBuilder.group({
      line: ["", Validators.required],
      station: ["", Validators.required],
    });

    this.lineapi.getLines().subscribe((data) => {
      this.line = data;
      console.log(this.line);
    });

    this.stationapi.getStation().subscribe(data => {
      this.station = data;
      console.log(this.station);
    });

  }

  get fval() {
    return this.assignlinetostationForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.assignlinetostationForm.invalid)
      return this.toastr.error("Unable to submit form, please check all the details!", "Error");

    this.linetostationapi
      .postAssignLineToStation(this.assignlinetostationForm.value)
      .subscribe((res) => {
      })
    this.toastr.success('Line Assigned To Station Successfully.');
    this.assignlinetostationForm.reset();
    this.submitted = false;
    // this.router.navigate(['admin/extend-line-list']);
  }

}
