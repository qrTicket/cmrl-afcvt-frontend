import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Fare } from '../_models/fare.model';
import { FareService } from '../_services/fare.service';
import { Businessrule } from '../_models/businessrule.model';

@Component({
  selector: 'app-admin-config-business-rule',
  templateUrl: './admin-config-business-rule.component.html',
  styleUrls: ['./admin-config-business-rule.component.scss']
})
export class AdminConfigBusinessRuleComponent implements OnInit {

  configBusinessRuleForm: FormGroup;
  submitted = false;
  
  successmsg:any;
  errormsg:any;
  spinners = false;

  businessRule:Businessrule;
 

  constructor(
    private fareService: FareService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.configBusinessRuleForm = this.formBuilder.group({
      minimumBalance: ["", RxwebValidators.required({ message: "This field is required!", }),],
      timeLimitSourceStn: ["", RxwebValidators.required({ message: "This field is required!", }),],
      timeLimitDestinationStn: ["", RxwebValidators.required({ message: "This field is required!", }),],
      startTimeLimit: ["", RxwebValidators.required({ message: "This field is required!", }),],
      endTimeLimit: ["", RxwebValidators.required({ message: "This field is required!", }),],
      penaltyDecision: ["", RxwebValidators.required({ message: "This field is required!", }),],
    });

    // this.fareService.getFareList().subscribe((res) => {
    //   this.fare = res["data"];
    // });
    this.getBusinessRule();
  }

  get fval() {
    return this.configBusinessRuleForm.controls;
  }

  getBusinessRule(){
    this.fareService.getBusinessRule().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.businessRule = res.data;
          this.updateDetails(this.businessRule);
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data)
      }
    })
  }

  updateDetails(details: Businessrule) {
    this.configBusinessRuleForm.patchValue({
      minimumBalance: details.minimumBalance?details.minimumBalance:'',
      timeLimitSourceStn: details.timeLimitSourceStn?details.timeLimitSourceStn:'',
      timeLimitDestinationStn: details.timeLimitDestinationStn?details.timeLimitDestinationStn:'',
      startTimeLimit: details.startTimeLimit?details.startTimeLimit:'',
      endTimeLimit: details.endTimeLimit?details.endTimeLimit:'',
      penaltyDecision: details.penaltyDecision?details.penaltyDecision:''
    
    });
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.configBusinessRuleForm.invalid)
      return false;

    console.log(this.configBusinessRuleForm.value);
   

    this.fareService.updateFareDetails1(this.configBusinessRuleForm.value).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.spinner.hide();
          this.successmsg = res.data;
          this.toastr.success("", this.successmsg);
          //this.configBusinessRuleForm.reset();
          this.submitted = false;
          //this.router.navigate(['/admin/fare-list']);
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data)
      }
    })
  }

}
