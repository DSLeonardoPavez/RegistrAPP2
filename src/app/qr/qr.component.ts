// qr.component.ts
import { Component } from '@angular/core';
import { Result } from '@zxing/library';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-qr',
  template: `
    <div *ngIf="!isScanning">
      <ngx-qrcode [qrc-value]="qrData"></ngx-qrcode>
    </div>

    <div *ngIf="isScanning">
      <zxing-scanner
        [torch]="torch"
        [formats]="allowedFormats"
        (scanSuccess)="onScanSuccess($event)"
      ></zxing-scanner>
    </div>

    <button (click)="toggleScanner()">Toggle Scanner</button>
  `,
  styles: [
    `
      div {
        text-align: center;
        margin-top: 20px;
      }

      button {
        margin-top: 10px;
      }
    `,
  ],
})
export class QrComponent {
  qrData = 'Hello, World!';
  isScanning = false;
  torch = false;
  allowedFormats = [BarcodeFormat.QR_CODE];

  toggleScanner() {
    this.isScanning = !this.isScanning;
  }

  onScanSuccess(result: Result) {
    console.log('Scanned:', result.getText());
    this.toggleScanner();
  }
}
