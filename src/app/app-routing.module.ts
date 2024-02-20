import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ForgotPassComponent } from "./forgot-pass/forgot-pass.component";
import { HomeComponent } from "./home/home.component";
import { MainCompComponent } from "./main-comp/main-comp.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ChangeFirstPasswordComponent } from "./change-first-password/change-first-password.component";
//import { EditallComponent } from "./editall/editall.component";
// import { UserShiftComponent } from './sharedComponent/user-shift/user-shift.component';

const routes: Routes = [
    //mainComp
    { path: "", redirectTo: "mainComp", pathMatch: "prefix" },
    // tslint:disable-next-line:max-line-length
   {
        path: "",
        loadChildren: () =>
            import("./station/station.module").then((m) => m.StationModule),
    },
   /*  {
        path: "",
        loadChildren: () =>
            import("./super/super.module").then((m) => m.SuperModule),
    },*/
    {
        path: "",
        loadChildren: () =>
            import("./user-manger/user-manger.module").then(
                (u) => u.UserMangerModule
            ),
    },
    {
        path: "",
        loadChildren: () =>
            import("./admin/admin.module").then((m) => m.AdminModule),
    },

    {
        path: "",
        loadChildren: () =>
            import("./maintenance/maintenance.module").then(
                (m) => m.MaintenanceModule
            ),
    },
    {
        path: "",
        loadChildren: () =>
            import("./equipment/equipment.module").then(
                (m) => m.EquipmentModule
            ),
    },
   

    {
        path: "",
        loadChildren: () =>
            import("./complaint/complaint.module").then(
                (m) => m.ComplaintModule
            ),
    },
    { path: "login", component: LoginComponent },

    {path: "changeFirstPassword", component: ChangeFirstPasswordComponent},

    { path: "signup", component: SignupComponent },
    { path: "forgotpass", component: ForgotPassComponent },
    {
        path: "api/auth/user/reset-password-change/:id",
        component: ResetPasswordComponent,
    },
    // { path: "user-shift", component: UserShiftComponent },
    { path: "mainComp", component: MainCompComponent },
    { path: "home", component: HomeComponent },
    {
        path: "error",
        loadChildren: () =>
            import("./server-error/server-error.module").then(
                (m) => m.ServerErrorModule
            ),
    },
    {
        path: "access-denied",
        loadChildren: () =>
            import("./access-denied/access-denied.module").then(
                (m) => m.AccessDeniedModule
            ),
    },
    {
        path: "not-found",
        loadChildren: () =>
            import("./not-found/not-found.module").then(
                (m) => m.NotFoundModule
            ),
    },
    { path: "**", redirectTo: "not-found" },

    /*{
        path:"edit-all",
        component: EditallComponent
    }*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
