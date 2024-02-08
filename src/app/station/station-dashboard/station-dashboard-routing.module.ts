import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationDashboardComponent } from './station-dashboard.component';

const routes: Routes = [
    {
        path: '', component: StationDashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StationDashboardRoutingModule {
}
