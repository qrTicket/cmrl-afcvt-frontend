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
import { AddMediaTypeComponent } from './add-media-type/add-media-type.component';
import { MediaTypeListComponent } from './media-type-list/media-type-list.component';
import { MediaTypeEditComponent } from './media-type-edit/media-type-edit.component';
import { TicketTypeAddComponent } from './ticket-type-add/ticket-type-add.component';
import { TicketTypeListComponent } from './ticket-type-list/ticket-type-list.component';
import { TicketTypeEditComponent } from './ticket-type-edit/ticket-type-edit.component';
import { TicketSubtypeAddComponent } from './ticket-subtype-add/ticket-subtype-add.component';
import { TicketSubtypeListComponent } from './ticket-subtype-list/ticket-subtype-list.component';
import { TicketSubtypeEditComponent } from './ticket-subtype-edit/ticket-subtype-edit.component';
import { SpecialDaysAddComponent } from './special-days-add/special-days-add.component';
import { SpecialDaysListComponent } from './special-days-list/special-days-list.component';
import { SpecialDaysEditComponent } from './special-days-edit/special-days-edit.component';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimeTableAddComponent } from './time-table-add/time-table-add.component';
import { TimeTableListComponent } from './time-table-list/time-table-list.component';
import { TimeTableEditComponent } from './time-table-edit/time-table-edit.component';
import { DayTypeAddComponent } from './day-type-add/day-type-add.component';
import { DayTypeListComponent } from './day-type-list/day-type-list.component';
import { DayTypeEditComponent } from './day-type-edit/day-type-edit.component';
import { BaseFareAddComponent } from './base-fare-add/base-fare-add.component';
import { BaseFareListComponent } from './base-fare-list/base-fare-list.component';
import { BaseFareEditComponent } from './base-fare-edit/base-fare-edit.component';
import { MediaTicketMapComponent } from './media-ticket-map/media-ticket-map.component';
import { DayTimeSlotMapComponent } from './day-time-slot-map/day-time-slot-map.component';
import { DayTimeSlotMapUpdateComponent } from './day-time-slot-map-update/day-time-slot-map-update.component';
import { MediaTicketSubtypeListComponent } from './media-ticket-subtype-list/media-ticket-subtype-list.component';
import { GenerateJsonComponent } from './generate-json/generate-json.component';
import { AdminZoneAddComponent } from './admin-zone-add/admin-zone-add.component';
import { AdminZoneListComponent } from './admin-zone-list/admin-zone-list.component';
import { AdminZoneEditComponent } from './admin-zone-edit/admin-zone-edit.component';
import { AdminConfigBusinessRuleComponent } from './admin-config-business-rule/admin-config-business-rule.component';
import { UploadODMatrixComponent } from './upload-o-d-matrix/upload-o-d-matrix.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TestingDatatableComponent } from './testing-datatable/testing-datatable.component';
import { StationDiscountAddComponent } from './station-discount-add/station-discount-add.component';
import { StationDiscountEditComponent } from './station-discount-edit/station-discount-edit.component';
import { StationDiscountListComponent } from './station-discount-list/station-discount-list.component';
import { TransactionQrListComponent } from './transaction-qr-list/transaction-qr-list.component';
import { TransactionNcmcListComponent } from './transaction-ncmc-list/transaction-ncmc-list.component';



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
       BsDatepickerModule.forRoot()
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
        ScheduleFileUpdateListComponent,
        AddMediaTypeComponent,
        MediaTypeListComponent,
        MediaTypeEditComponent,
        TicketTypeAddComponent,
        TicketTypeListComponent,
        TicketTypeEditComponent,
        TicketSubtypeAddComponent,
        TicketSubtypeListComponent,
        TicketSubtypeEditComponent,
        SpecialDaysAddComponent,
        SpecialDaysListComponent,
        SpecialDaysEditComponent,
        TimeTableAddComponent,
        TimeTableListComponent,
        TimeTableEditComponent,
        DayTypeAddComponent,
        DayTypeListComponent,
        DayTypeEditComponent,
        BaseFareAddComponent,
        BaseFareListComponent,
        BaseFareEditComponent,
        MediaTicketMapComponent,
        DayTimeSlotMapComponent,
        DayTimeSlotMapUpdateComponent,
        MediaTicketSubtypeListComponent,
        GenerateJsonComponent,
        AdminZoneAddComponent,
        AdminZoneListComponent,
        AdminZoneEditComponent,
        AdminConfigBusinessRuleComponent,
        UploadODMatrixComponent,
        TransactionListComponent,
        TestingDatatableComponent,
        StationDiscountAddComponent,
        StationDiscountEditComponent,
        StationDiscountListComponent,
        TransactionQrListComponent,
        TransactionNcmcListComponent
    ],
    exports: [PrivacyComponent],
})
export class AdminModule {}
