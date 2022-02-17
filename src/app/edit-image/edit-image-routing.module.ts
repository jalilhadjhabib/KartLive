import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { EditImagePage } from './edit-image.page';

const routes: Routes = [
  {
    path: '',
    component: EditImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule,FormsModule],
  exports: [RouterModule],
})
export class EditImagePageRoutingModule {}
