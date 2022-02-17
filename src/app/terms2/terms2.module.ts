import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Terms2PageRoutingModule } from './terms2-routing.module';

import { Terms2Page } from './terms2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Terms2PageRoutingModule
  ],
  declarations: [Terms2Page]
})
export class Terms2PageModule {}
