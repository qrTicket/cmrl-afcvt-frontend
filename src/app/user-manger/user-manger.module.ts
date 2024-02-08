import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";

import { UserMangerRoutingModule } from "./user-manger-routing.module";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { UserRolesComponent } from "./user-roles/user-roles.component";
//import { AddShiftsComponent } from "./Shifts/add-shifts/add-shifts.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { AssignUserComponent } from "./assign-user/assign-user.component";
import { UserToStationListComponent } from "./user-to-station-list/usertostation-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserMangerComponent } from "./user-manger.component";
//import { UpdateShiftsComponent } from "./Shifts/update-shifts/update-shifts.component";
//import { ShiftsListComponent } from './Shifts/shifts-list/shifts-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateAssignUserComponent } from './update-assign-user/update-assign-user.component';
import { BlacklistUserComponent } from './blacklist-user/blacklist-user.component';
import { EditProfileUserComponent } from './edit-profile-user/edit-profile-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

//rohil




@NgModule({
    imports: [
        CommonModule,
        UserMangerRoutingModule,
        NgbDropdownModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        DataTablesModule,
        NgxSpinnerModule,
        RxReactiveFormsModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            progressBar: true,
            newestOnTop: true,
        }),
        TimepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
    ],
    declarations: [
        UserMangerComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        UserRolesComponent,
        //AddShiftsComponent,
        AddUserComponent,
        AssignUserComponent,
        UserToStationListComponent,
        DashboardComponent,
        //UpdateShiftsComponent,
        //ShiftsListComponent,
        UserUpdateComponent,
        UserListComponent,
        UpdateAssignUserComponent,
        BlacklistUserComponent,
        EditProfileUserComponent,
        ResetPasswordComponent
    ],
    providers:[DatePipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserMangerModule {}
