import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalModule } from "ngx-bootstrap/modal";
//import { AngularFontAwesomeModule } from "angular-font-awesome";
import { DataTablesModule } from "angular-datatables";

import { HeaderComponent } from "./components/header/header.component";
// import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { ComplaintFooterComponent } from './components/complaint-footer/complaint-footer.component';
import { ComplaintdashComponent } from "./complaintdash/complaintdash.component";
import { ComplaintComponent } from "./complaint.component";
import { ComplaintRoutingModule } from "./complaint-routing.module";
import { ComplaintMailComponent } from "./complaint-mail/complaint-mail.component";
import { ComplaintFooterComponent } from "./components/complaint-footer/complaint-footer.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ChartsModule } from "ng2-charts";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { RejectedListComponent } from './rejected-list/rejected-list.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { ProgressListComponent } from './progress-list/progress-list.component';
import { CompletedComplaintListComponent } from './completed-complaint-list/completed-complaint-list.component';
import { ViewComplaintDetailsComponent } from './view-complaint-details/view-complaint-details.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { CompChangePasswordComponent } from './comp-change-password/comp-change-password.component';

@NgModule({
    declarations: [
        HeaderComponent,
        ComplaintdashComponent,
        ComplaintComponent,
        ComplaintMailComponent,
        ComplaintFooterComponent,
        SidebarComponent,
        EditProfileComponent,
        RejectedListComponent,
        PendingListComponent,
        ProgressListComponent,
        CompletedComplaintListComponent,
        ViewComplaintDetailsComponent,
        DeviceDetailsComponent,
        CompChangePasswordComponent,
    ],
    imports: [
        CommonModule,
        //AngularFontAwesomeModule,
        ComplaintRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        //FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        DataTablesModule,
        ChartsModule,
        NgbModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComplaintModule {}
