import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { NgxSpinnerModule } from "ngx-spinner";
import {
    BsDatepickerModule,
    BsDatepickerConfig,
} from "ngx-bootstrap/datepicker";
import { ModalModule } from "ngx-bootstrap/modal";

import { SuperFooterComponent } from "./components/super-footer/super-footer.component";
import { SuperRoutingModule } from "./super-routing.module";
import { SuperComponent } from "./super.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { PtonumComponent } from "./ptonum/ptonum.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RegistrationComponent } from "./registration/registration.component";
import { VerifyPtoComponent } from "./verify-pto/verify-pto.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { VerifiedUserComponent } from './verified-user/verified-user.component';
import { RejectedUserComponent } from './rejected-user/rejected-user.component';
import { BlacklistUserComponent } from './blacklist-user/blacklist-user.component';

@NgModule({
    imports: [
        CommonModule,
        SuperRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        DataTablesModule,
        NgxSpinnerModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),

    ],
    declarations: [
        SuperComponent,
        SidebarComponent,
        HeaderComponent,
        SuperFooterComponent,
        PtonumComponent,
        DashboardComponent,
        RegistrationComponent,
        VerifyPtoComponent,
        PrivacyComponent,
        EditProfileComponent,
        VerifiedUserComponent,
        RejectedUserComponent,
        BlacklistUserComponent,
    ],
    providers: [BsDatepickerConfig]
})
export class SuperModule {}
