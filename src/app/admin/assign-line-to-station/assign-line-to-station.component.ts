import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  assignlinetostationForm: FormGroup;
  submitted = false;

  line: any = [];
  public lineData: Object;
  lineName: string;

  station: any = [];
  public stationData: Object;
  stationName: string;

  constructor(
    private formBuilder: FormBuilder,
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

    // this.lineapi.getLines().subscribe((data) => {
    //   this.line = data;
    //   console.log(this.line);
    // });
    this.lineapi.getLines().subscribe({
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

    // this.stationapi.getStation().subscribe(data => {
    //   this.station = data;
    //   console.log(this.station);
    // });
    this.stationapi.getStation().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.station = res.data;
          console.log(this.station);
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })

  }

  get fval() {
    return this.assignlinetostationForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.assignlinetostationForm.invalid)
      return this.toastr.error("Unable to submit form, please check all the details!", "Error");

    // this.linetostationapi
    //   .postAssignLineToStation(this.assignlinetostationForm.value)
    //   .subscribe((res) => {
    //   })
    // this.toastr.success('Line Assigned To Station Successfully.');
    // this.assignlinetostationForm.reset();
    // this.submitted = false;
    // this.router.navigate(['admin/extend-line-list']);

    this.linetostationapi.postAssignLineToStation(this.assignlinetostationForm.value).subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success('Line Assigned To Station Successfully.');
          this.assignlinetostationForm.reset();
          this.submitted = false;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
