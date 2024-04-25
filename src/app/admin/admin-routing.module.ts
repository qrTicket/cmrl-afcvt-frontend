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
import { AddMediaTypeComponent } from "./add-media-type/add-media-type.component";
import { MediaTypeListComponent } from "./media-type-list/media-type-list.component";
import { MediaTypeEditComponent } from "./media-type-edit/media-type-edit.component";
import { TicketTypeAddComponent } from "./ticket-type-add/ticket-type-add.component";
import { TicketTypeListComponent } from "./ticket-type-list/ticket-type-list.component";
import { TicketTypeEditComponent } from "./ticket-type-edit/ticket-type-edit.component";
import { TicketSubtypeAddComponent } from "./ticket-subtype-add/ticket-subtype-add.component";
import { TicketSubtypeListComponent } from "./ticket-subtype-list/ticket-subtype-list.component";
import { TicketSubtypeEditComponent } from "./ticket-subtype-edit/ticket-subtype-edit.component";
import { SpecialDaysAddComponent } from "./special-days-add/special-days-add.component";
import { SpecialDaysListComponent } from "./special-days-list/special-days-list.component";
import { SpecialDaysEditComponent } from "./special-days-edit/special-days-edit.component";
import { TimeTableAddComponent } from "./time-table-add/time-table-add.component";
import { TimeTableListComponent } from "./time-table-list/time-table-list.component";
import { TimeTableEditComponent } from "./time-table-edit/time-table-edit.component";
import { DayTypeAddComponent } from "./day-type-add/day-type-add.component";
import { DayTypeListComponent } from "./day-type-list/day-type-list.component";
import { DayTypeEditComponent } from "./day-type-edit/day-type-edit.component";
import { BaseFareAddComponent } from "./base-fare-add/base-fare-add.component";
import { BaseFareListComponent } from "./base-fare-list/base-fare-list.component";
import { BaseFareEditComponent } from "./base-fare-edit/base-fare-edit.component";
import { MediaTicketMapComponent } from "./media-ticket-map/media-ticket-map.component";
import { DayTimeSlotMapComponent } from "./day-time-slot-map/day-time-slot-map.component";
import { DayTimeSlotMapUpdateComponent } from "./day-time-slot-map-update/day-time-slot-map-update.component";
import { MediaTicketSubtypeListComponent } from "./media-ticket-subtype-list/media-ticket-subtype-list.component";
import { GenerateJsonComponent } from "./generate-json/generate-json.component";
import { AdminZoneAddComponent } from "./admin-zone-add/admin-zone-add.component";
import { AdminZoneEditComponent } from "./admin-zone-edit/admin-zone-edit.component";
import { AdminZoneListComponent } from "./admin-zone-list/admin-zone-list.component";
import { AdminConfigBusinessRuleComponent } from "./admin-config-business-rule/admin-config-business-rule.component";
import { UploadODMatrixComponent } from "./upload-o-d-matrix/upload-o-d-matrix.component";

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

            //old zone, this is not used
            { path: "zone", component: ZoneComponent },
            { path: "zonelist", component: ZonelistComponent },

            { path: "multi-dashboard", component: MultiDashboardComponent },
            { path: "multi-dash-list", component: MultiDashListComponent },
            { path: "admin-mail", component: AdminMailComponent },

            // Media master
            { path: "add-media-type", component:AddMediaTypeComponent },
            { path: "media-type-list", component:MediaTypeListComponent },
            { path: "media-type-edit/:id", component:MediaTypeEditComponent },
            { path: "media-ticket-map", component:MediaTicketMapComponent },
            { path: "media-ticket-subtype-list", component:MediaTicketSubtypeListComponent },

            //Ticket master
            { path: "ticket-type-add", component:TicketTypeAddComponent },
            { path: "ticket-type-list", component:TicketTypeListComponent },
            { path: "ticket-type-edit/:id", component:TicketTypeEditComponent },

            //Ticket Sub-Type master
            { path: "ticket-sub-type-add", component:TicketSubtypeAddComponent },
            { path: "ticket-sub-type-list", component:TicketSubtypeListComponent },
            { path: "ticket-sub-type-edit/:id", component:TicketSubtypeEditComponent },

            //Special Days Master
            { path: "special-days-add", component:SpecialDaysAddComponent },
            { path: "special-days-list", component:SpecialDaysListComponent },
            { path: "special-days-edit/:id", component:SpecialDaysEditComponent },

            //Time Table Master
            { path: "time-table-add", component:TimeTableAddComponent },
            { path: "time-table-list", component:TimeTableListComponent },
            { path: "time-table-edit/:id", component:TimeTableEditComponent },

            //Day Type Master
            { path: "day-type-add", component:DayTypeAddComponent },
            { path: "day-type-list", component:DayTypeListComponent },
            { path: "day-type-edit/:id", component:DayTypeEditComponent },
            { path: "day-timeSlot-map", component:DayTimeSlotMapComponent },
            { path: "day-timeSlot-map-update/:id", component:DayTimeSlotMapUpdateComponent },

            //Base Fare Master
            { path: "base-fare-add", component:BaseFareAddComponent },
            { path: "base-fare-list", component:BaseFareListComponent },
            { path: "base-fare-edit/:id", component:BaseFareEditComponent },

            //new zone master route
            { path: "admin-zone-add", component: AdminZoneAddComponent },
            { path: "admin-zone-list", component: AdminZoneListComponent },
            { path: "admin-zone-edit/:id", component: AdminZoneEditComponent },

            { path: "generate-file", component:GenerateJsonComponent },

            { path: "admin-config-business-rule", component:AdminConfigBusinessRuleComponent },
            { path: "OD-matrix-file-upload", component: UploadODMatrixComponent }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
