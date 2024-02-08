import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StationComponent } from "./station.component";
import { AuthGuard } from "../_helpers/auth-guard";
import { RoleGuardService as RoleGuard } from "../_services/role.guard.service";
import { FormsModule } from "@angular/forms";
import { StationDashboardComponent } from "./station-dashboard/station-dashboard.component";
import { EquipementlistComponent } from "./equipementlist/equipementlist.component";
import { AlarmreportComponent } from "./alarmreport/alarmreport.component";
import { TransactionreportsComponent } from "./transactionreports/transactionreports.component";
import { RaisecomplaintComponent } from "./raisecomplaint/raisecomplaint.component";
import { SentcomplaintsComponent } from "./sentcomplaints/sentcomplaints.component";
import { DatabaseComponent } from "./database/database.component";
import { NtpComponent } from "./ntp/ntp.component";
import { GeneralmsgComponent } from "./generalmsg/generalmsg.component";
import { EventsComponent } from "./events/events.component";
import { SendmailComponent } from "./sendmail/sendmail.component";
import { MaintenancestaffComponent } from "./maintenancestaff/maintenancestaff.component";
import { MaintenancestafflistComponent } from "./maintenancestafflist/maintenancestafflist.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { EquipmentsComponent } from "./equipments/equipments.component";
import { ConfiguredEquipComponent } from "./configured-equip/configured-equip.component";
import { ConfigurationEquipmentComponent } from "./configuration-equipment/configuration-equipment.component";
import { EditConfigComponent } from './edit-config/edit-config.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AlarmGeneratedDescriptionComponent } from './alarm-generated-description/alarm-generated-description.component';
import { UserShiftComponent } from '../sharedComponent/user-shift/user-shift.component';
import { AllGateHistoryComponent } from './all-gate-history/all-gate-history.component';
import { RestoreGateDetailsComponent } from './restore-gate-details/restore-gate-details.component';
import { HistoryByGateComponent } from './history-by-gate/history-by-gate.component';
import { ViewGateDetailsByNameComponent } from './view-gate-details-by-name/view-gate-details-by-name.component';
import { TrackcomplaintstatusComponent } from './trackcomplaintstatus/trackcomplaintstatus.component';
import { TerminalListComponent } from './terminal-list/terminal-list.component';
import { OtherListComponent } from './other-list/other-list.component';
import { ConfiguredTerminalListComponent } from './configured-terminal-list/configured-terminal-list.component';
import { ModePdfComponent } from './mode-pdf/mode-pdf.component';
import { ComplaintDetailsComponent } from "./complaint-details/complaint-details.component";
import { GateOperationModeComponent } from "./gate-operation-mode/gate-operation-mode.component";
//import { DeviceDetailsComponent } from "../complaint/device-details/device-details.component";
import { MultiGateOperationModeComponent } from "./multi-gate-operation-mode/multi-gate-operation-mode.component";

const routes: Routes = [
    {
        path: "",
        component: StationComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
            expectedRole: ["ROLE_STATION"],
        },
        children: [
            { path: "", redirectTo: "stationdashboard", pathMatch: "prefix" },
            { path: "stationdashboard", component: StationDashboardComponent },
            { path: "equipementlist", component: EquipementlistComponent },
            { path: "alarmreport", component: AlarmreportComponent },
            { path: "alarm-generated-description", component: AlarmGeneratedDescriptionComponent },
            { path: "transactionreports", component: TransactionreportsComponent },
            //{ path: "raisecomplaint", component: RaisecomplaintComponent },not in use
            { path: "raisecomplaint/:device_id", component: RaisecomplaintComponent },
            { path: "trackcomplaintstatus", component: TrackcomplaintstatusComponent },
            { path: "complaintdetails/:token", component: ComplaintDetailsComponent },
            { path: "database", component: DatabaseComponent },
            { path: "ntp", component: NtpComponent },
            { path: "generalmsg", component: GeneralmsgComponent },
            { path: "events", component: EventsComponent },
            { path: "sendmail", component: SendmailComponent },
            { path: "sentcomplaints", component: SentcomplaintsComponent },
            { path: "maintenancestaff", component: MaintenancestaffComponent },
            { path: "maintenancestafflist", component: MaintenancestafflistComponent },
            { path: "edit-profile", component: EditProfileComponent },
            { path: "reset-password", component: ResetPasswordComponent },
            { path: "privacy", component: PrivacyComponent },
            { path: "assigned/equipments", component: EquipmentsComponent },
            { path: "assigned/terminal-list", component: TerminalListComponent },
            { path: "assigned/other-list", component: OtherListComponent },
            { path: "equipment/configured", component: ConfiguredEquipComponent },
            { path: "equipment/configuration/:id", component: ConfigurationEquipmentComponent },
            { path: "edit-config/:gcId", component: EditConfigComponent },
            { path: "user-shift", component: UserShiftComponent },
            { path: "all-gate-history", component: AllGateHistoryComponent },
            { path: "restore-gate-details", component: RestoreGateDetailsComponent },
            { path: "history-by-gate", component: HistoryByGateComponent },
            { path: "view-gate-details-by-name", component: ViewGateDetailsByNameComponent },
            { path: "configured-terminal-list", component: ConfiguredTerminalListComponent },
            { path: "modePdf", component: ModePdfComponent},
            { path: "gate-operation-mode", component: GateOperationModeComponent},
            { path: "multi-gate-operation-mode", component: MultiGateOperationModeComponent},
            //{ path: 'equipments/device-details/:deviceid', component: DeviceDetailsComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, FormsModule],
})
export class StationRoutingModule { }
