import { Component, OnInit } from '@angular/core';
import { MainService } from '../_mainservices/main.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
    styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
    mailForm: FormGroup;
    submitted = false;
    constructor(
        private http: HttpClient,
        private mainService: MainService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService
    ) {}
    ngOnInit() {
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
        // this.mainService.sendMail(this.mailForm.value)
        //     .subscribe(data => {
        //         // console.log(data);
        //     });
        //     this.toastr.success('Mail Send successfully', 'Mail Send', {
        //         progressBar: true
        //     });
        // this.mailForm.reset();
        // this.submitted = false;

        this.mainService.sendMail(this.mailForm.value).subscribe({
            next:(res)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!',{progressBar:true})
              }
              else if(res.status === "1"){
                this.toastr.success('Mail Send successfully', 'Mail Send', {progressBar: true});
                this.mailForm.reset();
                this.submitted = false;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }
}
