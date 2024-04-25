import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ZoneService } from '../_services/zone.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { LinesService } from '../_services/lines.service';

@Component({
  selector: 'app-admin-zone-add',
  templateUrl: './admin-zone-add.component.html',
  styleUrls: ['./admin-zone-add.component.scss']
})
export class AdminZoneAddComponent implements OnInit {

  addZoneForm: FormGroup;
  lineList: any[] = [];
  submitted = false;
 

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private zoneService: ZoneService,
    private lineService: LinesService,
  ) { }
  

  ngOnInit() {
    this.addZoneForm = this.formBuilder.group({
      zoneName: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
      ]],
      zoneFullName: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
      ]],
      zoneCode: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
      ]],
      lines: ['', [
        RxwebValidators.required({message:"ERROR! This field is required!"}),
      ]],
    });

    this.getAllLine();

  }


  getAllLine(){
    this.lineService.getLines().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toastr.error(res.data)
        }
        else if(res.status === "1"){
          this.lineList = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data)
      }
    })
  }

  get fval() {
    return this.addZoneForm.controls;
  }

  cancel(){
    this.router.navigate(['/admin/admin-zone-list'])
  }

  onFormSubmit() {
    if(this.addZoneForm.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "zoneName" : this.addZoneForm.value.zoneName,
      "zoneFullName" : this.addZoneForm.value.zoneFullName,
      "zoneCode" : this.addZoneForm.value.zoneCode,
      "lines" : this.addZoneForm.value.lines,
    }

    this.zoneService.saveZone(requestObject).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
          this.toastr.error(res.data)
        }
        else if(res.status === "1"){
          this.toastr.success(res.data);
          this.router.navigate(['/admin/admin-zone-list'])
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data)
        console.log(err)
      }
    })
  }

}
