import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login2Page } from './login2.page';

const routes: Routes = [
  {
    path: '',
    component: Login2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Login2PageRoutingModule {}
