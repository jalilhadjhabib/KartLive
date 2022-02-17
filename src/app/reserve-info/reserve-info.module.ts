import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReserveInfoPageRoutingModule } from './reserve-info-routing.module';

import { ReserveInfoPage } from './reserve-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ReserveInfoPageRoutingModule
  ],
  declarations: [ReserveInfoPage]
})
export class ReserveInfoPageModule {}
