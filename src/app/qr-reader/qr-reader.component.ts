// qr-reader.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-reader',
  template: `
    <zxing-scanner
      [(device)]="currentDevice"
      [formats]="formats"
      [torch]="torch"
      (camerasFound)="camerasFoundHandler($event)"
    ></zxing-scanner>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class QrReaderComponent implements OnInit {
  currentDevice: MediaDeviceInfo | undefined;
  formats: string[] = ['QR_CODE'];
  torch = false;

  ngOnInit(): void {}

  camerasFoundHandler(devices: MediaDeviceInfo[]): void {
    // Selecciona la primera cámara encontrada (puedes ajustar la lógica según tus necesidades)
    this.currentDevice = devices[0];
  }

  // Agrega el método scanQRCode
  scanQRCode(): void {
    // Lógica de escaneo de código QR aquí
  }
}
