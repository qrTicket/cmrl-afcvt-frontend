import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from "../_helpers/auth-guard";
import { RoleGuardService as RoleGuard } from "../_services/role.guard.service";

import { Routes, RouterModule } from '@angular/router';
import { ComplaintComponent } from './complaint.component';
import { ComplaintdashComponent } from './complaintdash/complaintdash.component';
import { ComplaintMailComponent } from './complaint-mail/complaint-mail.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RejectedListComponent } from './rejected-list/rejected-list.component';
import { CompletedComplaintListComponent } from './completed-complaint-list/completed-complaint-list.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { ProgressListComponent } from './progress-list/progress-list.component';
import { ViewComplaintDetailsComponent } from './view-complaint-details/view-complaint-details.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { CompChangePasswordComponent } from './comp-change-password/comp-change-password.component';



const routes: Routes = [
    {
        path: 'complaint',
        component: ComplaintComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRole: ['ROLE_COMPLAINT'] },
        children: [
            { path: '', redirectTo: 'complaintdash', pathMatch: 'prefix' },
            { path: 'complaintdash', component: ComplaintdashComponent },
            { path: 'pendingList', component: PendingListComponent},
            { path: 'progressList', component: ProgressListComponent},
            { path: 'completedComplaintList', component: CompletedComplaintListComponent},
            { path: 'rejectedList', component: RejectedListComponent},
            { path: 'complaint-details/:token', component: ViewComplaintDetailsComponent },
            { path: 'device-details/:deviceid', component: DeviceDetailsComponent },
            // { path: 'complaintMail', component: ComplaintMailComponent },
            { path: 'edit-profile', component: EditProfileComponent },
            { path: 'change-password', component: CompChangePasswordComponent }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComplaintRoutingModule { }
