import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AdminRoutingModule } from "./admin-routing.module";
import { DataTablesModule } from "angular-datatables";
//import { StationModule } from "../station/station.module";
import { AdminComponent } from "./admin.component";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AdminFooterComponent } from "./components/admin-footer/admin-footer.component";
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
import { AssignLineToStationListComponent } from "./assign-line-to-station-list/assign-line-to-station-list.component";
import { AssignLineToStationComponent } from "./assign-line-to-station/assign-line-to-station.component";
import { EditLineToStationComponent } from "./edit-line-to-station/edit-line-to-station.component";
import { JunctionlistComponent } from "./junctionlist/junctionlist.component";
import { EditJunctionComponent } from "./edit-junction/edit-junction.component";
import { StationPanelComponent } from "./station-panel/station-panel.component";
import { AdduserComponent } from "./adduser/adduser.component";
import { UserlistComponent } from "./userlist/userlist.component";
import { EditUsermanagerComponent } from "./edit-usermanager/edit-usermanager.component";
//import { AdminAlarmComponent } from "./admin-alarm/admin-alarm.component";
import { AdminMailComponent } from "./admin-mail/admin-mail.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { WarningSignComponent } from "./warning-sign/warning-sign.component";
import { ZoneComponent } from "./zone/zone.component";
import { ZonelistComponent } from "./zonelist/zonelist.component";
import { MultiDashboardComponent } from "./multi-dashboard/multi-dashboard.component";
import { MultiDashListComponent } from "./multi-dash-list/multi-dash-list.component";
import { AuditFileComponent } from "./audit-file/audit-file.component";
import { CentralAlarmsComponent } from "./central-alarms/central-alarms.component";
import { PenalityComponent } from './penality/penality.component';
import { AddUsermanagerComponent } from './add-usermanager/add-usermanager.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { UsermanagerlistComponent } from './usermanagerlist/usermanagerlist.component';
import { UpdateUsermanagerComponent } from './update-usermanager/update-usermanager.component';
import { LineStationsDetailsComponent } from './line-stations-details/line-stations-details.component';
import { SingleStationDetailsComponent } from './single-station-details/single-station-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { StationlinkRuleComponent } from './stationlink-rule/stationlink-rule.component';
import { ScheduleUpdateFileComponent } from './schedule-update-file/schedule-update-file.component';
import { ScheduleFileUpdateListComponent } from './schedule-file-update-list/schedule-file-update-list.component';
import { RouterModule } from "@angular/router";



@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        DataTablesModule,
        //FormsModule,
        ReactiveFormsModule,
        //StationModule,
        NgxSpinnerModule,
        NgbModule,
        NgSelectModule,
        RouterModule,
       
    ],
    declarations: [

        AdminComponent,
        AdmindashboardComponent,
        HeaderComponent,
        SidebarComponent,
        AdminFooterComponent,
        AddlineComponent,
        LinelistComponent,
        EditLineComponent,
        AddstationComponent,
        StationlistComponent,
        EditStationComponent,
        FareListComponent,
        EditFareDetailsComponent,
        EditProfileComponent,
        PrivacyComponent,
        ExtendlineComponent,
        ExtendLineListComponent,
        AssignLineToStationListComponent,
        AssignLineToStationComponent,
        EditLineToStationComponent,
        JunctionlistComponent,
        EditJunctionComponent,
        StationPanelComponent,
        AdduserComponent,
        UserlistComponent,
        EditUsermanagerComponent,
        //AdminAlarmComponent,
        AdminMailComponent,
        WarningSignComponent,
        ZoneComponent,
        ZonelistComponent,
        MultiDashboardComponent,
        MultiDashListComponent,
        AuditFileComponent,
        CentralAlarmsComponent,
        PenalityComponent,
        AddUsermanagerComponent,
        UsermanagerlistComponent,
        UpdateUsermanagerComponent,
        LineStationsDetailsComponent,
        SingleStationDetailsComponent,
        StationlinkRuleComponent,
        ScheduleUpdateFileComponent,
        ScheduleFileUpdateListComponent
    ],
    exports: [PrivacyComponent],
})
export class AdminModule {}
