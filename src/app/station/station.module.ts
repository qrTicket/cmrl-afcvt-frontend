import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { ModalModule } from "ngx-bootstrap/modal";
// import { NgSelectModule } from '@ng-select/ng-select';
import { StationRoutingModule } from "./station-routing.module";
import { StationComponent } from "./station.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EquipementlistComponent } from "./equipementlist/equipementlist.component";
import { AlarmreportComponent } from "./alarmreport/alarmreport.component";
import { StationDashboardComponent } from "./station-dashboard/station-dashboard.component";
import { TransactionreportsComponent } from "./transactionreports/transactionreports.component";
import { RaisecomplaintComponent } from "./raisecomplaint/raisecomplaint.component";
import { ApprovedcomplaintsComponent } from "./approvedcomplaints/approvedcomplaints.component";
import { SentcomplaintsComponent } from "./sentcomplaints/sentcomplaints.component";
import { PendingcomplaintsComponent } from "./pendingcomplaints/pendingcomplaints.component";
import { StationFooterComponent } from "./components/station-footer/station-footer.component";
import { NtpComponent } from "./ntp/ntp.component";
import { GeneralmsgComponent } from "./generalmsg/generalmsg.component";
import { DatabaseComponent } from "./database/database.component";
import { EventsComponent } from "./events/events.component";
import { SendmailComponent } from "./sendmail/sendmail.component";
import { MaintenancestaffComponent } from "./maintenancestaff/maintenancestaff.component";
import { MaintenancestafflistComponent } from "./maintenancestafflist/maintenancestafflist.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { EquipmentsComponent } from "./equipments/equipments.component";
import { ConfiguredEquipComponent } from "./configured-equip/configured-equip.component";
import { ConfigurationEquipmentComponent } from "./configuration-equipment/configuration-equipment.component";
import { EditConfigComponent } from "./edit-config/edit-config.component";
import {
    BsDatepickerModule,
    BsDatepickerConfig,
} from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AlarmGeneratedDescriptionComponent } from "./alarm-generated-description/alarm-generated-description.component";
import { UserShiftComponent } from "../sharedComponent/user-shift/user-shift.component";
import { AllGateHistoryComponent } from "./all-gate-history/all-gate-history.component";
import { RestoreGateDetailsComponent } from "./restore-gate-details/restore-gate-details.component";
import { HistoryByGateComponent } from "./history-by-gate/history-by-gate.component";
import { ViewGateDetailsByNameComponent } from "./view-gate-details-by-name/view-gate-details-by-name.component";
import { TrackcomplaintstatusComponent } from "./trackcomplaintstatus/trackcomplaintstatus.component";
import { TerminalListComponent } from "./terminal-list/terminal-list.component";
import { OtherListComponent } from "./other-list/other-list.component";
import { ConfiguredTerminalListComponent } from "./configured-terminal-list/configured-terminal-list.component";
import { AlarmsComponent } from "./alarms/alarms.component";
import { ModePdfComponent } from './mode-pdf/mode-pdf.component';
import { ComplaintDetailsComponent } from './complaint-details/complaint-details.component';
import { GateOperationModeComponent } from './gate-operation-mode/gate-operation-mode.component';

import { MultiGateOperationModeComponent } from './multi-gate-operation-mode/multi-gate-operation-mode.component';
//import { ComplaintModule } from "../complaint/complaint.module";

@NgModule({
    imports: [
        CommonModule,
        StationRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        DataTablesModule,
        //FormsModule,
        ReactiveFormsModule,
        NgbModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        //ComplaintModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        StationComponent,
        SidebarComponent,
        HeaderComponent,
        AlarmreportComponent,
        EquipementlistComponent,
        StationDashboardComponent,
        TransactionreportsComponent,
        RaisecomplaintComponent,
        ApprovedcomplaintsComponent,
        SentcomplaintsComponent,
        PendingcomplaintsComponent,
        StationFooterComponent,
        NtpComponent,
        GeneralmsgComponent,
        DatabaseComponent,
        EventsComponent,
        SendmailComponent,
        MaintenancestaffComponent,
        MaintenancestafflistComponent,
        PrivacyComponent,
        EditProfileComponent,
        EquipmentsComponent,
        ConfiguredEquipComponent,
        ConfigurationEquipmentComponent,
        EditConfigComponent,
        ResetPasswordComponent,
        AlarmGeneratedDescriptionComponent,
        UserShiftComponent,
        AllGateHistoryComponent,
        RestoreGateDetailsComponent,
        HistoryByGateComponent,
        ViewGateDetailsByNameComponent,
        TrackcomplaintstatusComponent,
        TerminalListComponent,
        OtherListComponent,
        ConfiguredTerminalListComponent,
        AlarmsComponent,
        ModePdfComponent,
        ComplaintDetailsComponent,
        GateOperationModeComponent,
        MultiGateOperationModeComponent,
    ],
    providers: [BsDatepickerConfig],
    exports: [AlarmsComponent],
})
export class StationModule {}
