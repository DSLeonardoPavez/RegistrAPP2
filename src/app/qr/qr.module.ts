// qr.module.ts
import { NgModule } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrReaderComponent } from './qr.component';
@NgModule({
  declarations: [QrReaderComponent],
  imports: [ZXingScannerModule, QrModule,QrReaderComponent],
  exports: [QrReaderComponent],
})
export class QrModule {}
