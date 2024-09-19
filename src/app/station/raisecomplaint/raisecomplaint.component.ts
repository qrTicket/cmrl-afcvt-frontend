import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComplaintService } from '../_services/complaint.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-raisecomplaint',
  templateUrl: './raisecomplaint.component.html',
  styleUrls: ['./raisecomplaint.component.scss'],
})
export class RaisecomplaintComponent implements OnInit {
  complaintForm: FormGroup;
  submitted = false;
  successmsg;
  message;
  deviceid:any;


  constructor(
    private complaintService: ComplaintService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const Iid = params.get("device_id");
      this.deviceid = Iid;
      console.log(this.deviceid)
    });
    this.complaintForm = this.formBuilder.group({
      deviceId: [this.deviceid, Validators.required],
      problemDescription: ['', Validators.required]
    });   
  }

  get fval() {
    return this.complaintForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.complaintForm.invalid)
      return this.toastr.error('Please fill details', 'Error');
    // console.log(this.complaintForm.value);
    // this.complaintService.postComplaint(this.complaintForm.value).subscribe((data) => {
    //   this.successmsg = data;
    //   this.toastr.success("", this.successmsg.data);
    //   this.router.navigate(["/trackcomplaintstatus",]);
    // });
    // this.complaintForm.reset();
    // this.submitted = false;

    this.complaintService.postComplaint(this.complaintForm.value).subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.successmsg = res.data;
          this.toastr.success("", this.successmsg);
          this.complaintForm.reset();
          this.submitted = false;
          this.router.navigate(["/trackcomplaintstatus",]);
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data)
      }
    })
  }
}
