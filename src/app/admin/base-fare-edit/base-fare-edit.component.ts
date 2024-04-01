import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFareService } from '../_services/base-fare.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BaseFare } from '../_models/BaseFare';

@Component({
  selector: 'app-base-fare-edit',
  templateUrl: './base-fare-edit.component.html',
  styleUrls: ['./base-fare-edit.component.scss']
})
export class BaseFareEditComponent implements OnInit {
  baseFareFg: FormGroup;
  submitted = false;
  baseFareId:number;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private baseFareSrv: BaseFareService,
    private activatedRoute:ActivatedRoute
  ) { }
  

   ngOnInit() {
    this.activatedRoute.params.subscribe((dataInUrl:any)=>{
      this.baseFareId = dataInUrl['id'];
    })

    this.baseFareFg = this.formBuilder.group({
      baseFare: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.numeric({message:"ERROR! This digits are allowed!", allowDecimal:true})
      ]],
      minDistance: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.numeric({message:"ERROR! This digits are allowed!", allowDecimal:true})
      ]],
      maxDistance: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.numeric({message:"ERROR! This digits are allowed!", allowDecimal:true})
      ]],
    }
    );
    this.getBaseFareDataById(this.baseFareId)
  }

  getBaseFareDataById(id:number){
    this.baseFareSrv.getBaseFareById(id).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.patchData(res.data);
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  patchData(respData:BaseFare){
    this.baseFareFg.patchValue({
      baseFare : respData.baseFare ? respData.baseFare : "",
      minDistance : respData.minDistance ? respData.minDistance : "",
      maxDistance : respData.maxDistance ? respData.maxDistance : "",
    })
  }

  get fval() {
    return this.baseFareFg.controls;
  }

  cancel(){
    this.router.navigate(['/admin/base-fare-list'])
  }

   onFormSubmit() {
    if(this.baseFareFg.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "baseFare" : this.baseFareFg.value.baseFare,
      "minDistance" : this.baseFareFg.value.minDistance,
      "maxDistance" : this.baseFareFg.value.maxDistance,
    }

    this.baseFareSrv.updateBaseFareById(requestObject,this.baseFareId).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toastr.success(res.data,"Success");
          this.router.navigate(['/admin/base-fare-list'])
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'Error!')
      }
    })
  }

}
