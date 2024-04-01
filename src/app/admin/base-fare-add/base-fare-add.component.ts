import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFareService } from '../_services/base-fare.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-base-fare-add',
  templateUrl: './base-fare-add.component.html',
  styleUrls: ['./base-fare-add.component.scss']
})
export class BaseFareAddComponent implements OnInit {
  baseFareFg: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private baseFareSrv: BaseFareService,
  ) { }
  

   ngOnInit() {
    this.baseFareFg = this.formBuilder.group({
      baseFare: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.numeric({message:"ERROR! This digits are allowed!", allowDecimal:true}),
      ]],
      minDistance: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.numeric({message:"ERROR! This digits are allowed!", allowDecimal:true})
      ]],
      maxDistance: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
        RxwebValidators.numeric({message:"ERROR! This digits are allowed!" , allowDecimal:true})
      ]],
    }
    );

  }
  get fval() {
    return this.baseFareFg.controls;
  }

  cancel(){
    this.router.navigate(['/admin/admindashboard'])
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

    this.baseFareSrv.addBaseFare(requestObject).subscribe({
      next:(res:any)=>{
        console.log('in resp...')
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
        console.log(err)
        // if(err.error.status === "0"){
        //   this.toastr.error(err.error.data,'Error!')
        // }
        //this.toastr.error(err,'Error!')
      }
    })
  }

}
