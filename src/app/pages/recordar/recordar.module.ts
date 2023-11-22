import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordarPageRoutingModule } from './recordar-routing.module';

import { RecordarPage } from './recordar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordarPageRoutingModule
  ],
  declarations: [RecordarPage]
})
export class RecordarPageModule {}
