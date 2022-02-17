import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReserveInfoPage } from './reserve-info.page';

const routes: Routes = [
  {
    path: '',
    component: ReserveInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReserveInfoPageRoutingModule {}
