import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { LinesService } from '../_services/lines.service';
import { ZoneService } from '../_services/zone.service';

@Component({
  selector: 'app-admin-zone-edit',
  templateUrl: './admin-zone-edit.component.html',
  styleUrls: ['./admin-zone-edit.component.scss']
})
export class AdminZoneEditComponent implements OnInit {

  updateZoneForm: FormGroup;
  lineList: any[] = [];
  submitted = false;
  zone_id:number;
 

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private zoneService: ZoneService,
    private lineService: LinesService,
    private activatedRoute:ActivatedRoute
  ) { }
  

  ngOnInit() {

    this.activatedRoute.params.subscribe((dataInUrl:any)=>{
      this.zone_id = dataInUrl['id'];
    })

    this.updateZoneForm = this.formBuilder.group({
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

    this.getZoneById(this.zone_id);

  }

  getZoneById(id:number){
    this.zoneService.getZoneById(id).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data)
        }
        else if(res.status === "1"){
          this.patchData(res.data);
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data)
      }
    })
  }

  patchData(detail:any){
    this.updateZoneForm.patchValue({
      zoneName : detail.zoneName ? detail.zoneName : "",
      zoneFullName : detail.zoneFullName ? detail.zoneFullName : "",
      zoneCode : detail.zoneCode ? detail.zoneCode : "",
      lines : detail.lineId ? detail.lineId : "",
      
    })
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
    return this.updateZoneForm.controls;
  }

  cancel(){
    this.router.navigate(['/admin/admin-zone-list'])
  }

  onFormSubmit() {
    if(this.updateZoneForm.invalid){
      this.submitted = true;
      return false;
    }
    
    let requestObject = {
      "zoneName" : this.updateZoneForm.value.zoneName,
      "zoneFullName" : this.updateZoneForm.value.zoneFullName,
      "zoneCode" : this.updateZoneForm.value.zoneCode,
      "lines" : this.updateZoneForm.value.lines,
    }

    this.zoneService.updateZone(requestObject,this.zone_id).subscribe({
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
