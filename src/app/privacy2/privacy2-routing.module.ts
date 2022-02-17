import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Privacy2Page } from './privacy2.page';

const routes: Routes = [
  {
    path: '',
    component: Privacy2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Privacy2PageRoutingModule {}
