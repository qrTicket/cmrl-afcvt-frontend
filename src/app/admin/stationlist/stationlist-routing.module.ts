import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationlistComponent } from './stationlist.component';


const routes: Routes = [
  {
    path: '', component: StationlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationlistRoutingModule { }
