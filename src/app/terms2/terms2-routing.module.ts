import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Terms2Page } from './terms2.page';

const routes: Routes = [
  {
    path: '',
    component: Terms2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Terms2PageRoutingModule {}
