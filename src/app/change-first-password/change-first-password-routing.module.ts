import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeFirstPasswordComponent } from './change-first-password.component';


const routes: Routes = [
  {
    path: 'changeFirstPassword',
    component: ChangeFirstPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeFirstPasswordRoutingModule { }
