import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Privacy2PageRoutingModule } from './privacy2-routing.module';

import { Privacy2Page } from './privacy2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Privacy2PageRoutingModule
  ],
  declarations: [Privacy2Page]
})
export class Privacy2PageModule {}
