import { DatePipe} from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { DataTablesModule } from "angular-datatables";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// tslint:disable-next-line:comment-format
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageTranslationModule } from "./shared/modules/language-translation/language-translation.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./shared";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./_helpers/error.inteceptor";
import { NgxSpinnerModule } from "ngx-spinner";
//import { NgxLoadingModule } from "ngx-loading";
import { ToastrModule } from "ngx-toastr";
import { RoleGuardService } from "./_services/role.guard.service";
import { ForgotPassComponent } from "./forgot-pass/forgot-pass.component";
import { HomeComponent } from "./home/home.component";
import { MainCompComponent } from "./main-comp/main-comp.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ErrorComponent } from "./error/error.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { UserProfileService } from "./_services/user-profile.service";
import { LoginModuleModule } from "./login/login-module.module";
import { ChangeFirstPasswordComponent } from './change-first-password/change-first-password.component';
//import { EditallComponent } from './editall-deleted/editall.component';
//import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
// import { UserShiftComponent } from './sharedComponent/user-shift/user-shift.component';
// import { ComplaintComponent } from './complaint/complaint.component';
// import { FontAwesomeModule } from ‘@fortawesome/angular-fontawesome’;
import { MatSliderModule } from '@angular/material/slider';
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";


@NgModule({
    declarations: [
        AppComponent,
        ForgotPassComponent,
        HomeComponent,
        MainCompComponent,
        LoginComponent,
        SignupComponent,
        ErrorComponent,
        ResetPasswordComponent,
        ChangeFirstPasswordComponent,
        //EditallComponent,
        // UserShiftComponent
    ],
    
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        DataTablesModule,
        ReactiveFormsModule,
        RxReactiveFormsModule,
        NgSelectModule,
        NgxSpinnerModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            timeOut: 3000,
            positionClass: "toast-top-right",
            autoDismiss: false,
        }),
        //NgxLoadingModule.forRoot({}),
        LoginModuleModule,
        MatSliderModule
        
    ],
    exports: [FormsModule],
    providers: [
        AuthGuard,
        UserProfileService,
        DatePipe,

        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
