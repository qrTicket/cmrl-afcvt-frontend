import { Component, OnInit } from '@angular/core';
//import { MainService } from '../../maintenance/_mainservices/main.service'
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.scss']
})
export class SendmailComponent implements OnInit {
  mailForm: UntypedFormGroup;
  submitted = false;
  constructor
  (
    private http: HttpClient,
    //private mainService: MainService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit()
   {
    this.mailForm = this.formBuilder.group({
      to: ['', Validators.required],
      subject: ['', Validators.required],
      text: ['', Validators.required]
  });
  }
  get fval() {
    return this.mailForm.controls;
}
onFormSubmit() {
    this.submitted = true;
    if (this.mailForm.invalid) {
        return this.toastr.error('Error', 'Please fill the details', {
            progressBar: true
        });
    }
    // this.mainService
    //     .sendMail(this.mailForm.value)
    //     .subscribe(data => {
    //         // console.log(data);
    //     });
    //     this.toastr.success('Mail Send successfully', 'Mail Send', {
    //         progressBar: true
    //     });
    this.mailForm.reset();
    this.submitted = false;
}
}
