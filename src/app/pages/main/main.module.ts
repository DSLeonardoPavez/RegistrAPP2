import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { QrModule } from '../../qr/qr.module';
import { QrReaderComponent } from '../../qr/qr.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    QrReaderComponent
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
