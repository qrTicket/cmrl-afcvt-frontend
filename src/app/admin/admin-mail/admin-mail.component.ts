import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailService } from '../_services/email.service';

@Component({
  selector: 'app-admin-mail',
  templateUrl: './admin-mail.component.html',
  styleUrls: ['./admin-mail.component.scss']
})
export class AdminMailComponent implements OnInit {

  emailForm: UntypedFormGroup;
  submitted = false;
  constructor
  (
    private http: HttpClient,
    private emailService: EmailService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      to: ['', Validators.required],
      subject: ['', Validators.required],
      text: ['', Validators.required]
  });
  }

  get fval() {
    return this.emailForm.controls;
}
onFormSubmit() {
   
    this.submitted = true;
    if (this.emailForm.invalid) {
        return this.toastr.error('Error', 'Please fill the details', {
            progressBar: true
        });
    }
    this.emailService
        .sendMail(this.emailForm.value)
        .subscribe(data => {
            console.log(data);
        });
        this.toastr.success('Mail Send successfully', 'Mail Send', {
            progressBar: true
        });
    this.emailForm.reset();
    this.submitted = false;
}

}
