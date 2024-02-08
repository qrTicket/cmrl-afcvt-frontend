import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SuperComponent } from "./super.component";
import { AuthGuard } from "../_helpers/auth-guard";
import { RoleGuardService as RoleGuard } from "../_services/role.guard.service";
import { PtonumComponent } from "./ptonum/ptonum.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RegistrationComponent } from "./registration/registration.component";
import { VerifyPtoComponent } from "./verify-pto/verify-pto.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { UserlistComponent } from "../admin/userlist/userlist.component";
import { VerifiedUserComponent } from "./verified-user/verified-user.component";
import { RejectedUserComponent } from "./rejected-user/rejected-user.component";
import { BlacklistUserComponent } from './blacklist-user/blacklist-user.component';

const routes: Routes = [
    {
        path: "super-admin",
        component: SuperComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
            expectedRole: ["ROLE_SUPER"],
        },
        children: [
            { path: "", redirectTo: "dashboard", pathMatch: "prefix" },
            {
                path: "dashboard",
                component: DashboardComponent,
            },
            {
                path: "ptonum",
                component: PtonumComponent,
            },
            { path: "verify/:id", component: VerifyPtoComponent },
            {
                path: "registration",
                component: RegistrationComponent,
            },
            { path: "user/list", component: VerifiedUserComponent },
            { path: "profile/edit", component: EditProfileComponent },
            { path: "privacy", component: PrivacyComponent },
            { path: "rejected/users", component: RejectedUserComponent },
            {path: 'blacklist/users', component: BlacklistUserComponent}
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SuperRoutingModule {}
