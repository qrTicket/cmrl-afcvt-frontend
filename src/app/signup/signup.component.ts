import { Component, OnInit } from '@angular/core';
// import { routerTransition } from "../router.animations";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Register } from '../auth_models/register.model';
import { AuthService } from '../_services/auth.service';
import { AlertsService } from '../_services/alerts.service';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
// export interface AutoCompleteModel {
//     value: any;
//     display: string;
//  }

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: []
})
export class SignupComponent implements OnInit {
    user: Register;

    public items = [
        { display: 'super', value: 1 },
        { display: 'admin', value: 2 },
        { display: 'station', value: 3 },
        { display: 'user', value: 4 }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authservice: AuthService,
        private userservice: UserService,
        private alert: AlertsService,
        private spinner: NgxSpinnerService
    ) {}
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    roles = '';

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            username: ['', Validators.required],
            role: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    get fval() {
        // this.registerForm.value.role.split(" ");
        // console.log(this.registerForm.value.role.split(" "));

        return this.registerForm.controls;
    }

    selectChangeHandler(e) {
        this.roles = e.target.value;
        // console.log(this.roles);

        this.roles.split(' ');
        // console.log(this.roles.split(' '));
    }

    onFormSubmit() {
        // console.log('clicked');
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return this.alert.showError();
        }

        this.loading = true;
        this.spinner.show();
        // tslint:disable-next-line:max-line-length

        this.userservice
            .register(this.registerForm.value)

            .pipe(first())

            .subscribe(
                data => {
                    this.loading = false;
                    this.spinner.hide();
                    // console.log(data, 'Register');
                    // console.log(this.registerForm.value, '%%%%%%');

                    this.alert.showSuccess();
                    this.router.navigate(['/login']);
                },
                error => {
                    this.spinner.hide();
                    this.alert.showError();
                    this.loading = false;
                }
            );
    }
}
