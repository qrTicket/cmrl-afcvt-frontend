import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PtonumComponent } from './ptonum.component';

const routes: Routes = [
    {
        path: '', component: PtonumComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
// tslint:disable-next-line:class-name
export class PtonumRoutingModule {
}
