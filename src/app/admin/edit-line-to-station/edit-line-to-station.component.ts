import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { Station } from "../_models/station.model";
import { StationService } from "../_services/station.service";
import { Line } from "../_models/lines.model";
import { LinesService } from "../_services/lines.service";
import { LineToStation } from '../_models/linetostation.model';
import { LineToStationService } from '../_services/linetostation.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-edit-line-to-station',
  templateUrl: './edit-line-to-station.component.html',
  styleUrls: ['./edit-line-to-station.component.scss']
})
export class EditLineToStationComponent implements OnInit {

  editlinetostationForm: UntypedFormGroup;
  submitted = false;

  station: Station[] = [];
  line: Line[] = [];
  linetostation: LineToStation[] = [];

  successmsg;
  errormsg;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toastr: ToastrService,
    private stationService: StationService,
    private lineService: LinesService,
    private linetostationService: LineToStationService
  ) { }

  ngOnInit() {
    this.editlinetostationForm = this.formBuilder.group({
      id: ["", RxwebValidators.required({ message: "Required!", }),],
      lineName: ["", RxwebValidators.required({ message: "Required!", }),],
      stationName: ["", RxwebValidators.required({ message: "Required!", }),],
      createdDate: ["", RxwebValidators.required({ message: "Required!", }),]
    });

    this.lineService.getLines().subscribe((data) => {
      this.line = data;
      console.log(this.line, "Line List");
    });

    this.stationService.getStation().subscribe((data) => {
      this.station = data;
      console.log(this.station, "Station List");
    });

    this.activeRouter.paramMap.subscribe((params) => {
      const id = +params.get("id");
      if (id) {
        this.getDetail(id);
      }
    });

  }

  get fval() {
    return this.editlinetostationForm.controls;
  }

  getDetail(id: number) {
    this.linetostationService.getAssignedLineToStationById(id)
      .subscribe(
        (linetostation: LineToStation) => this.updateLineToStation(linetostation),
        (error: any) => console.log(error)
      );
  }

  updateLineToStation(linetostation: LineToStation) {
    this.editlinetostationForm.setValue({
      id: linetostation.id,
      line: linetostation.line.lineName,
      stationName: linetostation.station,
      createdDate: linetostation.createdDate,
    });

  }

  onFormSubmit() {
    this.submitted = true;
    if (this.editlinetostationForm.invalid)
      return this.toastr.error("Unable to update form: please check all the details", "Error");
    console.log(this.editlinetostationForm.value);
    this.linetostationService.putLineToStation(this.editlinetostationForm.value.id,
      this.editlinetostationForm.value)
      .subscribe((res) => {
        this.successmsg = res;
        this.toastr.success("", this.successmsg.message);

      },
        (error) => {
          console.log(error);
          this.errormsg = error;
          this.toastr.error("", this.errormsg);
        }
      );

    this.editlinetostationForm.reset();
    this.submitted = false;
    this.router.navigate(['admin/stationlist']);
  }


}
