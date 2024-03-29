import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ZoneService } from '../_services/zone.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  zoneForm: FormGroup;
  submitted = false;

  successmsg;
  errormsg;

  constructor(
    private zoneservice: ZoneService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.zoneForm = this.formBuilder.group({
      name: ["",
        RxwebValidators.required({
          message: "This field is required!",
        }),
      ],
    });
  }
  
  get fval() {
    return this.zoneForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.zoneForm.invalid)
      return this.toastr.error("Unable to submit form: please check all the details", "Error");
    console.log(this.zoneForm.value);
    // this.zoneservice.addZone(this.zoneForm.value)
    //   .subscribe(res => {
    //     // console.log(res);
    //     this.successmsg = res;
    //     this.toastr.success("Zone added successfullly.", this.successmsg);
    //   },
    //     (error) => {
    //       console.log(error);
    //       this.errormsg = error;
    //       this.toastr.error("", this.errormsg);
    //     }
    //   );
    // // this.toastr.success('Line Added Successfully.');
    // this.zoneForm.reset();
    // this.submitted = false;
    // this.router.navigate(['admin/linelist']);

    this.zoneservice.addZone(this.zoneForm.value).subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.successmsg = res;
          this.toastr.success("Zone added successfullly.", this.successmsg);
          this.zoneForm.reset();
          this.submitted = false;
        }
      },
      error:(err)=>{
        console.log(err.error.data);
        this.errormsg = err.error.data;
        this.toastr.error("", this.errormsg);
      }
    })
  }

}
