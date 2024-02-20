import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  updatepwdForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.updatepwdForm = this.formBuilder.group({
      oldPwd: ['', Validators.required],
      newPwd: ['', Validators.required],
      confirmPwd: ['', Validators.required]
    });
  }
  get fval() {
    return this.updatepwdForm.controls;
  }
  onFormSubmit() {
    this.submitted = true;
 
    if (this.updatepwdForm.invalid) {
      return this.toastr.error('Invalid Form', 'Error');
    }
    
    this.toastr.success('Password updated sccessfully.');
    this.updatepwdForm.reset();
    this.submitted = false;
  }

}
