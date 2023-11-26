// qr.module.ts
import { NgModule } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrReaderComponent } from './qr-reader.component';

@NgModule({
  declarations: [QrReaderComponent],
  imports: [ZXingScannerModule], // Asegúrate de incluir ZXingScannerModule aquí
  exports: [QrReaderComponent],
})
export class QrReaderModule {}