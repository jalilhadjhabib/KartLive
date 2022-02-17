import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfPage } from './pdf.page';

const routes: Routes = [
  {
    path: '',
    component: PdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfPageRoutingModule {}
