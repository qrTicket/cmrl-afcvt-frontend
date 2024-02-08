import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaintenanceRoutingModule } from "./maintenance-routing.module";
import { MaintenanceComponent } from "./maintenance.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { MaindashComponent } from "./maindash/maindash.component";
import { DataTablesModule } from "angular-datatables";
import { ComplainListComponent } from "./complain-list/complain-list.component";
import { MaintainFooterComponent } from "./components/maintain-footer/maintain-footer.component";
import { MailComponent } from "./mail/mail.component";
import { ChartsModule } from "ng2-charts";
import { ModalModule } from "ngx-bootstrap/modal";
import { AcceptComplaintComponent } from "./accept-complaint/accept-complaint.component";
// import { VerifiedListComponent } from './verified-list/verified-list.component';
// import { RejectedListComponent } from './rejected-list/rejected-list.component';
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ComplaintAssignListComponent } from "./complaint-assign-list/complaint-assign-list.component";
import { CompletedComplaintListComponent } from './completed-complaint-list/completed-complaint-list.component';
import { ViewComplaintdetailsComponent } from './view-complaintdetails/view-complaintdetails.component';
import { InprogressListComponent } from './inprogress-list/inprogress-list.component';
import { ComplaintModule } from "../complaint/complaint.module";
import { MainChangePasswordComponent } from './main-change-password/main-change-password.component';

@NgModule({
    imports: [
        CommonModule,
        MaintenanceRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        DataTablesModule,
        ChartsModule,
        //FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        ComplaintModule
    ],
    declarations: [
        MaintenanceComponent,
        SidebarComponent,
        HeaderComponent,
        MailComponent,
        MaindashComponent,
        ComplainListComponent,
        MaintainFooterComponent,
        AcceptComplaintComponent,
        // VerifiedListComponent,
        // RejectedListComponent,
        EditProfileComponent,
        ComplaintAssignListComponent,
        CompletedComplaintListComponent,
        ViewComplaintdetailsComponent,
        InprogressListComponent,
        MainChangePasswordComponent,
    ],
})
export class MaintenanceModule {}
