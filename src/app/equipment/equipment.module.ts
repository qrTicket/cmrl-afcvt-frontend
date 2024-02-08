import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalModule } from "ngx-bootstrap/modal";
import {
    BsDatepickerModule,
    BsDatepickerConfig,
} from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
//import { AngularFontAwesomeModule } from "angular-font-awesome";
import { DataTablesModule } from "angular-datatables";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";

import { EquipmentRoutingModule } from "./equipment-routing.module";
import { EquipmentComponent } from "./equipment.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { StationEquipmentListComponent } from "./station-equipment-list/station-equipment-list.component";
import { EquipmentdashComponent } from "./equipmentdash/equipmentdash.component";
import { EquipmentAddGateComponent } from "./equipment-add/equipment-add.component";
import { EquipFooterComponent } from "./components/equip-footer/equip-footer.component";
import { AddInventoryComponent } from "./add-inventory-stock/add-inventory-stock.component";
import { AddStockComponent } from "./add-stock/add-stock.component";
import { DeletedInventoryComponent } from "./deleted-inventory/deleted-inventory.component";
import { InventoryListComponent } from "./inventory-list/inventory-list.component";
import { InventorytypeAddComponent } from "./inventorytype-add/inventorytype-add.component";
import { DeletedHistoryComponent } from "./deleted-history/deleted-history.component";
import { InventorytypeListComponent } from "./inventorytype-list/inventorytype-list.component";
import { UpdateInventoryComponent } from "./update-inventory/update-inventory.component";
import { UpdateEquipmentComponent } from "./update-equipment/update-equipment.component";
import { AddgateComponent } from "./add-gate/addgate.component";
import { ConfigureGateComponent } from "./configure-gate/configure-gate.component";
import { TerminalComponent } from "./terminal/terminal.component";
import { ConfigTermnlComponent } from "./config-termnl/config-termnl.component";
import { InvetoryCSVService } from ".././equipment/_services/invetory-csv.service";
import { JwtInterceptor } from "../_helpers/jwt.interceptor";
import { ErrorInterceptor } from "../_helpers/error.inteceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { EditEquipmentProfileComponent } from "./edit-equipment-profile/edit-equipment-profile.component";
import { EquipmentBlacklistComponent } from "./equipment-blacklist/equipment-blacklist.component";
import { TerminalListComponent } from "./terminal-list/terminal-list.component";
import { AssignListComponent } from "./assign-list/assign-list.component";
import { UnassignListComponent } from "./unassign-list/unassign-list.component";
import { InventoryTypeUpdateComponent } from "./inventory-type-update/inventory-type-update.component";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    imports: [
        CommonModule,
        //AngularFontAwesomeModule,
        EquipmentRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        //FormsModule,
        ReactiveFormsModule,
        RxReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        ProgressbarModule.forRoot(),
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        DataTablesModule,
        NgxSpinnerModule,
        NgbModule,
        NgSelectModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        EquipmentComponent,
        SidebarComponent,
        HeaderComponent,
        StationEquipmentListComponent,
        EquipmentdashComponent,
        EquipmentAddGateComponent,
        EquipFooterComponent,
        AddInventoryComponent,
        
        AddStockComponent,

        DeletedInventoryComponent,
        InventoryListComponent,
        InventorytypeAddComponent,
        DeletedHistoryComponent,
        InventorytypeListComponent,
        UpdateInventoryComponent,
        UpdateEquipmentComponent,
        AddgateComponent,
        ConfigureGateComponent,
        TerminalComponent,
        ConfigTermnlComponent,
        EditEquipmentProfileComponent,
        EquipmentBlacklistComponent,
        TerminalListComponent,
        AssignListComponent,
        UnassignListComponent,
        InventoryTypeUpdateComponent,
        ChangePasswordComponent,
    ],
    providers: [
        BsDatepickerConfig,
        DatePipe,
        // AuthGuard,
        InvetoryCSVService,
        // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
})
export class EquipmentModule {}
