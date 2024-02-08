import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EquipmentComponent } from "./equipment.component";
import { AuthGuard } from "../_helpers/auth-guard";
import { RoleGuardService as RoleGuard } from "../_services/role.guard.service";
import { StationEquipmentListComponent } from "./station-equipment-list/station-equipment-list.component";

import { EquipmentdashComponent } from "./equipmentdash/equipmentdash.component";
import { EquipmentAddGateComponent } from "./equipment-add/equipment-add.component";

import { AddInventoryComponent } from "./add-inventory-stock/add-inventory-stock.component";
import { InventoryListComponent } from "./inventory-list/inventory-list.component";
import { DeletedInventoryComponent } from "./deleted-inventory/deleted-inventory.component";
import { InventorytypeAddComponent } from "./inventorytype-add/inventorytype-add.component";
import { InventorytypeListComponent } from "./inventorytype-list/inventorytype-list.component";
import { DeletedHistoryComponent } from "./deleted-history/deleted-history.component";
import { UpdateInventoryComponent } from "./update-inventory/update-inventory.component";
import { UpdateEquipmentComponent } from "./update-equipment/update-equipment.component";
import { AddgateComponent } from "./add-gate/addgate.component";
import { ConfigureGateComponent } from "./configure-gate/configure-gate.component";
import { TerminalComponent } from "./terminal/terminal.component";
import { EditEquipmentProfileComponent } from "./edit-equipment-profile/edit-equipment-profile.component";
import { EquipmentBlacklistComponent } from "./equipment-blacklist/equipment-blacklist.component";
import { TerminalListComponent } from "./terminal-list/terminal-list.component";
import { AssignListComponent } from "./assign-list/assign-list.component";
import { UnassignListComponent } from "./unassign-list/unassign-list.component";
import { InventoryTypeUpdateComponent } from "./inventory-type-update/inventory-type-update.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
const routes: Routes = [
    {
        path: "equipment",
        component: EquipmentComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRole: ["ROLE_EQUIPMENT"] },
        children: [
            { path: "", redirectTo: "equipmentdash", pathMatch: "prefix" },
            {
                path: "equipmentdash",
                component: EquipmentdashComponent,
            },
            { path: "equipmentadd", component: EquipmentAddGateComponent },
            {
                path: "equipment-update/:id",
                component: UpdateEquipmentComponent,
            },
            {
                path: "station-equipment",
                component: StationEquipmentListComponent,
            },

            { path: "addInventory", component: AddInventoryComponent },
            {
                path: "update/inventory/:id",
                component: UpdateInventoryComponent,
            },
            { path: "inventoryList", component: InventoryListComponent },
            { path: "deltedInventory", component: DeletedInventoryComponent },
            { path: "inventoryTypeAdd", component: InventorytypeAddComponent },
            {
                path: "inventoryTypeList",
                component: InventorytypeListComponent,
            },
            {
                path: "inventory/update/:id",
                component: InventoryTypeUpdateComponent,
            },
            { path: "gate/add", component: AddgateComponent },
            { path: "gate/list", component: ConfigureGateComponent },
            { path: "deletedHistory", component: DeletedHistoryComponent },
            { path: "terminal/assign", component: TerminalComponent },
            {
                path: "edit-equipment-profile",
                component: EditEquipmentProfileComponent,
            },
            {
                path: "blacklist/equipment",
                component: EquipmentBlacklistComponent,
            },
            {
                path: "terminal/list",
                component: TerminalListComponent,
            },
            { path: "assign/equipment/list", component: AssignListComponent },
            {
                path: "unassign/equipment/list",
                component: UnassignListComponent,
            },
            {
                path: "changePassword",
                component: ChangePasswordComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EquipmentRoutingModule {}
