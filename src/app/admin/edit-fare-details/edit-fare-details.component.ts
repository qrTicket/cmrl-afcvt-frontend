import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Fare } from "../_models/fare.model";
import { FareService } from '../_services/fare.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-edit-fare-details',
  templateUrl: './edit-fare-details.component.html',
  styleUrls: ['./edit-fare-details.component.scss']
})
export class EditFareDetailsComponent implements OnInit {

  fare: Fare;
  editfaredetailsForm: UntypedFormGroup;
  submitted = false;
  
  successmsg:any;
  errormsg:any;

  spinners = false;
  FareId: number;

  constructor(
    private fareService: FareService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.editfaredetailsForm = this.formBuilder.group({
      minimumBalance: ["", RxwebValidators.required({ message: "Required!", }),],
      timeLimit: ["", RxwebValidators.required({ message: "Required!", }),],
      penaltyDecision: ["", RxwebValidators.required({ message: "Required!", }),]
    });

    this.fareService.getFareList().subscribe((res) => {
      this.fare = res["data"];
    });

    this.activeRouter.paramMap.subscribe((params) => {
      this.FareId = +params.get("id");
      if (this.FareId) {
        this.getFare(this.FareId);
      }
    });
  }

  get fval() {
    return this.editfaredetailsForm.controls;
  }

  getFare(id: number) {
    this.fareService.getFareById(id)
      .subscribe(
        (fare: Fare) => {
          this.updateDetails(fare["data"]);
        })
  }

  updateDetails(fare: Fare) {
    this.editfaredetailsForm.patchValue({
      id: fare.id,
      minimumBalance: fare.minimumBalance,
      timeLimit: fare.timeLimit,
      penaltyDecision: fare.penaltyDecision
    });
  }

  onFormSubmit() {
    this.submitted = true;
    // if (this.editfaredetailsForm.invalid)
    //   return 
    //   this.toastr.error("Unable to update form: please check all the details", "Error");
    console.log(this.editfaredetailsForm.value);
    this.fareService
      .updateFareDetails(this.FareId, this.editfaredetailsForm.value)
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.successmsg = data;
          this.toastr.success("", this.successmsg.data);
          this.router.navigate(['/admin/fare-list']);
        },
        (error) => {
          this.errormsg = error;
          this.toastr.error("", this.errormsg.data);
        }
      );

    this.editfaredetailsForm.reset();
    this.submitted = false;
  }
}
