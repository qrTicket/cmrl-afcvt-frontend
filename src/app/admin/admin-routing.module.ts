import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AuthGuard } from "../_helpers/auth-guard";
import { RoleGuardService as RoleGuard } from "../_services/role.guard.service";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { AddlineComponent } from "./addline/addline.component";
import { LinelistComponent } from "./linelist/linelist.component";
import { EditLineComponent } from "./edit-line/edit-line.component";
import { AddstationComponent } from "./addstation/addstation.component";
import { StationlistComponent } from "./stationlist/stationlist.component";
import { EditStationComponent } from "./edit-station/edit-station.component";
import { FareListComponent } from "./fare-list/fare-list.component";
import { EditFareDetailsComponent } from "./edit-fare-details/edit-fare-details.component";
import { ExtendlineComponent } from "./extendline/extendline.component";
import { ExtendLineListComponent } from "./extend-line-list/extend-line-list.component";
import { AssignLineToStationComponent } from "./assign-line-to-station/assign-line-to-station.component";
import { AssignLineToStationListComponent } from "./assign-line-to-station-list/assign-line-to-station-list.component";
import { EditLineToStationComponent } from "./edit-line-to-station/edit-line-to-station.component";
import { JunctionlistComponent } from "./junctionlist/junctionlist.component";
import { EditJunctionComponent } from "./edit-junction/edit-junction.component";
import { StationPanelComponent } from "./station-panel/station-panel.component";
import { AdduserComponent } from "./adduser/adduser.component";
import { UserlistComponent } from "./userlist/userlist.component";
import { EditUsermanagerComponent } from "./edit-usermanager/edit-usermanager.component";
import { AdminAlarmComponent } from "./admin-alarm/admin-alarm.component";
import { WarningSignComponent } from "./warning-sign/warning-sign.component";
import { ZoneComponent } from "./zone/zone.component";
import { ZonelistComponent } from "./zonelist/zonelist.component";
import { MultiDashboardComponent } from "./multi-dashboard/multi-dashboard.component";
import { MultiDashListComponent } from "./multi-dash-list/multi-dash-list.component";
import { AdminMailComponent } from "./admin-mail/admin-mail.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { AuditFileComponent } from "./audit-file/audit-file.component";
import { PenalityComponent } from "./penality/penality.component";
import { AddUsermanagerComponent } from "./add-usermanager/add-usermanager.component";
import { UsermanagerlistComponent } from "./usermanagerlist/usermanagerlist.component";
import { UpdateUsermanagerComponent } from "./update-usermanager/update-usermanager.component";
import { LineStationsDetailsComponent } from "./line-stations-details/line-stations-details.component";
import { SingleStationDetailsComponent } from "./single-station-details/single-station-details.component";
import { StationlinkRuleComponent } from "./stationlink-rule/stationlink-rule.component";
import { ScheduleUpdateFileComponent } from "./schedule-update-file/schedule-update-file.component";
import { ScheduleFileUpdateListComponent } from "./schedule-file-update-list/schedule-file-update-list.component";

const routes: Routes = [
    {
        path: "admin",
        component: AdminComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRole: ["ROLE_ADMIN"] },
        children: [
            { path: "", redirectTo: "admindashboard", pathMatch: "prefix" },
            // ------------------------------------- in use ----------------------------------------- //
            { path: "admindashboard", component: AdmindashboardComponent },
            { path: "addline", component: AddlineComponent },
            { path: "linelist", component: LinelistComponent },
            { path: "edit-line/:id", component: EditLineComponent },
            { path: "line-stations-detail/:id", component: LineStationsDetailsComponent },
            { path: "addstation", component: AddstationComponent },
            { path: "stationlist", component: StationlistComponent },
            { path: "edit-station/:id", component: EditStationComponent },
            { path: "fare-list", component: FareListComponent },
            { path: "edit-fare-details/:id", component: EditFareDetailsComponent },
            { path: "edit-profile", component: EditProfileComponent },
            { path: "privacy", component: PrivacyComponent },
            { path: "audit", component: AuditFileComponent },
            { path: "penality", component: PenalityComponent },
            { path: "single-station-details/:stationcode", component: SingleStationDetailsComponent},
            { path: "schedule-file-update", component: ScheduleUpdateFileComponent },
            { path: "schedule-file-update-list", component: ScheduleFileUpdateListComponent },
            // ------------------------------------------------------------------------------ //



            { path: "extendline", component: ExtendlineComponent },
            { path: "extend-line-list", component: ExtendLineListComponent },
            {
                path: "assign-line-to-station",
                component: AssignLineToStationComponent,
            },
            {
                path: "assign-line-to-station-list",
                component: AssignLineToStationListComponent,
            },
            {
                path: "edit-line-to-station/:id",
                component: EditLineToStationComponent,
            },
            { path: "junctionlist", component: JunctionlistComponent },
            { path: "edit-junction/:id", component: EditJunctionComponent },
            { path: "station-panel", component: StationPanelComponent },
            { path: "adduser", component: AdduserComponent },
            { path: "userlist", component: UserlistComponent },
            {
                path: "edit-usermanager/:id",
                component: EditUsermanagerComponent,
            },
            { path: "add-usermanager", component: AddUsermanagerComponent},
            { path: "usermanager-list", component: UsermanagerlistComponent},
            { path: "usermanager/update", component: UpdateUsermanagerComponent },
            { path: "stationlink-rule", component: StationlinkRuleComponent },
            

            { path: "admin-alarm", component: AdminAlarmComponent },
            { path: "warning-sign", component: WarningSignComponent },
            { path: "zone", component: ZoneComponent },
            { path: "zonelist", component: ZonelistComponent },
            { path: "multi-dashboard", component: MultiDashboardComponent },
            { path: "multi-dash-list", component: MultiDashListComponent },
            { path: "admin-mail", component: AdminMailComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
