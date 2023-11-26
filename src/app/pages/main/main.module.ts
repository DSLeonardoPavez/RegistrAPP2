import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainPageRoutingModule } from './main-routing.module';
import { MainPage } from './main.page';
import { QrReaderModule } from '../../qr-reader/qr-reader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    QrReaderModule, // Importa tu módulo aquí
  ],
  declarations: [MainPage],
})
export class MainPageModule {}