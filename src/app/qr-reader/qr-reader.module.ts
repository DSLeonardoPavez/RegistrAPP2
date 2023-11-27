import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrReaderComponent } from './qr-reader.component';

@NgModule({
  declarations: [QrReaderComponent],
  imports: [
    CommonModule, // Añade CommonModule aquí
    ZXingScannerModule
    // Otros módulos que puedas necesitar
  ],
  exports: [QrReaderComponent] // Si deseas exportar el componente
})
export class QrReaderModule { }