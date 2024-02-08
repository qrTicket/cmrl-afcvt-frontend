import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserMangerComponent } from "./user-manger.component";
import { AuthGuard } from "../_helpers/auth-guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddUserComponent } from "./add-user/add-user.component";
//import { AddShiftsComponent } from "./Shifts/add-shifts/add-shifts.component";
import { AssignUserComponent } from "./assign-user/assign-user.component";
import { UserRolesComponent } from "./user-roles/user-roles.component";
import { UserToStationListComponent } from "./user-to-station-list/usertostation-list.component";
//import { UpdateShiftsComponent } from "./Shifts/update-shifts/update-shifts.component";
//import { ShiftsListComponent } from "./Shifts/shifts-list/shifts-list.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserUpdateComponent } from "./user-update/user-update.component";
import { UpdateAssignUserComponent } from "./update-assign-user/update-assign-user.component";
import { BlacklistUserComponent } from "./blacklist-user/blacklist-user.component";
import { EditProfileUserComponent } from "./edit-profile-user/edit-profile-user.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

const routes: Routes = [
    {
        path: "user-manager",
        component: UserMangerComponent,
        canActivate: [AuthGuard],

        children: [
            { path: "", redirectTo: "dashboard", pathMatch: "prefix" },
            { path: "dashboard", component: DashboardComponent },
            { path: "adduser", component: AddUserComponent },
            // { path: "shifts", component: AddShiftsComponent },
            // { path: "shifts/update/:id", component: UpdateShiftsComponent },
            // { path: "shifts/list", component: ShiftsListComponent },
            { path: "assign/user", component: AssignUserComponent },
            { path: "user/roles", component: UserRolesComponent },
            { path: "users/all/list", component: UserListComponent },
            { path: "user/update", component: UserUpdateComponent },
            {
                path: "users/station/list",
                component: UserToStationListComponent,
            },
            {
                path: "assign/user/update/:id",
                component: UpdateAssignUserComponent,
            },
            { path: "users/all/blacklist", component: BlacklistUserComponent },
            { path: "edit-user-profile", component: EditProfileUserComponent },
            { path: "reset/password", component: ResetPasswordComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserMangerRoutingModule {}
