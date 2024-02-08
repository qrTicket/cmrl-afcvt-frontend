import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StationDashboardRoutingModule } from './station-dashboard-routing.module';
//import { StationDashboardComponent } from './station-dashboard.component';
import { StatModule } from '../../shared';


@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        StationDashboardRoutingModule,
        StatModule,
        NgbModule,
        RouterModule
    ],
    declarations: [
    ]
})
export class StationDashboardModule {}
