import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MultiDashboardService } from '../_services/multi-dashboard.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-multi-dashboard',
  templateUrl: './multi-dashboard.component.html',
  styleUrls: ['./multi-dashboard.component.scss']
})
export class MultiDashboardComponent implements OnInit {
  dashboardForm: UntypedFormGroup;
  submitted = false;

  successmsg;
  errormsg;

  constructor(
    private multidashboardservice: MultiDashboardService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.dashboardForm = this.formBuilder.group({
      name: ["",
        RxwebValidators.required({
          message: "This field is required!",
        }),
      ],
    });
  }
  
  get fval() {
    return this.dashboardForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.dashboardForm.invalid)
      return this.toastr.error("Unable to submit form: please check all the details", "Error");
    console.log(this.dashboardForm.value);
    this.multidashboardservice.addDashboard(this.dashboardForm.value)
      .subscribe(res => {
        // console.log(res);
        this.successmsg = res;
        this.toastr.success("Dashboard added successfullly.", this.successmsg);
      },
        (error) => {
          console.log(error);
          this.errormsg = error;
          this.toastr.error("", this.errormsg);
        }
      );
    this.dashboardForm.reset();
    this.submitted = false;
  }

}
