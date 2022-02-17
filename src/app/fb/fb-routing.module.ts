import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FbPage } from './fb.page';

const routes: Routes = [
  {
    path: '',
    component: FbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FbPageRoutingModule {}
