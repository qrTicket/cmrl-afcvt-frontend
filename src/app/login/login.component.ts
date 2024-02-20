import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    TemplateRef,
    ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { fadeInAnimation } from "../_animations/fadeIn.animation";
import { AlertsService, AuthService, ErrorService } from "../_services/index";
import { first } from "rxjs/operators";
import { Subscription } from "rxjs";

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from 'sweetalert2'
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";



@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    animations: [fadeInAnimation],
})


export class LoginComponent implements OnInit, AfterViewInit {
    @ViewChild("myinput") el: ElementRef;
    isLoginError: boolean = false;
    show: boolean = false;
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    token: string;
    error: "";
    focus: string;
    subscription: Subscription[] = [];
    message: any;
    roleList:any; 
    subscriptions: Subscription;
   

    constructor(
        private loginform: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authservice: AuthService,
        private alert: AlertsService,
        private errorService: ErrorService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService, 
        private modelService: BsModalService
    ) {}

    ngAfterViewInit() {
        if (this.el.nativeElement) {
            this.focus = this.el.nativeElement.focus();
        }
    }

    ngOnInit() {
        console.log("login loaded");
        this.loginForm = this.loginform.group({
            roleCode: ["", Validators.required],
            username: ["", Validators.required],
            password: ["", [Validators.required, Validators.minLength(8)]],
        });

        this.authservice.logout();
        this.returnUrl = this.route.snapshot.queryParams["return Url"] || "/";

        //fetch roles
        this.subscription.push(
            // this.authservice.getRoles().subscribe((roleResult)=>{
            //     this.roleList = roleResult["data"];
            // })
            this.authservice.getRoles().subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                      this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.roleList = res.data;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
        

        if(localStorage.getItem("username") === ""){
            this.router.navigate(["/login"]);
        }
    }

    get fval() {
        return this.loginForm.controls;
    }

    toggleEve(e) {
        this.show = e.target.checked;
    }

   


    onFormSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return Swal.fire({icon:"error", text:"Please enter all fields!"})
        }

        
        this.spinner.show();

        // this.authservice.login(this.fval.username.value, this.fval.password.value, this.fval.roleCode.value).pipe(first()).subscribe(
        //         (data) => {
        //             if (data.status === "0") 
        //             { 
        //                 this.message = data.data;
        //                 this.spinner.hide();
        //             } 
        //             else if (data.status === "1") 
        //             {
                        
        //                 //console.log("login response is => "+data);
        //                 setTimeout(() => { this.spinner.hide();}, 3000);
        //                 if (data.data.authorities[0].authority === "ROLE_SUPER")
        //                 {
        //                     this.router.navigate(["/super-admin"]);
        //                 } 
        //                 else if (data.data.authorities[0].authority === "ROLE_STATION")
        //                 {
        //                     this.router.navigate(["/stationdashboard"]);
        //                 } 
        //                 else if (data.data.authorities[0].authority === "ROLE_ADMIN") 
        //                 {
        //                     this.router.navigate(["/admin"]);
        //                 } 
        //                 else if (data.data.authorities[0].authority === "ROLE_EQUIPMENT" ) 
        //                 {
        //                     this.router.navigate(["/equipment"]);
        //                     this.toastr.success( `Welcome back ${data.data.username}` );
        //                 } 
        //                 else if (data.data.authorities[0].authority === "ROLE_MAINTENANCE") 
        //                 {
        //                     this.router.navigate(["/maindash"]);
        //                 } 
        //                 else if (data.data.authorities[0].authority === "ROLE_COMPLAINT") 
        //                 {
        //                     this.router.navigate(["/complaint"]);
        //                 } 
        //                 else if (data.data.authorities[0].authority === "ROLE_USERMANAGER") 
        //                 {
        //                     this.router.navigate(["/user-manager"]);
        //                     this.toastr.success(`Welcome back ${data.data.username}` );
        //                 }
                        
        //                 // this.router.navigate([this.returnUrl]);
        //             }
        //             else if (data.status === "2"){
        //                 //localStorage.setItem("/navigateDashboard", this.fval.roleCode.value);
        //                 this.router.navigate(["/changeFirstPassword"]);
        //             }
        //         },
        //         (error) => {
        //             this.spinner.hide();
        //             // console.log(error);
        //         }
        //     );
            this.authservice.login(this.fval.username.value, this.fval.password.value, this.fval.roleCode.value).pipe(first()).subscribe({
                next:(res)=>{
                  if(res.status === "0"){
                    this.message = res.data;
                    this.spinner.hide();
                  }
                  else if(res.status === "1"){
                    setTimeout(() => { this.spinner.hide();}, 3000);
                        if (res.data.authorities[0].authority === "ROLE_SUPER")
                        {
                            this.router.navigate(["/super-admin"]);
                        } 
                        else if (res.data.authorities[0].authority === "ROLE_STATION")
                        {
                            this.router.navigate(["/stationdashboard"]);
                        } 
                        else if (res.data.authorities[0].authority === "ROLE_ADMIN") 
                        {
                            this.router.navigate(["/admin"]);
                        } 
                        else if (res.data.authorities[0].authority === "ROLE_EQUIPMENT" ) 
                        {
                            this.router.navigate(["/equipment"]);
                            this.toastr.success( `Welcome back ${res.data.username}` );
                        } 
                        else if (res.data.authorities[0].authority === "ROLE_MAINTENANCE") 
                        {
                            this.router.navigate(["/maindash"]);
                            this.toastr.success( `Welcome back ${res.data.username}` );
                        } 
                        else if (res.data.authorities[0].authority === "ROLE_COMPLAINT") 
                        {
                            this.router.navigate(["/complaint"]);
                        } 
                        else if (res.data.authorities[0].authority === "ROLE_USERMANAGER") 
                        {
                            this.router.navigate(["/user-manager"]);
                            this.toastr.success(`Welcome back ${res.data.username}` );
                        }
                  }
                  else if (res.status === "2"){
                    this.router.navigate(["/changeFirstPassword"]);
                }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })

            setTimeout(() => { this.spinner.hide();}, 3000);
            
    }
   
}
