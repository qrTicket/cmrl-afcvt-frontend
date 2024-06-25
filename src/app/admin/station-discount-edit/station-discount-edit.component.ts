import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StationService } from '../_services/station.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdmindashboardService } from '../_services/admindashboard.service';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-station-discount-edit',
  templateUrl: './station-discount-edit.component.html',
  styleUrls: ['./station-discount-edit.component.scss']
})
export class StationDiscountEditComponent implements OnInit {
  stationDiscountForm: FormGroup;
  submitted = false;
  stationList: any[] = [];
  id:number;
  successmsg:any;
  errormsg:any;
  stationDiscountData:any;
  
  constructor(
      private stationService: StationService,
      private formBuilder: FormBuilder,
      private router: Router,
      private toastr: ToastrService,
      private adminSrv:AdmindashboardService,
      private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((data:any)=>{
      this.id = data['id'];
    })

    this.stationDiscountForm = this.formBuilder.group({
        stationName: ["", [RxwebValidators.required({message: "ERROR! This field is required!"})]],
        stationDiscount: ["",[
          RxwebValidators.required({message: "This field is required!"}),
          RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber, allowDecimal:true, message:'ERROR! Only numbers and decimal are allowed!'})
        ]]
    });
      
    this.getStationList();  
    this.getdataById();
  }

  getStationList(){
    this.adminSrv.getStationList().subscribe({
      next:(resp:any)=>{
        if(resp["status"] === "1"){
          this.stationList = resp.data;
          console.log(this.stationList);
          
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'ERROR')
      }
    })
  }

  getdataById(){
    this.stationService.getStationDiscountDataById(this.id).subscribe({
      next:(resp:any)=>{
        if(resp["status"] === "1"){
          this.patchData(resp.data);
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'ERROR')
      }
    })
  }

  patchData(data:any){
    this.stationDiscountForm.patchValue({
      stationName : data && data.stationCode ? data.stationCode : '' ,
      stationDiscount : data && data.discount ? data.discount : '' 
    })
  }

  get fval() {
      return this.stationDiscountForm.controls;
  }

  onFormSubmit() {
      this.submitted = true;
      if (this.stationDiscountForm.invalid)
          return Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Please fill all fields!",
          });
      
      let reqObj = {
          "stationCode" : this.stationDiscountForm.value.stationName,
          "discount" : this.stationDiscountForm.value.stationDiscount
      }

      console.log(reqObj,' reqobj');
      
      this.stationService.editStationDiscount(reqObj).subscribe({
          next:(res)=>{
            if(res.status === "0"){
              this.toastr.error(res.data)
            }
            else if(res.status === "1"){
              this.successmsg = res.data;
              this.toastr.success(res.data);
              this.stationDiscountForm.reset();
              this.submitted = false;
              this.router.navigate(["admin/station-discount-list"]);
            }
          },
          error:(err)=>{
              this.errormsg = err.error.data;
              this.toastr.error(err.error.data)
          }
        })
  }

}
