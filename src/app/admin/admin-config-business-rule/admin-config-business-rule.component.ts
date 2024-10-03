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
  booleanDropDown:any = [
    {"key":true, "value":"TRUE"},
    {"key":false, "value":"FALSE"}
  ]

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
      minimumFare: ["", RxwebValidators.required({ message: "This field is required!", }),],
      timeLimitSourceStn: ["", RxwebValidators.required({ message: "This field is required!", }),],
      timeLimitDestinationStn: ["", RxwebValidators.required({ message: "This field is required!", }),],
      startTimeLimit: ["", RxwebValidators.required({ message: "This field is required!", }),],
      endTimeLimit: ["", RxwebValidators.required({ message: "This field is required!", }),],
      //penaltyDecision: ["", RxwebValidators.required({ message: "This field is required!", }),],
      //errorCodes: ["", RxwebValidators.required({ message: "This field is required!" })],
      entryMisMatch: ["", RxwebValidators.required({ message: "This field is required!" })],
      exitMisMatch: ["", RxwebValidators.required({ message: "This field is required!" })],
      insufficientAmount: ["", RxwebValidators.required({ message: "This field is required!" })],
      overStay: ["", RxwebValidators.required({ message: "This field is required!" })],
    });

    // this.fareService.getFareList().subscribe((res) => {
    //   this.fare = res["data"];
    // });
    this.getBusinessRule();
  }

  get fval() {
    return this.configBusinessRuleForm.controls;
  }


  //fetch bussiness rule
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

  //patch date in form
  updateDetails(details: any) {
    console.log(details,'det..');
    
    this.configBusinessRuleForm.patchValue({
      minimumBalance: details && details.minimumBalance?details.minimumBalance:'',
      minimumFare: details && details.minimumFare?details.minimumFare:0,
      timeLimitSourceStn: details && details.timeLimitSourceStn?details.timeLimitSourceStn:'',
      timeLimitDestinationStn: details && details.timeLimitDestinationStn?details.timeLimitDestinationStn:'',
      startTimeLimit: details && details.startTimeLimit?details.startTimeLimit:'',
      endTimeLimit: details && details.endTimeLimit ? details.endTimeLimit : '',
      //penaltyDecision: details && details.penaltyDecision ? true : false,
      //errorCodes: details && details.errorCodeEnable ? true : false,
      entryMisMatch: details && details.writeErEntrySkip03 ? true : false ,
      exitMisMatch: details && details.writeErExitSkip04 ? true : false,
      insufficientAmount: details && details.writeErAmntInsuff01 ? true : false ,
      overStay: details && details.writeErTimeExceed06 ?  true : false
    
    });

    /*if(!details.errorCodeEnable){
      this.onErrCodeChange(details.errorCodeEnable);
    }*/
  }

  // on error code change fields will be disabled
  onErrCodeChange(booleanVal:any){
    if(!booleanVal){
      this.configBusinessRuleForm.get('entryMisMatch').disable();
      this.configBusinessRuleForm.get('exitMisMatch').disable();
      this.configBusinessRuleForm.get('insufficientAmount').disable();
      this.configBusinessRuleForm.get('overStay').disable();
    }
    else{
      this.configBusinessRuleForm.get('entryMisMatch').enable();
      this.configBusinessRuleForm.get('exitMisMatch').enable();
      this.configBusinessRuleForm.get('insufficientAmount').enable();
      this.configBusinessRuleForm.get('overStay').enable();
    }
    
  }

  //update business rule
  onFormSubmit() {
    this.submitted = true;
    if (this.configBusinessRuleForm.invalid)
      return false;

    console.log(this.configBusinessRuleForm.value);

    let reqObj = {
      
        "minimumBalance" : this.configBusinessRuleForm.value.minimumBalance,
        "minimumFare" : this.configBusinessRuleForm.value.minimumFare,
        "timeLimitSourceStn" : this.configBusinessRuleForm.value.timeLimitSourceStn,
        "timeLimitDestinationStn" : this.configBusinessRuleForm.value.timeLimitDestinationStn,
        "startTimeLimit" : this.configBusinessRuleForm.value.startTimeLimit,
        "endTimeLimit" : this.configBusinessRuleForm.value.endTimeLimit,
        //"penaltyDecision" : this.configBusinessRuleForm.value.penaltyDecision,
        //"errorCodeEnable" : this.configBusinessRuleForm.value.errorCodes,
        "writeErEntrySkip03" : this.configBusinessRuleForm.value.entryMisMatch,
        "writeErExitSkip04" : this.configBusinessRuleForm.value.exitMisMatch,
        "writeErAmntInsuff01" : this.configBusinessRuleForm.value.insufficientAmount,
        "writeErTimeExceed06" : this.configBusinessRuleForm.value.overStay
    
    }

    this.fareService.updateFareRule(reqObj).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          //alert(res.data)
            this.toastr.error(res.data)
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
        //alert(err)
          this.toastr.error(err.error.data)
      }
    })
  }

}
