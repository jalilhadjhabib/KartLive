import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FbPageRoutingModule } from './fb-routing.module';

import { FbPage } from './fb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FbPageRoutingModule
  ],
  declarations: [FbPage]
})
export class FbPageModule {}
