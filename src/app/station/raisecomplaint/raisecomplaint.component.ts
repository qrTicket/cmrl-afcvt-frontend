import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ComplaintService } from '../_services/complaint.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-raisecomplaint',
  templateUrl: './raisecomplaint.component.html',
  styleUrls: ['./raisecomplaint.component.scss'],
})
export class RaisecomplaintComponent implements OnInit {
  complaintForm: UntypedFormGroup;
  submitted = false;
  successmsg;
  message;
  deviceid:any;


  constructor(
    private complaintService: ComplaintService,
    private formBuilder: UntypedFormBuilder,
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
    this.complaintService.postComplaint(this.complaintForm.value).subscribe((data) => {
      this.successmsg = data;
      this.toastr.success("", this.successmsg.data);
      this.router.navigate(["/trackcomplaintstatus",]);
    });
    this.complaintForm.reset();
    this.submitted = false;
  }
}
