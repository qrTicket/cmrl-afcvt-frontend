import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../_helpers/auth-guard";
import { RoleGuardService as RoleGuard } from "../_services/role.guard.service";
import { MaindashComponent } from './maindash/maindash.component';
import { MaintenanceComponent } from './maintenance.component';
import { ComplainListComponent } from './complain-list/complain-list.component';
import { MailComponent } from './mail/mail.component';
import { AcceptComplaintComponent } from './accept-complaint/accept-complaint.component';
// import { VerifiedListComponent } from './verified-list/verified-list.component';
// import { RejectedListComponent } from './rejected-list/rejected-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ComplaintAssignListComponent } from './complaint-assign-list/complaint-assign-list.component';
import { CompletedComplaintListComponent } from './completed-complaint-list/completed-complaint-list.component';
import { ViewComplaintdetailsComponent } from './view-complaintdetails/view-complaintdetails.component';
import { InprogressListComponent } from './inprogress-list/inprogress-list.component';
import { DeviceDetailsComponent } from '../complaint/device-details/device-details.component';
import { MainChangePasswordComponent } from './main-change-password/main-change-password.component';


const routes: Routes = [
  {
    path: '',
    component: MaintenanceComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: ['ROLE_MAINTENANCE'] },
    children: [
      { path: '', redirectTo: 'maindash', pathMatch: 'prefix' },
      { path: 'maindash', component: MaindashComponent },
      { path: 'complainList', component: ComplainListComponent },
      { path: 'inprogress-complain-list', component: InprogressListComponent },
      { path: 'completedComplaintList', component: CompletedComplaintListComponent},
      { path: 'complaintAssignList', component: ComplaintAssignListComponent },
      { path: 'mail', component: MailComponent },
      { path: 'accept-complaint/:id', component: AcceptComplaintComponent },
      { path: 'complaint-details/:token', component: ViewComplaintdetailsComponent },
      
      // { path: 'verified-list', component: VerifiedListComponent },
      // { path: 'rejected-list', component: RejectedListComponent },
      { path: 'editprofile', component: EditProfileComponent},
      { path: 'equip/device-details/:deviceid', component: DeviceDetailsComponent },
      { path: 'maintenance/change-password', component: MainChangePasswordComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
